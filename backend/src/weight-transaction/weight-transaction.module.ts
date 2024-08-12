import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeightTransaction } from './weight-transaction.entity';
import { WeightTransactionService } from './weight-transaction.service';
import { WeightTransactionController } from './weight-transaction.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeightTransaction], 'CargoWeighAdvConnection'),
  ],
  providers: [WeightTransactionService],
  controllers: [WeightTransactionController],
  exports: [WeightTransactionService],
})
export class WeightTransactionModule {}
