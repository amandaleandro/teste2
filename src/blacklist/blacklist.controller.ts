import {
  Controller,
  Get,
  Post,
  Request,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BlacklistService } from './blacklist.service';
import { CreateBlacklistDto } from './dto/create-blacklist.dto';
import { UpdateBlacklistDto } from './dto/update-blacklist.dto';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'src/auth/role/role.decorator';
import { RoleGuard } from 'src/auth/role/role.guard';
import {
  FilteringParams,
  Filtering,
} from 'src/common/orm/generic-query/filters.decorator';
import {
  PaginationParams,
  Pagination,
} from 'src/common/orm/generic-query/pagination.decorator';
import {
  SortingParams,
  Sorting,
} from 'src/common/orm/generic-query/sort.decorator';

@Controller({ path: 'blacklist', version: '1' })
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  create(@Body() dto: CreateBlacklistDto, @Request() req) {
    return this.blacklistService.save(dto, req.user);
  }

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['phone', 'reason', 'createdAt']) sort?: Sorting,
    @FilteringParams(['phone', 'reason']) filter?: Filtering,
  ) {
    return this.blacklistService.findAllByQuery(paginationParams, sort, filter);
  }

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blacklistService.findById(id);
  }

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBlacklistDto,
    @Request() req,
  ) {
    return this.blacklistService.update(id, dto, req.user);
  }

  @Roles('ADMIN', 'SUPER', 'SUPERVISOR')
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blacklistService.delete(id);
  }
}
