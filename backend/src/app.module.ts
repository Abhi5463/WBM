import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WeightTransactionModule } from './weight-transaction/weight-transaction.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { SalesOrderModule } from './sales-order/sales-order.module';
import { SyncModule } from './sync/sync.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available globally
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Set to false in production
        options: {
          encrypt: false, // Set to true if you're using SSL
        },
      }),
    }),
    WeightTransactionModule,
    PurchaseOrderModule,
    SalesOrderModule,
    SyncModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
