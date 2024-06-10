import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { BasicRepository } from 'src/common/orm/basic.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { FindOptionsOrder, FindOptionsWhere, In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { passwordHash } from 'src/common/utils/tools';
import { Pagination } from 'src/common/orm/generic-query/pagination.decorator';
import { Sorting } from 'src/common/orm/generic-query/sort.decorator';
import { Filtering } from 'src/common/orm/generic-query/filters.decorator';
import { getOrder, getWhere } from 'src/common/orm/generic-query/orm.helper';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService extends BasicRepository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private eventEmitter: EventEmitter2,
  ) {
    super(userRepository);
  }

  async create(dto: CreateUserDto, user: User) {
    const hash = await passwordHash(dto.password);
    dto.password = hash;
    const userEntity = await this.save(dto, user);
    delete userEntity.password;
    this.eventEmitter.emit('event.new-user', userEntity);
    return userEntity;
  }

  public async findAllUsersByQuery(
    { page, limit, size, offset }: Pagination,
    sort?: Sorting,
    filter?: Filtering,
  ) {
    const where = getWhere(filter) as FindOptionsWhere<User>;
    const order = getOrder(sort) as FindOptionsOrder<User>;
    where.role = In(['SUPERVISOR', 'ADMIN']);

    const [languages, total] = await this.userRepository.findAndCount({
      where,
      order,
      take: limit,
      skip: offset,
    });

    return {
      totalItems: total,
      items: languages,
      page,
      size,
    };
  }
}
