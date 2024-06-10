import { BaseModel } from 'src/models/basemodel';
import {
  DeepPartial,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { PageOptionsDto } from './page-options.dto';
import { PageDto } from './page.dto';
import { PageMetaDto } from './page-meta.dto';
import { Pagination } from 'src/common/orm/generic-query/pagination.decorator';
import { Sorting } from 'src/common/orm/generic-query/sort.decorator';
import { Filtering } from 'src/common/orm/generic-query/filters.decorator';
import { getOrder, getWhere } from 'src/common/orm/generic-query/orm.helper';
import { User } from 'src/models/user.model';
import { BaseModelIdNumber } from 'src/models/basemodelIdNumber';
export abstract class BasicRepository<T extends BaseModel | BaseModelIdNumber> {
  constructor(private repository: Repository<T>) {}

  findById(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.repository.findOneByOrFail({ id: id } as FindOptionsWhere<T>);
  }

  findBy(where: FindOptionsWhere<T>) {
    return this.repository.findBy(where);
  }

  findOneBy(where: FindOptionsWhere<T>) {
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

  save(entityLike: DeepPartial<T>, user: User) {
    if (user) {
      entityLike.createdBy = user.username;
      entityLike.lastChangedBy = user.username;
    } else {
      entityLike.createdBy = 'SYSTEM';
      entityLike.lastChangedBy = 'SYSTEM';
    }

    return this.repository.save(entityLike);
  }

  saveAll(entities: DeepPartial<T>[], user: User) {
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

  deactive(id: string) {
    return this.repository.update(id, { id: id } as any);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }

  async findAllPaginated(pageOptionsDto: PageOptionsDto): Promise<PageDto<T>> {
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
    const where = getWhere(filter) as FindOptionsWhere<T>;
    const order = getOrder(sort) as FindOptionsOrder<T>;

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
  ): Promise<PageDto<T>> {
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
