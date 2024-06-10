import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { Carrier } from 'src/models/carrier.model';

export class UpdateCarrierDto extends PartialType(Carrier) {
  @Exclude()
  id: string;

  @IsOptional()
  @IsString()
  secret: string;

  @IsOptional()
  @IsString()
  callerid: string;
}
