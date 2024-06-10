import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateExtenDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  name: string;

  @IsNotEmpty()
  @IsString()
  secret: string;

  @IsNotEmpty()
  @IsString()
  protocol: string;

  @IsOptional()
  @IsString()
  callerid: string;

  @IsOptional()
  @IsString()
  protocolId: string;

  @IsOptional()
  @IsString()
  dialstring: string;
}
