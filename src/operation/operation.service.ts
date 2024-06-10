import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateOperationDto } from './dto/update-operation.dto';
import { User } from 'src/models/user.model';
import { Pause } from 'src/models/pause.model';
import { Operation } from './operation';
import { OperationCacheService } from './operation-cache.service';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { AgentNotFoundError } from 'src/exception-filter/exceptions/agent-not-found.error';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserService } from 'src/user/user.service';

@Injectable()
export class OperationService implements OnModuleInit {
  constructor(
    @InjectRepository(Operation)
    private repository: Repository<Operation>,
    private cache: OperationCacheService,
    private eventEmitter: EventEmitter2,
    private agentService: UserService,
  ) {}
  async onModuleInit() {
    const agents = await this.agentService.findBy({
      role: 'AGENT',
      isActive: true,
    });
    if (agents) {
      agents.forEach((agent) => {
        if (agent.exten) {
          const op = new Operation(agent);
          this.cache.set(agent.id, op);
          this.cache.set(agent.exten.dialstring, op);
        }
      });
    }
  }

  findById(id: string) {
    return this.cache.get(id);
  }
  // findById(id: string) {
  //   if (!id) {
  //     throw new Error('ID is required');
  //   }
  //   return this.repository.findOneByOrFail({
  //     userId: id,
  //   } as FindOptionsWhere<Operation>);
  // }

  async login(agent: User) {
    const operation = new Operation(agent);
    operation.available();
    await this.cache.set(agent.id, operation);
    await this.cache.set(agent.exten.dialstring, operation);
    this.eventEmitter.emit('event.agent', operation.emittEvent());
  }

  async logout(agentId: string) {
    const op = await this.cache.get(agentId);
    if (!op) {
      throw new Error('Agent not found');
    }
    op.unavailable();
    this.eventEmitter.emit('event.agent', op.emittEvent());
    return await this.cache.set(agentId, op);
  }

  async pause(agentId: string, pause: Pause) {
    if (!pause) {
      throw new Error('Pause not found');
    }
    const op = await this.cache.get(agentId);
    if (!op) {
      throw new Error('Agent not found');
    }
    op.paused(pause);
    this.eventEmitter.emit('event.agent', op.emittEvent());

    return await this.cache.set(agentId, op);
  }

  async unpause(agentId: string) {
    const op = await this.cache.get(agentId);
    if (!op) {
      throw new AgentNotFoundError();
    }
    op.available();
    this.eventEmitter.emit('event.agent', op.emittEvent());
    await this.cache.set(agentId, op);
  }

  async update(id: string, dto: UpdateOperationDto) {
    await this.repository.update(id, dto);
    const operation = await this.findById(id);
    return operation;
  }
}
