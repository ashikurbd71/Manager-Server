import { Test, TestingModule } from '@nestjs/testing';
import { MealmanageController } from './mealmanage.controller';
import { MealmanageService } from './mealmanage.service';

describe('MealmanageController', () => {
  let controller: MealmanageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealmanageController],
      providers: [MealmanageService],
    }).compile();

    controller = module.get<MealmanageController>(MealmanageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
