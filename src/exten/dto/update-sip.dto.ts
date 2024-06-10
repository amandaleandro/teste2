import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';
import { Sip } from 'src/models/sip.model';

export class UpdateSipDto extends PartialType(Sip) {
  @Exclude()
  name: string;

  @IsOptional()
  @IsString()
  secret: string;

  @IsOptional()
  @IsString()
  callerid: string;
}
