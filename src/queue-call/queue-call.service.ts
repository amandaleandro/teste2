import { Injectable } from '@nestjs/common';
import { QueueCall } from 'src/models/queue_call.model';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicRepository } from 'src/common/orm/basic.repository';
import { Repository } from 'typeorm';

@Injectable()
export class QueueCallService extends BasicRepository<QueueCall> {
  constructor(
    @InjectRepository(QueueCall)
    private queueRepository: Repository<QueueCall>,
  ) {
    super(queueRepository);
  }
}
