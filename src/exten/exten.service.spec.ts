import { Test, TestingModule } from '@nestjs/testing';
import { ExtenService } from './exten.service';

describe('ExtenService', () => {
  let service: ExtenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtenService],
    }).compile();

    service = module.get<ExtenService>(ExtenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
