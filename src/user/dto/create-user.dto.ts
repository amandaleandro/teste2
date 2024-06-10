import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsString()
  password: string;

  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  @IsOptional()
  role: string;
}
