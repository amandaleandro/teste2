import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NegotiationCall } from 'src/models/negotiation-call.model';
import { FindOptionsWhere, Repository } from 'typeorm';

@Injectable()
export class NegotiationCallService {
  constructor(
    @InjectRepository(NegotiationCall)
    private repository: Repository<NegotiationCall>,
  ) {}

  async findById(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    const cnd = await this.repository.findOneByOrFail({
      id: id,
    } as FindOptionsWhere<NegotiationCall>);
    return {
      id: cnd.id,
      url: cnd.record_url,
      classification: cnd.classification.name,
      classificationId: cnd.classification.id,
      agentId: cnd.agent.id,
      agentUsername: cnd.agent.username,
      createdAt: cnd.createdAt,
    };
  }

  save(negotiationCall: NegotiationCall) {
    return this.repository.save(negotiationCall);
  }
}
