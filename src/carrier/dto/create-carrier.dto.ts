import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCarrierDto {
  @Exclude()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  secret: string;

  @IsString()
  @IsOptional()
  protocol: string;

  @IsString()
  @IsOptional()
  callerid: string;

  @IsString()
  @IsNotEmpty()
  host: string;
}
