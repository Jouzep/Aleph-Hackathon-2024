import { Test, TestingModule } from '@nestjs/testing';
import { AlephController } from './aleph.controller';

describe('AlephController', () => {
  let controller: AlephController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlephController],
    }).compile();

    controller = module.get<AlephController>(AlephController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
