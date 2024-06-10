import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { BasicRepository } from 'src/common/orm/basic.repository';
import { CallClassification } from 'src/models/call-classificatoin.model';
import { Repository } from 'typeorm';

@Injectable()
export class CallClassificationService extends BasicRepository<CallClassification> {
  constructor(
    @InjectRepository(CallClassification)
    private campaignRepository: Repository<CallClassification>,
  ) {
    super(campaignRepository);
  }
}
