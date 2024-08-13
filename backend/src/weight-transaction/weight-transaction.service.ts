import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeightTransaction } from './weight-transaction.entity';

@Injectable()
export class WeightTransactionService {
  constructor(
    @InjectRepository(WeightTransaction, 'CargoWeighAdvMiddlewareConnection') // Specify the connection name here
    private weightTransactionMiddlewareRepository: Repository<WeightTransaction>,
  ) {}

  findAll(): Promise<WeightTransaction[]> {
    return this.weightTransactionMiddlewareRepository.find();
  }

  create(data: Partial<WeightTransaction>): Promise<WeightTransaction> {
    const transaction = this.weightTransactionMiddlewareRepository.create(data);
    return this.weightTransactionMiddlewareRepository.save(transaction);
  }
}
