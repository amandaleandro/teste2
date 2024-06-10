import { Module } from '@nestjs/common';
import { OperationLogService } from './operation-log.service';
import { OperationLogController } from './operation-log.controller';
import { OperationLog } from 'src/models/operation-log.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OperationLog])],
  controllers: [OperationLogController],
  providers: [OperationLogService],
  exports: [OperationLogService],
})
export class OperationLogModule {}
