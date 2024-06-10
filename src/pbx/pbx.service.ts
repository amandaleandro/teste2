import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PbxUnavailableError } from 'src/exception-filter/exceptions/pbx-unavailable.error';

@Injectable()
export class PbxService {
  constructor(private readonly httpService: HttpService) {}

  call(exten: string, to: string, agent: string) {
    return this.httpService.axiosRef
      .post(`${process.env.PBX_HOST}/call`, {
        exten: exten,
        to: to,
        agent: agent,
      })
      .then((ret) => console.log(ret.statusText))
      .catch((error) => {
        throw new PbxUnavailableError();
      });
  }

  hangup(channelId: string) {
    console.log('================= ', channelId);
    return this.httpService.axiosRef
      .post(`${process.env.PBX_HOST}/hangup`, {
        channel: channelId,
      })
      .then((ret) => console.log(ret.statusText))
      .catch((error) => {
        throw new PbxUnavailableError();
      });
  }
}
