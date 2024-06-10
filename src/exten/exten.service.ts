import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sip } from 'src/models/sip.model';
import { Exten } from 'src/models/exten.model';
import { CreateExtenDto } from './dto/create-exten.dto';
import { UpdateExtenDto } from './dto/update-exten.dto';
import { SipBuilder } from './dto/sip.builder';

@Injectable()
export class ExtenService {
  constructor(
    @InjectRepository(Exten)
    private extenRepository: Repository<Exten>,
    @InjectRepository(Sip)
    private sipRepository: Repository<Sip>,
  ) {}
  async create(dto: CreateExtenDto) {
    await this.sipRepository.save(SipBuilder.buildSipExten(dto));
    const exten = await this.extenRepository.save(dto);
    return this.extenRepository.save(exten);
  }

  async findAll() {
    return await this.extenRepository
      .createQueryBuilder('exten')
      .leftJoinAndSelect('sippeers', 'sip', 'sip.name = exten.name')
      .select([
        'exten.name as name,exten.secret secret,exten.protocol as protocol,exten.is_active as isActive, exten.created_at as createdAt, exten.created_by as createdBy, exten.updated_at as updatedAt,exten.last_changed_by as lastChangedBy',
        'sip.callerid as callerid, sip.ipaddr as ipaddr, sip.useragent as useragent',
      ])
      .orderBy({ 'exten.name': 'ASC' })
      .getRawMany();
  }

  findOne(id: string) {
    return this.extenRepository.findOneByOrFail({ name: id });
  }

  async update(id: string, dto: UpdateExtenDto) {
    const sipPartial = SipBuilder.updateSIP(dto);
    if (!sipPartial) {
      this.sipRepository.update(id, sipPartial);
    }
    return this.extenRepository.update(id, dto);
  }

  remove(id: string) {
    return `This action removes a #${id} exten`;
  }
}
