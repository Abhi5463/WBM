import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('weight_transaction')
export class WeightTransaction {
  @PrimaryGeneratedColumn()
  TransactionID: number;

  @Column({ nullable: true })
  TransactionType: string;

  @Column({ default: false, nullable: true })
  TransactionCompleted: boolean;

  @Column({ nullable: true })
  EntryDateTime: Date;

  @Column({ nullable: true })
  ExitDateTime: Date;

  @Column({ nullable: true })
  VehicleRegistration: string;

  @Column({ nullable: true })
  VehicleCode: string;

  @Column({ nullable: true })
  CustomerName: string;

  @Column({ nullable: true })
  CustomerCode: string | null;

  @Column({ nullable: true })
  SupplierName: string;

  @Column({ nullable: true })
  SupplierCode: string | null;

  @Column({ nullable: true })
  ProductName: string;

  @Column({ nullable: true })
  ProductCode: string | null;

  @Column({ nullable: true })
  HaulerName: string;

  @Column({ nullable: true })
  HaulerCode: string | null;

  @Column({ nullable: true })
  DestinationName: string;

  @Column({ nullable: true })
  DestinationCode: string | null;

  @Column({ nullable: true })
  SealNumber1: string;

  @Column({ nullable: true })
  TankNumber1: string;

  @Column('decimal', { nullable: true })
  SuppliedWeight: number;

  @Column({ nullable: true })
  SuppliedTicketNumber: string;

  @Column({ nullable: true })
  PurchaseOrderNumber: string;

  @Column({ nullable: true })
  DeliveryNumber: string;

  @Column('decimal', { nullable: true })
  GrossWeight: number;

  @Column('decimal', { nullable: true })
  TareWeight: number;

  @Column('decimal', { nullable: true })
  NetWeight: number | null;

  @Column({ nullable: true })
  Remarks: string;

  @Column({ nullable: true })
  Driver: string;

  @Column({ nullable: true })
  ScaleMode: string;

  @Column({ nullable: true })
  ScaleID: string;

  @Column('decimal', { nullable: true })
  ProductUnitWeight: number;

  @Column('decimal', { nullable: true })
  ProductUnitPrice: number;

  @Column('decimal', { nullable: true })
  ProductQuantity: number;

  @Column('decimal', { nullable: true })
  TransactionTotal: number;

  @Column({ nullable: true })
  UserFirstWeigh: string;

  @Column({ nullable: true })
  UserSecondWeigh: string;

  @Column({ nullable: true })
  PO_ID: string;

  @Column({ nullable: true })
  SO_ID: string;

  @Column({ nullable: true })
  Status: string | null;
}
