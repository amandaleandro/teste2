import { Injectable } from '@nestjs/common';
import { BlackList } from 'src/models/blacklist.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Filtering } from 'src/common/orm/generic-query/filters.decorator';
import { getWhere, getOrder } from 'src/common/orm/generic-query/orm.helper';
import { Pagination } from 'src/common/orm/generic-query/pagination.decorator';
import { Sorting } from 'src/common/orm/generic-query/sort.decorator';
import { PageMetaDto } from 'src/common/orm/page-meta.dto';
import { PageOptionsDto } from 'src/common/orm/page-options.dto';
import { PageDto } from 'src/common/orm/page.dto';
import { User } from 'src/models/user.model';
import {
  Repository,
  FindOptionsWhere,
  DeepPartial,
  FindOptionsOrder,
} from 'typeorm';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(BlackList)
    private repository: Repository<BlackList>,
  ) {}

  findById(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.repository.findOneByOrFail({
      phone: id,
    } as FindOptionsWhere<BlackList>);
  }

  findBy(where: FindOptionsWhere<BlackList>) {
    return this.repository.findBy(where);
  }

  findOneBy(where: FindOptionsWhere<BlackList>) {
    return this.repository.findOneBy(where);
  }

  update(id: string, dto: any, user: User) {
    if (user) {
      dto.lastChangedBy = user.username;
    } else {
      dto.lastChangedBy = 'SYSTEM';
    }
    return this.repository.update(id, dto);
  }

  save(entityLike: DeepPartial<BlackList>, user: User) {
    if (user) {
      entityLike.createdBy = user.username;
      entityLike.lastChangedBy = user.username;
    } else {
      entityLike.createdBy = 'SYSTEM';
      entityLike.lastChangedBy = 'SYSTEM';
    }

    return this.repository.save(entityLike);
  }

  saveAll(entities: DeepPartial<BlackList>[], user: User) {
    if (user) {
      entities.forEach((e) => {
        e.createdBy = user.username;
        e.lastChangedBy = user.username;
      });
    } else {
      entities.forEach((e) => {
        e.createdBy = 'SYSTEM';
        e.lastChangedBy = 'SYSTEM';
      });
    }

    return this.repository.save(entities);
  }

  delete(id: string) {
    return this.repository.delete({ phone: id });
  }

  async findAll(): Promise<BlackList[]> {
    return this.repository.find();
  }

  async findAllPaginated(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<BlackList>> {
    const queryBuilder = this.repository.createQueryBuilder();

    queryBuilder
      .orderBy('created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  public async findAllByQuery(
    { page, limit, size, offset }: Pagination,
    sort?: Sorting,
    filter?: Filtering,
  ) {
    const where = getWhere(filter) as FindOptionsWhere<BlackList>;
    const order = getOrder(sort) as FindOptionsOrder<BlackList>;

    const [items, total] = await this.repository.findAndCount({
      where,
      order,
      take: limit,
      skip: offset,
    });

    return {
      totalItems: total,
      items: items,
      page,
      size,
    };
  }

  public async findAllActives(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<BlackList>> {
    const queryBuilder = this.repository.createQueryBuilder();

    queryBuilder
      .where('is_active = true')
      .orderBy('created_at', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }
}
