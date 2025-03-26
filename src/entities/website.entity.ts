import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Website {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  login_url: string;

  @Column()
  bank_info_url: string;

  @OneToMany(() => Account, (account) => account.website)
  accounts: Account[];
}