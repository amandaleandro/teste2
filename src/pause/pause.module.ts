import { Module } from '@nestjs/common';
import { PauseService } from './pause.service';
import { PauseController } from './pause.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pause } from 'src/models/pause.model';

@Module({
  imports: [TypeOrmModule.forFeature([Pause])],
  controllers: [PauseController],
  providers: [PauseService],
  exports: [PauseService],
})
export class PauseModule {}
