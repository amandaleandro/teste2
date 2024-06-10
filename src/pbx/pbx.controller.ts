import { Body, Controller, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ExtenEvent } from './events/exten.event';

@Controller('pbx')
export class PbxController {
  constructor(private eventEmitter: EventEmitter2) {}

  @Post('asterisk-old/hook')
  asteriskOldEvents(@Body() event: ExtenEvent) {
    console.log(event);
    this.eventEmitter.emit('event.exten', event);
  }
}
