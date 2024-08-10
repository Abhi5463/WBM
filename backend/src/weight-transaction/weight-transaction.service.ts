import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeightTransaction } from './weight-transaction.entity';

@Injectable()
export class WeightTransactionService {
  constructor(
    @InjectRepository(WeightTransaction)
    private weightTransactionRepository: Repository<WeightTransaction>,
  ) {}

  findAll(): Promise<WeightTransaction[]> {
    return this.weightTransactionRepository.find();
  }

  create(data: Partial<WeightTransaction>): Promise<WeightTransaction> {
    const transaction = this.weightTransactionRepository.create(data);
    return this.weightTransactionRepository.save(transaction);
  }
}
