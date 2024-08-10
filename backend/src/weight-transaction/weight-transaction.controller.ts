import { Controller, Get, Post, Body } from '@nestjs/common';
import { WeightTransactionService } from './weight-transaction.service';
import { WeightTransaction } from './weight-transaction.entity';

@Controller('weight-transactions')
export class WeightTransactionController {
  constructor(private readonly weightTransactionService: WeightTransactionService) {}

  @Get()
  findAll(): Promise<WeightTransaction[]> {
    return this.weightTransactionService.findAll();
  }

  @Post()
  create(@Body() data: Partial<WeightTransaction>): Promise<WeightTransaction> {
    return this.weightTransactionService.create(data);
  }
}
