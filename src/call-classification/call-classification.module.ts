import { Module } from '@nestjs/common';
import { CallClassificationService } from './call-classification.service';
import { CallClassificationController } from './call-classification.controller';
import { CallClassification } from 'src/models/call-classificatoin.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CallClassification])],
  controllers: [CallClassificationController],
  providers: [CallClassificationService],
  exports: [CallClassificationService],
})
export class CallClassificationModule {}
