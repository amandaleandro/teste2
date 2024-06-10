import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Operation } from './operation';

@Injectable()
export class OperationCacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getKeys(key: string): Promise<any> {
    return await this.cacheManager.store.keys(key);
  }
  async set(key: string, value: any): Promise<void> {
    return await this.cacheManager.set(key, value);
  }

  async delete(key: string): Promise<void> {
    return await this.cacheManager.del(key);
  }

  async get(key: string): Promise<Operation> {
    return await this.cacheManager.get(key);
  }
  getMany(keys: string[]) {
    return this.cacheManager.store.mget(...keys);
  }
}
