import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CustomersModule } from './customers/customers.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './user/user.module';
import { User } from './models/user.model';
import { Pause } from './models/pause.model';
import { PauseModule } from './pause/pause.module';
import { Customer } from './models/customer.model';
import { AgentModule } from './agent/agent.module';
import { OperationModule } from './operation/operation.module';
import { Operation } from './models/operation.model';
import { SettingsModule } from './settings/settings.module';
import { Setting } from './models/settings.model';
import { ExtenModule } from './exten/exten.module';
import { Exten } from './models/exten.model';
import { Sip } from './models/sip.model';
import { ResourcesModule } from './resources/resources.module';
import { Carrier } from './models/carrier.model';
import { CarrierModule } from './carrier/carrier.module';
import { PbxModule } from './pbx/pbx.module';
import { CallClassificationModule } from './call-classification/call-classification.module';
import { CallClassification } from './models/call-classificatoin.model';
import { NegotiationCallModule } from './negotiation-call/negotiation-call.module';
import { NegotiationCall } from './models/negotiation-call.model';
import { PushServerModule } from './push-server/push-server.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import { BlackList } from './models/blacklist.model';
import { WalletModule } from './wallet/wallet.module';
import { Wallet } from './models/wallet.model';
import { CampaignModule } from './campaign/campaign.module';
import { Campaign } from './models/campaign.model';
import { OperationLog } from './models/operation-log.model';
import { OperationLogModule } from './operation-log/operation-log.module';
import { QueueCall } from './models/queue_call.model';
import { QueueCallModule } from './queue-call/queue-call.module';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
import { TerminusModule } from '@nestjs/terminus';
@Module({
  imports: [
    EventEmitterModule.forRoot({
      // set this to `true` to use wildcards
      wildcard: false,
      // the delimiter used to segment namespaces
      delimiter: '.',
      // set this to `true` if you want to emit the newListener event
      newListener: true,
      // set this to `true` if you want to emit the removeListener event
      removeListener: false,
      // the maximum amount of listeners that can be assigned to an event
      maxListeners: 10,
      // show event name in memory leak message when more than maximum amount of listeners is assigned
      verboseMemoryLeak: false,
      // disable throwing uncaughtException if an error event is emitted and it has no listeners
      ignoreErrors: false,
    }),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      // type: process.env.TYPEORM_CONNECTION as any,
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [
        Pause,
        User,
        Customer,
        Exten,
        Operation,
        Setting,
        Sip,
        Carrier,
        CallClassification,
        NegotiationCall,
        BlackList,
        Wallet,
        Campaign,
        OperationLog,
        QueueCall,
      ],
      logging: /^true/i.test(process.env.TYPEORM_LOGGING),
      cache: true,
    }),
    TypeOrmModule.forFeature([
      User,
      Pause,
      Customer,
      Operation,
      Setting,
      Exten,
      Carrier,
      Sip,
      CallClassification,
      NegotiationCall,
      BlackList,
      Wallet,
      Campaign,
      OperationLog,
      QueueCall,
    ]),
    CustomersModule,
    AuthModule,
    PauseModule,
    CarrierModule,
    ExtenModule,
    UserModule,
    AgentModule,
    OperationModule,
    SettingsModule,
    ResourcesModule,
    PbxModule,
    CallClassificationModule,
    NegotiationCallModule,
    PushServerModule,
    BlacklistModule,
    WalletModule,
    CampaignModule,
    OperationLogModule,
    QueueCallModule,
    HealthModule,
    TerminusModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
