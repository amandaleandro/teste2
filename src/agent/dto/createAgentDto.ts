import { IsString, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

export class CreateAgentDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  exten: string;

  createUserDTO(): CreateUserDto {
    const userDto = new CreateUserDto();
    Object.assign(userDto, this);
    userDto.role = 'AGENT';
    return userDto;
  }
}
