import { Test, TestingModule } from '@nestjs/testing';
import { SemisterController } from './semister.controller';
import { SemisterService } from './semister.service';

describe('SemisterController', () => {
  let controller: SemisterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SemisterController],
      providers: [SemisterService],
    }).compile();

    controller = module.get<SemisterController>(SemisterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
