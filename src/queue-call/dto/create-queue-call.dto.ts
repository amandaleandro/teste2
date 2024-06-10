import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQueueCallDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
