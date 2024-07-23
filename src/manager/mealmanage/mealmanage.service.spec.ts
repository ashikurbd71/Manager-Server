import { Test, TestingModule } from '@nestjs/testing';
import { MealmanageService } from './mealmanage.service';

describe('MealmanageService', () => {
  let service: MealmanageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MealmanageService],
    }).compile();

    service = module.get<MealmanageService>(MealmanageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
