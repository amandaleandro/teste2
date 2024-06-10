/* eslint-disable @typescript-eslint/no-unused-vars */
import { StateChangeError } from 'src/exception-filter/exceptions/change-state.error';
import { operationStatus } from 'src/models/operation-status.dto';
import { Pause } from 'src/models/pause.model';
import { User } from 'src/models/user.model';

export class Operation {
  agentId: string;

  status: string;

  pause: string;

  exten: string;

  loggedAt: Date;

  updatedAt: Date;

  channelString: string;

  channelState: string;

  callId: string;

  agentName: string;

  agentUserName: string;

  state: AgentState = new AvailableState(this);

  constructor(agent: User) {
    this.state = new UnavailableState(this);
    this.agentId = agent.id;
    this.exten = agent.exten.dialstring;
    this.agentName = agent.name;
    this.agentUserName = agent.username;
  }

  private showCurrentState(): void {
    console.log(this.state);
  }

  public login(): void {
    this.state = this.state.available(this);
  }

  public onPhone(): void {
    this.state = this.state.onPhone(this);
  }

  paused(pause: Pause): AgentState {
    this.state = this.state.paused(this, pause);
    return this.state;
  }

  available(): void {
    this.state = this.state.available(this);
  }

  public unavailable(): void {
    this.state = this.state.unavailable(this);
  }

  emittEvent() {
    return {
      agentId: this.agentId,
      agentName: this.agentName,
      agentUsername: this.agentUserName,
      state: this.state.name,
      callid: this.callId,
      updatedAt: this.updatedAt,
    };
  }
}

// The State interface declares methods that all Concrete State should implement.
interface AgentStateInterface {
  onPhone(operation: Operation): void;
  paused(operation: Operation, pause: Pause): void;
  available(operation: Operation): void;
  unavailable(operation: Operation): void;
}

abstract class AgentState implements AgentStateInterface {
  name: string;
  unavailable(operation: Operation): AgentState {
    throw new StateChangeError();
  }
  onPhone(operation: Operation): AgentState {
    console.log('ERRO NO EVENTO ==========> ', this.name);
    throw new StateChangeError();
  }
  paused(operation: Operation, pause: Pause): AgentState {
    throw new StateChangeError();
  }
  available(operation: Operation): AgentState {
    throw new StateChangeError();
  }
}

class OnPhoneState extends AgentState {
  constructor(operation: Operation) {
    super();
    this.name = operationStatus.OnCall;
    operation.status = operationStatus.OnCall;
    operation.updatedAt = new Date();
  }
  paused(operation: Operation, pause: Pause): AgentState {
    return new PausedState(operation, pause);
  }
  available(operation: Operation): AgentState {
    return new AvailableState(operation);
  }
  onPhone(operation: Operation): AgentState {
    return new OnPhoneState(operation);
  }
  unavailable(operation: Operation): AgentState {
    return new UnavailableState(operation);
  }
}

class PausedState extends AgentState {
  private pausedAt = new Date();
  constructor(operation: Operation, pause: Pause) {
    super();
    this.name = operationStatus.Paused;
    operation.status = operationStatus.Paused;
    operation.pause = pause.name;
  }
  available(operation: Operation): AgentState {
    return new AvailableState(operation);
  }
  paused(operation: Operation, pause: Pause): AgentState {
    return new PausedState(operation, pause);
  }
  onPhone(operation: Operation): AgentState {
    return new OnPhoneState(operation);
  }
  unavailable(operation: Operation): AgentState {
    return new UnavailableState(operation);
  }
}

class AvailableState extends AgentState {
  constructor(operation: Operation) {
    super();
    this.name = operationStatus.Available;
    operation.status = operationStatus.Available;
    operation.updatedAt = new Date();
    operation.callId = null;
  }
  available(operation: Operation): AgentState {
    return new AvailableState(operation);
  }
  paused(operation: Operation, pause: Pause): AgentState {
    return new PausedState(operation, pause);
  }
  onPhone(operation: Operation): AgentState {
    return new OnPhoneState(operation);
  }
  unavailable(operation: Operation): AgentState {
    return new UnavailableState(operation);
  }
}

export class UnavailableState extends AgentState {
  constructor(operation: Operation) {
    super();
    this.name = operationStatus.Unavailable;
    operation.status = operationStatus.Unavailable;
    operation.updatedAt = new Date();
  }
  available(operation: Operation): AgentState {
    return new AvailableState(operation);
  }
}
