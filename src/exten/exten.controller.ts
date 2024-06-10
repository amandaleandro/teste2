import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExtenService } from './exten.service';
import { CreateExtenDto } from './dto/create-exten.dto';
import { UpdateExtenDto } from './dto/update-exten.dto';

@Controller({ path: 'exten', version: '1' })
export class ExtenControllerV1 {
  constructor(private readonly extenService: ExtenService) {}

  @Post()
  create(@Body() createExtenDto: CreateExtenDto) {
    return this.extenService.create(createExtenDto);
  }

  @Get()
  findAll() {
    return this.extenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.extenService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExtenDto: UpdateExtenDto) {
    return this.extenService.update(id, updateExtenDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.extenService.remove(id);
  }
}
