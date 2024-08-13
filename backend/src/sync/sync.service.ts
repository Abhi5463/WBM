import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeightTransaction } from '../weight-transaction/weight-transaction.entity';
import { WeightTransactionService } from '../weight-transaction/weight-transaction.service';

@Injectable()
export class SyncService {
  constructor(
    private weightTransactionService: WeightTransactionService,
    @InjectRepository(WeightTransaction, 'CargoWeighAdvConnection') // Fetch from CargoWeighAdv
    private weightTransactionRepository: Repository<WeightTransaction>,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE) // Change this as per your requirement
  async syncData() {
    try {
      // Query all data from the TransactionDetail table in CargoWeighAdv database
      const weightTransactions = await this.weightTransactionRepository.query(`
        SELECT * FROM CargoWeighAdv.dbo.TransactionDetails
      `);

      for (const item of weightTransactions) {
        // console.log(item.TransactionID);
        await this.weightTransactionService.create({
          TransactionID: item.TransactionID,
          TransactionType: item.TransactionType,
          TransactionCompleted: item.TransactionCompleted,
          EntryDateTime: item.EntryDateTime,
          ExitDateTime: item.ExitDateTime,
          VehicleRegistration: item.VehicleRegistration,
          VehicleCode: item.VehicleCode,
          CustomerName: item.CustomerName,
          CustomerCode: item.CustomerCode,
          SupplierName: item.SupplierName,
          SupplierCode: item.SupplierCode,
          ProductName: item.ProductName,
          ProductCode: item.ProductCode,
          HaulerName: item.HaulerName,
          HaulerCode: item.HaulerCode,
          DestinationName: item.DestinationName,
          DestinationCode: item.DestinationCode,
          SealNumber1: item.SealNumber1,
          TankNumber1: item.TankNumber1,
          SuppliedWeight: item.SuppliedWeight,
          SuppliedTicketNumber: item.SuppliedTicketNumber,
          PurchaseOrderNumber: item.PurchaseOrderNumber,
          DeliveryNumber: item.DeliveryNumber,
          GrossWeight: item.GrossWeight,
          TareWeight: item.TareWeight,
          NetWeight: item.NetWeight,
          Remarks: item.Remarks,
          Driver: item.Driver,
          ScaleMode: item.ScaleMode,
          ScaleID: item.ScaleID,
          ProductUnitWeight: item.ProductUnitWeight,
          ProductUnitPrice: item.ProductUnitPrice,
          ProductQuantity: item.ProductQuantity,
          TransactionTotal: item.TransactionTotal,
          UserFirstWeigh: item.UserFirstWeigh,
          UserSecondWeigh: item.UserSecondWeigh,
          PO_ID: item.PO_ID,
          SO_ID: item.SO_ID,
          Status: item.Status,
        });
      }

      console.log('Data synchronized successfully');
    } catch (error) {
      console.error('Error synchronizing data:', error);
    }
  }
}
