import { Test, TestingModule } from '@nestjs/testing';
import { WeightTransactionService } from './weight-transaction.service';

describe('WeightTransactionService', () => {
  let service: WeightTransactionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeightTransactionService],
    }).compile();

    service = module.get<WeightTransactionService>(WeightTransactionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
