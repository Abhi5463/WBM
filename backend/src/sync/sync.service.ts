import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { WeightTransactionService } from '../weight-transaction/weight-transaction.service';

@Injectable()
export class SyncService {
  constructor(private weightTransactionService: WeightTransactionService) {}

  @Cron(CronExpression.EVERY_MINUTE) // Change this as per your requirement
  async syncData() {
    try {
      const { data } = await axios.get('http://weight-bridge-system/api/transactions'); // Replace with actual endpoint

      for (const item of data) {
        await this.weightTransactionService.create({
          TransactionID: item.TransactionID,
          TransactionType: item.TransactionType,
          // Populate other fields as needed
        });
      }

      console.log('Data synchronized successfully');
    } catch (error) {
      console.error('Error synchronizing data:', error);
    }
  }
}
