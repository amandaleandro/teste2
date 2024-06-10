import { Sip } from 'src/models/sip.model';
import { CreateExtenDto } from './create-exten.dto';
import { UpdateExtenDto } from './update-exten.dto';
import { UpdateSipDto } from './update-sip.dto';
import { Carrier } from 'src/models/carrier.model';
import { genUUID } from 'src/common/utils/tools';

export class SipBuilder {
  static buildSipExten(dto: CreateExtenDto | UpdateExtenDto): Sip {
    const sip = new Sip();
    Object.assign(sip, dto);
    sip.context = 'ramais';
    sip.callerid = dto.callerid;
    sip.disallow = 'all';
    sip.allow = 'alaw';
    sip.defaultuser = dto.name;
    sip.host = 'dynamic';
    sip.nat = 'yes';
    sip.type = 'friend';
    sip.qualify = 'yes';
    sip.transport = 'udp';
    sip.dtmfmode = 'RFC2833';
    dto.protocol = 'SIP';
    dto.protocolId = dto.name;
    dto.dialstring = dto.protocol + '/' + sip.name;
    return sip;
  }
  static trunk(entity: Carrier): Sip {
    const sip = new Sip();
    Object.assign(sip, entity);
    sip.name = genUUID();
    sip.context = 'troncos';
    sip.callerid = entity.callerid;
    sip.disallow = 'all';
    sip.allow = 'alaw;g729';
    sip.nat = 'yes';
    sip.type = 'peer';
    sip.qualify = 'yes';
    sip.transport = 'udp';
    sip.dtmfmode = 'RFC2833';
    entity.protocol = 'SIP';
    entity.dialstring = entity.protocol + '/' + sip.name;
    return sip;
  }

  static updateSIP(dto: CreateExtenDto | UpdateExtenDto): UpdateSipDto {
    const sip = new UpdateSipDto();
    Object.assign(sip, dto);
    return sip;
  }
}
