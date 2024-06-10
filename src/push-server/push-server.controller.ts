import { Controller, Sse, Post, Body } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PushServerService } from './push-server.service';

@Controller('push-server')
export class PushServerController {
  constructor(private readonly pushServerService: PushServerService) {}

  @Sse()
  sse(): Observable<any> {
    return this.pushServerService.subscribe();
  }

  @Post('/emit')
  async emit(@Body() data: any) {
    this.pushServerService.emit(data);
  }
}
