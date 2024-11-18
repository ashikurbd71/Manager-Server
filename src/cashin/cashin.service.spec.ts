import { Test, TestingModule } from '@nestjs/testing';
import { CashinService } from './cashin.service';

describe('CashinService', () => {
  let service: CashinService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CashinService],
    }).compile();

    service = module.get<CashinService>(CashinService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
