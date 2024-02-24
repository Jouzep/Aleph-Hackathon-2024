import { Test, TestingModule } from '@nestjs/testing';
import { DictionnaryService } from './dictionnary.service';

describe('DictionnaryService', () => {
  let service: DictionnaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DictionnaryService],
    }).compile();

    service = module.get<DictionnaryService>(DictionnaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
