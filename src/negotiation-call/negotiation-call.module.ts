import { Module } from '@nestjs/common';
import { NegotiationCallService } from './negotiation-call.service';
import { NegotiationCallController } from './negotiation-call.controller';
import { NegotiationCall } from 'src/models/negotiation-call.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([NegotiationCall])],
  controllers: [NegotiationCallController],
  providers: [NegotiationCallService],
  exports: [NegotiationCallService],
})
export class NegotiationCallModule {}
