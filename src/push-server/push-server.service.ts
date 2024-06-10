import { Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { fromEvent } from 'rxjs';

@Injectable()
export class PushServerService {
  private readonly emitter: EventEmitter;
  private static readonly EVENT_NAME = 'EventsSSEOperations';

  constructor() {
    this.emitter = new EventEmitter();
  }

  subscribe() {
    return fromEvent(this.emitter, PushServerService.EVENT_NAME);
  }

  // async emit(data: EventSource) {
  //   this.emitter.emit(PushServerService.EVENT_NAME, { data });
  // }
  async emit(data: any) {
    console.log('NOTIFICANDO WEBSOCKET ', data);
    this.emitter.emit(PushServerService.EVENT_NAME, { data });
  }
}
