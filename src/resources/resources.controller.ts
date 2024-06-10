import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller('resources')
export class ResourcesController {
  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Get('exten')
  findAll() {
    return { protocols: ['SIP'] };
  }
}
