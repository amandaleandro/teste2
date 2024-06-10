import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CarrierService } from './carrier.service';
import { CreateCarrierDto } from './dto/create-carrier.dto';
import { UpdateCarrierDto } from './dto/update-carrier.dto';
import { Roles } from 'src/auth/role/role.decorator';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';

@Controller({ path: 'carrier', version: '1' })
export class CarrierControllerV1 {
  constructor(private readonly service: CarrierService) {}

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  create(@Body() dto: CreateCarrierDto) {
    return this.service.create(dto);
  }

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCarrierDto) {
    return this.service.update(id, dto);
  }

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
