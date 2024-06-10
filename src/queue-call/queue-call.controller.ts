import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { QueueCallService } from './queue-call.service';
import { CreateQueueCallDto } from './dto/create-queue-call.dto';
import { UpdateQueueCallDto } from './dto/update-queue-call.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller({ path: 'queue-call', version: '1' })
export class QueueCallController {
  constructor(private readonly service: QueueCallService) {}

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  create(@Body() dto: CreateQueueCallDto, @Request() req) {
    return this.service.save(dto, req.user);
  }

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR', 'AGENT')
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateQueueCallDto,
    @Request() req,
  ) {
    return this.service.update(id, dto, req.user);
  }
}
