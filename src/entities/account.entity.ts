import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Website } from './website.entity';

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
}