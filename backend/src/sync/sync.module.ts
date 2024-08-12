import { Module } from '@nestjs/common';
import { WeightTransactionModule } from '../weight-transaction/weight-transaction.module';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { WeightTransaction } from 'src/weight-transaction/weight-transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([WeightTransaction], 'CargoWeighAdvConnection'),
    WeightTransactionModule,
  ],
  providers: [SyncService],
  controllers: [SyncController],
})
export class SyncModule {}
