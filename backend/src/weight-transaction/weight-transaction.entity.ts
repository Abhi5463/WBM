import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class WeightTransaction {
  @PrimaryGeneratedColumn()
  TransactionID: number;

  @Column()
  TransactionType: string;

  @Column({ default: false })
  TransactionCompleted: boolean;

  @Column()
  EntryDateTime: Date;

  @Column()
  ExitDateTime: Date;

  @Column()
  VehicleRegistration: string;

  @Column()
  VehicleCode: string;

  @Column()
  CustomerName: string;

  @Column()
  CustomerCode: string;

  @Column()
  SupplierName: string;

  @Column()
  SupplierCode: string;

  @Column()
  ProductName: string;

  @Column()
  ProductCode: string;

  @Column()
  HaulerName: string;

  @Column()
  HaulerCode: string;

  @Column()
  DestinationName: string;

  @Column()
  DestinationCode: string;

  @Column()
  SealNumber1: string;

  @Column()
  TankNumber1: string;

  @Column('decimal')
  SuppliedWeight: number;

  @Column()
  SuppliedTicketNumber: string;

  @Column()
  PurchaseOrderNumber: string;

  @Column()
  DeliveryNumber: string;

  @Column('decimal')
  GrossWeight: number;

  @Column('decimal')
  TareWeight: number;

  @Column('decimal')
  NetWeight: number;

  @Column()
  Remarks: string;

  @Column()
  Driver: string;

  @Column()
  ScaleMode: string;

  @Column()
  ScaleID: string;

  @Column('decimal')
  ProductUnitWeight: number;

  @Column('decimal')
  ProductUnitPrice: number;

  @Column('decimal')
  ProductQuantity: number;

  @Column('decimal')
  TransactionTotal: number;

  @Column('decimal')
  UserFirstWeigh: number;

  @Column('decimal')
  UserSecondWeigh: number;

  @Column({ nullable: true })
  PO_ID: string;

  @Column({ nullable: true })
  SO_ID: string;

  @Column()
  Status: string;
}
