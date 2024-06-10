import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PauseService } from './pause.service';
import { CreatePauseDto } from './dto/create-pause.dto';
import { UpdatePauseDto } from './dto/update-pause.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller({ path: 'pause', version: '1' })
export class PauseController {
  constructor(private readonly service: PauseService) {}

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  create(@Body() dto: CreatePauseDto, @Request() req) {
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
  update(@Param('id') id: string, @Body() dto: UpdatePauseDto, @Request() req) {
    return this.service.update(id, dto, req.user);
  }
}
