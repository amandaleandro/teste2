import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { NegotiationCallService } from './negotiation-call.service';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller({ path: 'cnd', version: '1' })
export class NegotiationCallController {
  constructor(private readonly service: NegotiationCallService) {}

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }
}
