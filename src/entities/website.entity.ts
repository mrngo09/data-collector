import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Website {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  login_url: string;

  @Column({ nullable: true })
  payment_info_url: string;

  @Column({ nullable: true })
  bank_code_url: string;

  @OneToMany(() => Account, (account) => account.website)
  accounts: Account[];
}
