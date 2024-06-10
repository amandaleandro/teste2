import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PauseType } from 'src/models/pause.model';

export class CreatePauseDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEnum(PauseType)
  type: PauseType;
}
