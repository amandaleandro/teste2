import { Module } from '@nestjs/common';
import { PbxService } from './pbx.service';
import { PbxController } from './pbx.controller';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  providers: [PbxService],
  controllers: [PbxController],
  exports: [PbxService],
})
export class PbxModule {}
