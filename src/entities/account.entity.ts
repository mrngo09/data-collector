import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  Timestamp,
} from 'typeorm';
import { Website } from './website.entity';

export enum AccountStatus {
  Unused = 'Unused',
  Locked = 'Locked',
  InUse = 'InUse',
}

@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Website, (website) => website.accounts)
  website: Website;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ default: 'unused' })
  status: 'locked' | 'unused' | 'in use';

  @Column({nullable: true})
  payload: AccountPayload;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  time: Timestamp;
}

class AccountPayload {
  app_id: string;
  os: string;
  device: string;
  browser: string;
  fg: string;
  time: Timestamp;
  sign: string;
  aff_id: string;
  r_token: string;
  version: string;
}
