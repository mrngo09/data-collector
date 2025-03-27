import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique } from 'typeorm';
import { Website } from './website.entity';

@Entity()
@Unique(['website', 'bank_id'])
export class BankInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Website)
  website: Website;

  @Column()
  bank_id: string;

  @Column()
  bank_branch: string;

  @Column()
  full_name: string;

  @Column({ type: 'json' })
  bank_data: any;

  @Column()
  created_at: Date;
}