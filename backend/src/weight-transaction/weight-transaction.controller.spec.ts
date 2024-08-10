import { Test, TestingModule } from '@nestjs/testing';
import { WeightTransactionController } from './weight-transaction.controller';

describe('WeightTransactionController', () => {
  let controller: WeightTransactionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeightTransactionController],
    }).compile();

    controller = module.get<WeightTransactionController>(WeightTransactionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
