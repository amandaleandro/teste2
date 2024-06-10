import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  UseGuards,
  ParseArrayPipe,
  Put,
} from '@nestjs/common';
import { CampaignService } from './campaign.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';
import { CreateCustomerDto } from 'src/customers/dto/create-customer.dto';

@Controller({ path: 'campaign', version: '1' })
export class CampaignController {
  constructor(private readonly service: CampaignService) {}

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  create(@Body() dto: CreateCampaignDto, @Request() req) {
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
    @Body() dto: UpdateCampaignDto,
    @Request() req,
  ) {
    return this.service.update(id, dto, req.user);
  }

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Patch(':id/customers')
  updateCampaignContacts(
    @Request() req,
    @Param('id') id,
    @Body(new ParseArrayPipe({ items: CreateCustomerDto }))
    customers: CreateCustomerDto[],
  ) {
    return this.service.updateContacts(id, customers, req.user);
  }

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Put(':id/customers')
  putWallet(
    @Request() req,
    @Param('id') id,
    @Body(new ParseArrayPipe({ items: CreateCustomerDto }))
    customers: CreateCustomerDto[],
  ) {
    return this.service.putContacts(id, customers, req.user);
  }
}
