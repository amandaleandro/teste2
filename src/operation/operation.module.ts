import { Module } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationController } from './operation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operation } from 'src/models/operation.model';
import { CacheModule } from '@nestjs/cache-manager';
import { PauseModule } from 'src/pause/pause.module';
import { OperationCacheService } from './operation-cache.service';
import { EventListener } from './listener/event.listener';
import { SettingsModule } from 'src/settings/settings.module';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/user/user.module';
import { PushServerModule } from 'src/push-server/push-server.module';
import { OperationLogModule } from 'src/operation-log/operation-log.module';
@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([Operation]),
    CacheModule.register({ ttl: 0 }),
    PauseModule,
    SettingsModule,
    UserModule,
    PushServerModule,
    OperationLogModule,
  ],
  controllers: [OperationController],
  providers: [OperationService, OperationCacheService, EventListener],
  exports: [OperationService],
})
export class OperationModule {}
