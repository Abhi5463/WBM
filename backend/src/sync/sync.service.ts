import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
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
    @InjectRepository(WeightTransaction, 'CargoWeighAdvMiddlewareConnection') // Target CargoWeighAdv-middleware
    private middlewareTransactionRepository: Repository<WeightTransaction>,
  ) {}

  @Cron('2 0 * * *') // Change this as per your requirement
  async syncData() {
    try {
      // Step 1: Fetch all existing TransactionIDs from the middleware database
      const existingTransactionIDs =
        await this.middlewareTransactionRepository.find({
          select: ['TransactionID'],
        });
      const existingIDsSet = new Set(
        existingTransactionIDs.map((item) => item.TransactionID),
      );

      // Step 2: Query all data from the TransactionDetail table in CargoWeighAdv database
      const weightTransactions = await this.weightTransactionRepository.query(`
      SELECT * FROM CargoWeighAdv.dbo.TransactionDetails
    `);

      // Step 3: Filter out already existing TransactionIDs
      const newTransactions = weightTransactions.filter(
        (item: any) => !existingIDsSet.has(item.TransactionID),
      );

      for (const item of newTransactions) {
        console.log(item.TransactionID);
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
