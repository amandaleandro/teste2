import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperationLog } from 'src/models/operation-log.model';
import { Repository } from 'typeorm';

@Injectable()
export class OperationLogService {
  constructor(
    @InjectRepository(OperationLog)
    private repository: Repository<OperationLog>,
  ) {}
  create(operation: any) {
    console.log(operation);
    return this.repository.save({
      event: operation.status,
      agentId: operation.agentId,
      createdAt: operation.updatedAt,
    });
  }

  findAll() {
    return `This action returns all operationLog`;
  }

  findOne(id: number) {
    return `This action returns a #${id} operationLog`;
  }
}
