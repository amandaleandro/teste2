import { Module } from '@nestjs/common';
import { ExtenService } from './exten.service';
import { ExtenControllerV1 } from './exten.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exten } from 'src/models/exten.model';
import { Sip } from 'src/models/sip.model';

@Module({
  imports: [TypeOrmModule.forFeature([Exten, Sip])],
  controllers: [ExtenControllerV1],
  providers: [ExtenService],
})
export class ExtenModule {}
