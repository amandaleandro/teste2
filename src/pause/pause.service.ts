import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BasicRepository } from 'src/common/orm/basic.repository';
import { Pause } from 'src/models/pause.model';
import { Repository } from 'typeorm';

@Injectable()
export class PauseService extends BasicRepository<Pause> {
  constructor(
    @InjectRepository(Pause)
    private campaignRepository: Repository<Pause>,
  ) {
    super(campaignRepository);
  }
}
