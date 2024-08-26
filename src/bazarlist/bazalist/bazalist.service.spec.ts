import { Test, TestingModule } from '@nestjs/testing';
import { BazalistService } from './bazalist.service';

describe('BazalistService', () => {
  let service: BazalistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BazalistService],
    }).compile();

    service = module.get<BazalistService>(BazalistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
