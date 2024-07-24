import { Test, TestingModule } from '@nestjs/testing';
import { MealextraService } from './mealextra.service';

describe('MealextraService', () => {
  let service: MealextraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealextraService],
    }).compile();

    service = module.get<MealextraService>(MealextraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
