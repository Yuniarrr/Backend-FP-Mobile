import { type TestingModule, Test } from '@nestjs/testing';

import { ClothController } from './cloth.controller';
import { ClothService } from './cloth.service';

describe('ClothController', () => {
  let controller: ClothController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClothController],
      providers: [ClothService],
    }).compile();

    controller = module.get<ClothController>(ClothController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
