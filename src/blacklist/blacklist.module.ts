import { Module } from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { BlacklistController } from './blacklist.controller';
import { BlackList } from 'src/models/blacklist.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([BlackList])],
  controllers: [BlacklistController],
  providers: [BlacklistService],
})
export class BlacklistModule {}
