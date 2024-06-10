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
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';
import { CreateCallClassificationDto } from './dto/create-call-classification.dto';
import { UpdateCallClassificationDto } from './dto/update-call-classification.dto';
import { CallClassificationService } from './call-classification.service';

@Controller({ path: 'call-classification', version: '1' })
export class CallClassificationController {
  constructor(private readonly service: CallClassificationService) {}

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  create(@Body() dto: CreateCallClassificationDto, @Request() req) {
    return this.service.save(dto, req.user);
  }

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
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
    @Body() dto: UpdateCallClassificationDto,
    @Request() req,
  ) {
    return this.service.update(id, dto, req.user);
  }
}
