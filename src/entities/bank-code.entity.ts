import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['bank_code'])
export class BankCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bank_code: string;

  @Column()
  bank_name: string;

  @Column()
  bank_code2: string;

  @Column()
  nicepay_code: string;
}
