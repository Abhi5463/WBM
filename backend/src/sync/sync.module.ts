import { Module } from '@nestjs/common';
import { WeightTransactionModule } from '../weight-transaction/weight-transaction.module';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { WeightTransaction } from 'src/weight-transaction/weight-transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // Register WeightTransaction for CargoWeighAdv database connection
    TypeOrmModule.forFeature([WeightTransaction], 'CargoWeighAdvConnection'),
    // Register WeightTransaction for CargoWeighAdv-middleware database connection
    TypeOrmModule.forFeature(
      [WeightTransaction],
      'CargoWeighAdvMiddlewareConnection',
    ),
    WeightTransactionModule,
  ],
  providers: [SyncService],
  controllers: [SyncController],
})
export class SyncModule {}
