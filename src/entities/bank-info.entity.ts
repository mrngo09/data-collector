import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Website } from './website.entity';
import { Account } from './account.entity';

@Entity()
@Unique(['website', 'bank_id'])
export class BankInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Website)
  website: Website;

  @ManyToOne(() => Account)
  account: Account;

  @Column()
  bank_id: string;

  @Column({ type: 'json' })
  bank_data: any;

  @Column()
  created_at: Date;
}