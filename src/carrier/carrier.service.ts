import { Injectable } from '@nestjs/common';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sip } from 'src/models/sip.model';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { SipBuilder } from 'src/exten/dto/sip.builder';
import { Carrier } from 'src/models/carrier.model';

@Injectable()
export class CarrierService {
  constructor(
    @InjectRepository(Carrier)
    private carrierRepository: Repository<Carrier>,
    @InjectRepository(Sip)
    private sipRepository: Repository<Sip>,
  ) {}
  async create(dto: CreateCarrierDto) {
    try {
      // const carrier = await this.carrierRepository.save(dto);
      // const protocol = SipBuilder.trunk(carrier);
      
      // await this.sipRepository.save();
      // return carrier;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    return await this.carrierRepository
      .createQueryBuilder('carrier')
      .leftJoinAndSelect('sippeers', 'sip', 'sip.name = carrier.id')
      .select([
        'carrier.name as name,carrier.secret secret,carrier.protocol as protocol,carrier.is_active as isActive, carrier.created_at as createdAt, carrier.created_by as createdBy, carrier.updated_at as updatedAt,carrier.last_changed_by as lastChangedBy',
        'sip.callerid as callerid, sip.ipaddr as ipaddr, sip.useragent as useragent',
      ])
      .orderBy({ 'carrier.name': 'ASC' })
      .getRawMany();
  }

  findOne(id: string) {
    return this.carrierRepository.findOneByOrFail({ id: id });
  }

  update(id: string, dto: UpdateCarrierDto) {
    return this.carrierRepository.update(id, dto);
  }

  remove(id: string) {
    return `This action removes a #${id} carrier`;
  }
}
