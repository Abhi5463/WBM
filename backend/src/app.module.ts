import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WeightTransactionModule } from './weight-transaction/weight-transaction.module';
import { PurchaseOrderModule } from './purchase-order/purchase-order.module';
import { SalesOrderModule } from './sales-order/sales-order.module';
import { SyncModule } from './sync/sync.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WeightTransaction } from './weight-transaction/weight-transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes the ConfigModule available globally
    }),
    ScheduleModule.forRoot(),
    // Connection to CargoWeighAdv (existing database)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'CargoWeighAdvConnection',
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('CARGO_WEIGH_ADV_DB_HOST'),
        port: parseInt(
          configService.get<string>('CARGO_WEIGH_ADV_DB_PORT'),
          10,
        ),
        username: configService.get<string>('CARGO_WEIGH_ADV_DB_USERNAME'),
        password: configService.get<string>('CARGO_WEIGH_ADV_DB_PASSWORD'),
        database: configService.get<string>('CARGO_WEIGH_ADV_DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: false, // Disable sync for the existing database
        logging: false,
        options: {
          encrypt: false, // Set to true if you're using SSL
        },
      }),
    }),

    // Connection to CargoWeighAdv-middleware (new database)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      name: 'CargoWeighAdvMiddlewareConnection',
      useFactory: (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        port: parseInt(configService.get<string>('DB_PORT'), 10),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [WeightTransaction],
        synchronize: true, // Enable sync for the middleware database
        logging: false,
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
