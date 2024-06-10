import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller({ path: 'lead', version: '1' })
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Post()
  create(@Body() dtos: CreateCustomerDto[]) {
    this.service.saveAll(dtos, null);
  }

  // @Roles('Admin')
  // @UseGuards(JwtGuard, RoleGuard)
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateCustomerDto) {
    return this.service.update(id, dto, null);
  }
}
