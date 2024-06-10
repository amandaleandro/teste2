import { Module } from '@nestjs/common';
import { QueueCallService } from './queue-call.service';
import { QueueCallController } from './queue-call.controller';
import { QueueCall } from 'src/models/queue_call.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([QueueCall])],
  controllers: [QueueCallController],
  providers: [QueueCallService],
})
export class QueueCallModule {}
