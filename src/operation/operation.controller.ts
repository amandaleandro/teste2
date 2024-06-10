import { Controller, Get } from '@nestjs/common';
import { OperationService } from './operation.service';
import { OperationCacheService } from './operation-cache.service';
import { UserService } from 'src/user/user.service';

@Controller({ path: 'operation', version: '1' })
export class OperationController {
  constructor(
    private readonly service: OperationService,
    private readonly agentService: UserService,
    private readonly cache: OperationCacheService,
  ) {}

  @Get()
  async findAll() {
    const agents = await this.agentService
      .findBy({ role: 'AGENT', isActive: true })
      .then((originalArray) => {
        const newArray = originalArray.map((item) => item.id);
        return newArray;
      });
    return await this.cache.getMany(agents);
  }
}
