import { Module } from '@nestjs/common';
import { SalesOrderService } from './sales-order.service';

@Module({
  providers: [SalesOrderService]
})
export class SalesOrderModule {}
