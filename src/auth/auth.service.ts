import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}
  async login(username: string, password: string) {
    const user = await this.validateCredentials(username, password);
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role,
      name: user.name,
      exten: user.exten,
    };
    return this.jwtService.sign(payload);
  }

  async validateCredentials(username: string, password: string) {
    const user = await this.userService.findOneBy({ username: username });
    if (!user) {
      console.log(`Error to authenticate ${username}`);
      throw new UnauthorizedException();
    }
    if (bcrypt.compareSync(password, user.password)) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
