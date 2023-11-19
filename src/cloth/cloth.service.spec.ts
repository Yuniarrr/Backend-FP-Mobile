import { Test, TestingModule } from '@nestjs/testing';
import { ClothService } from './cloth.service';

describe('ClothService', () => {
  let service: ClothService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClothService],
    }).compile();

    service = module.get<ClothService>(ClothService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
