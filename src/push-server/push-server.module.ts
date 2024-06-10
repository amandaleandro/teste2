import { Module } from '@nestjs/common';
import { PushServerService } from './push-server.service';
import { PushServerController } from './push-server.controller';

@Module({
  controllers: [PushServerController],
  providers: [PushServerService],
  exports: [PushServerService],
})
export class PushServerModule {}
