import { Injectable } from '@nestjs/common';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { Setting } from 'src/models/settings.model';
import { User } from 'src/models/user.model';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting)
    private readonly repository: Repository<Setting>,
  ) {}

  findById(id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    return this.repository.findOneBy({
      name: id,
    } as FindOptionsWhere<Setting>);
  }

  findAll() {
    return this.repository.find();
  }

  create(entityLike: DeepPartial<Setting>, user: User) {
    if (user) {
      entityLike.createdBy = user.username;
      entityLike.lastChangedBy = user.username;
    } else {
      entityLike.createdBy = 'SYSTEM';
      entityLike.lastChangedBy = 'SYSTEM';
    }
    return this.repository.save(entityLike);
  }

  update(id: string, dto: UpdateSettingDto, user: User) {
    if (user) {
      dto.lastChangedBy = user.username;
    } else {
      dto.lastChangedBy = 'SYSTEM';
    }
    return this.repository.update(id, dto);
  }
}
