import { Test, TestingModule } from '@nestjs/testing';
import { BazalistController } from './bazalist.controller';
import { BazalistService } from './bazalist.service';

describe('BazalistController', () => {
  let controller: BazalistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BazalistController],
      providers: [BazalistService],
    }).compile();

    controller = module.get<BazalistController>(BazalistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
