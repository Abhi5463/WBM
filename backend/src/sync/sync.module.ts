import { Module } from '@nestjs/common';
import { WeightTransactionModule } from '../weight-transaction/weight-transaction.module';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';

@Module({
  imports: [WeightTransactionModule],
  providers: [SyncService],
  controllers: [SyncController],
})
export class SyncModule {}
