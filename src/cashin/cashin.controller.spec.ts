import { Test, TestingModule } from '@nestjs/testing';
import { CashinController } from './cashin.controller';
import { CashinService } from './cashin.service';

describe('CashinController', () => {
  let controller: CashinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CashinController],
      providers: [CashinService],
    }).compile();

    controller = module.get<CashinController>(CashinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
