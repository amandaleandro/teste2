import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/auth/role/role.decorator';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { RoleGuard } from 'src/auth/role/role.guard';
import {
  Pagination,
  PaginationParams,
} from 'src/common/orm/generic-query/pagination.decorator';
import {
  Sorting,
  SortingParams,
} from 'src/common/orm/generic-query/sort.decorator';
import {
  Filtering,
  FilteringParams,
} from 'src/common/orm/generic-query/filters.decorator';
import { User } from 'src/models/user.model';
import { passwordHash } from 'src/common/utils/tools';
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Post()
  create(@Request() req, @Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto, req.user as User);
  }

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Get()
  findAll(
    @PaginationParams() paginationParams: Pagination,
    @SortingParams(['name', 'createdAt']) sort?: Sorting,
    @FilteringParams(['name', 'id', 'customerId']) filter?: Filtering,
  ) {
    return this.userService
      .findAllUsersByQuery(paginationParams, sort, filter)
      .then((res) => {
        res.items.forEach((c) => {
          delete c.password;
          return c;
        });
        return res;
      });
  }

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    const user = this.userService.findById(id);
    return user.then((u) => {
      delete u.password;
      return u;
    });
  }

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Patch(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    if (dto.password) {
      const hash = await passwordHash(dto.password);
      dto.password = hash;
    }
    return this.userService.update(id, dto, req.user);
  }

  @Roles('ADMIN', 'SUPER')
  @UseGuards(JwtGuard, RoleGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.deactive(id);
  }
}
