/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ExtenEvent } from 'src/pbx/events/exten.event';
import { SettingsService } from 'src/settings/settings.service';
import { OperationCacheService } from '../operation-cache.service';
import { Operation } from '../operation';
import { HttpService } from '@nestjs/axios';
import axios, { Axios } from 'axios';
import { PushServerService } from 'src/push-server/push-server.service';
import { User } from 'src/models/user.model';
import { OperationLogService } from 'src/operation-log/operation-log.service';
import e from 'express';

@Injectable()
export class EventListener implements OnModuleInit {
  private hook: string;
  private readonly logger = new Logger(EventListener.name);
  constructor(
    private readonly settingService: SettingsService,
    private readonly cache: OperationCacheService,
    private readonly httpService: HttpService,
    private readonly pushServer: PushServerService,
    private readonly logService: OperationLogService,
  ) {}

  async onModuleInit() {
    const conf = await this.settingService.findById('webhook');
    if (conf) {
      this.hook = conf.value.url;
      this.logger.debug(`Webhook addded ${this.hook}`);
    }
  }

  @OnEvent('event.new-user')
  async handleNewUserEvents(event: User) {
    if (event.role === 'AGENT') {
      const op = new Operation(event);
      this.cache.set(event.id, op);
      if (event.exten) {
        this.cache.set(event.exten.dialstring, op);
      }
    }
  }

  @OnEvent('event.exten')
  async handleExtenEvents(event: ExtenEvent) {
    this.logger.log('New Event', event);
    const cachedExten = (await this.cache.get(event.channel)) as Operation;
    if (!cachedExten) {
      console.log('NAO ACHOU NO CACHE');
      return;
    }
    const cachedUser = (await this.cache.get(cachedExten.agentId)) as Operation;
    this.dispatchEvent(event, cachedUser, cachedExten);
  }

  @OnEvent('event.agent')
  async handleAgentEvents(event: any) {
    console.log(event.state)
    await this.logService.create(event);
    return this.notifyHooks(event);
  }

  async dispatchEvent(
    event: ExtenEvent,
    userOperation: Operation,
    extenOperation: Operation,
  ) {
    // console.log('USER => ', userOperation, 'evento => ' + event.state);
    // console.log('EXTEN => ', extenOperation, 'evento => ' + event.state);
    try {
      if (event.state === 'RING') {
        userOperation.onPhone();
        userOperation.callId = event.uniqueid;
        extenOperation.callId = event.uniqueid;
        extenOperation.channelString = event.channelString;
        userOperation.channelState = event.state;
        extenOperation.channelState = event.state;
        extenOperation.onPhone();
      } else if (event.state === 'RINGING') {
        userOperation.channelState = event.state;
        extenOperation.channelState = event.state;
        extenOperation.channelString = event.channelString;
        userOperation.callId = event.uniqueid;
        extenOperation.callId = event.uniqueid;
        userOperation.onPhone();
        extenOperation.onPhone();
      } else if (event.state === 'UP') {
        userOperation.channelState = event.state;
        extenOperation.channelState = event.state;
        extenOperation.channelString = event.channelString;
        userOperation.callId = event.uniqueid;
        extenOperation.callId = event.uniqueid;
        userOperation.onPhone();
        extenOperation.onPhone();
        return;
      } else if (event.state === 'DOWN') {
        userOperation.channelState = event.state;
        extenOperation.channelState = event.state;
        userOperation.available();
        extenOperation.available();
      } else if (event.state === 'HANGUP') {
        userOperation.channelState = event.state;
        extenOperation.channelState = event.state;
        userOperation.callId = null;
        extenOperation.callId = null;
        userOperation.available();
        extenOperation.available();
      }
    } catch (error) {
      console.error(error);
    }
    // console.log('USER => ', userOperation, 'evento => ' + event.state);
    // console.log('EXTEN => ', extenOperation, 'evento => ' + event.state);
    await this.logService.create(userOperation);
    return this.notifyHooks(userOperation.emittEvent());
  }

  notifyHooks(event: any) {
    console.log('notificando hook => ', this.hook);
    if (!this.hook) {
      return;
    }
    this.pushServer.emit(event);

    return axios
      .post(this.hook, event)
      .then((ret) => {
        console.log(`Retorno do webhoook ${ret.data}`);
      })
      .catch((err) => {
        this.logger.error(`Webhoook Error: ${err.message}`);
      });
  }
}
