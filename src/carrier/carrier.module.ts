import { Module } from '@nestjs/common';
import { CarrierControllerV1 } from './carrier.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sip } from 'src/models/sip.model';
import { CarrierService } from './carrier.service';
import { Carrier } from 'src/models/carrier.model';

@Module({
  imports: [TypeOrmModule.forFeature([Carrier, Sip])],
  controllers: [CarrierControllerV1],
  providers: [CarrierService],
})
export class CarrierModule {}
