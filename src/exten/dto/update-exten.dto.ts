import { PartialType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';
import { Exten } from 'src/models/exten.model';

export class UpdateExtenDto extends PartialType(Exten) {
  @Exclude()
  name: string;

  @IsOptional()
  @IsString()
  secret: string;

  @IsOptional()
  @IsString()
  callerid: string;
}
