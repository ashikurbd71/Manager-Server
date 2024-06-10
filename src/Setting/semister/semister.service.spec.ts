import { Test, TestingModule } from '@nestjs/testing';
import { SemisterService } from './semister.service';

describe('SemisterService', () => {
  let service: SemisterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SemisterService],
    }).compile();

    service = module.get<SemisterService>(SemisterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
