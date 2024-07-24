import { Test, TestingModule } from '@nestjs/testing';
import { MealextraController } from './mealextra.controller';
import { MealextraService } from './mealextra.service';

describe('MealextraController', () => {
  let controller: MealextraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MealextraController],
      providers: [MealextraService],
    }).compile();

    controller = module.get<MealextraController>(MealextraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
