import { Module } from '@nestjs/common';
import { AgentControllerV1 } from './agent.controller';
import { UserModule } from 'src/user/user.module';
import { AgentService } from './agent.service';
import { PauseModule } from 'src/pause/pause.module';
import { OperationModule } from 'src/operation/operation.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { PbxModule } from 'src/pbx/pbx.module';
import { NegotiationCallModule } from 'src/negotiation-call/negotiation-call.module';
import { CallClassificationModule } from 'src/call-classification/call-classification.module';
@Module({
  controllers: [AgentControllerV1],
  imports: [
    UserModule,
    PauseModule,
    OperationModule,
    UserModule,
    WalletModule,
    PbxModule,
    NegotiationCallModule,
    CallClassificationModule,
  ],
  providers: [AgentService],
  exports: [AgentService],
})
export class AgentModule {}
