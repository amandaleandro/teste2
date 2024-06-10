import { Injectable } from '@nestjs/common';
import { CallClassificationService } from 'src/call-classification/call-classification.service';
import { AgentWithoutExtenError } from 'src/exception-filter/exceptions/agent-without-exten.error';
import { NegotiationCallService } from 'src/negotiation-call/negotiation-call.service';
import { OperationService } from 'src/operation/operation.service';
import { PauseService } from 'src/pause/pause.service';
import { PbxService } from 'src/pbx/pbx.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AgentService {
  constructor(
    private readonly pauseService: PauseService,
    private readonly operationService: OperationService,
    private readonly userService: UserService,
    private readonly pbxService: PbxService,
    private readonly classificationService: CallClassificationService,
    private readonly negotiationCallService: NegotiationCallService,
  ) {}

  async pause(agentId: string, pauseId: string) {
    const pause = await this.pauseService.findById(pauseId);
    if (!pause) {
      throw new Error('Pause not found');
    }

    return this.operationService.pause(agentId, pause);
  }

  async call(agentId: string, phone: string) {
    const operation = await this.operationService.findById(agentId);
    console.log(operation);
    return await this.pbxService.call(operation.exten, phone, agentId);
  }

  async hangup(agentId: string) {
    const operation = await this.operationService.findById(agentId);
    console.log(operation);
    const extenOperation = await this.operationService.findById(
      operation.exten,
    );
    if (!extenOperation) {
      throw new Error('Not Call runing to hangup');
    }
    console.log('exten operation =====================');
    console.log(extenOperation);
    console.log('=====================');
    return await this.pbxService
      .hangup(extenOperation.channelString)
      .then(console.log);
  }

  async unpause(agentId: string) {
    return this.operationService.unpause(agentId);
  }

  async login(agentId: string) {
    const agent = await this.userService.findById(agentId);
    if (!agent || agent.role != 'AGENT') {
      throw new Error('User does not exist or is not an agent ');
    }
    if (!agent.exten) {
      throw new AgentWithoutExtenError();
    }
    return this.operationService.login(agent);
  }

  async logout(agentId: string) {
    return this.operationService.logout(agentId);
  }

  async classificateCall(
    agentId: string,
    classificationId: string,
    callId: string,
  ) {
    const agent = await this.userService.findById(agentId);
    const classification =
      await this.classificationService.findById(classificationId);
    return this.negotiationCallService.save({
      agent: agent,
      classification: classification,
      id: callId,
      record_url: null,
      createdAt: new Date(),
    });
  }
}
