import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../entities/account.entity';
import { Website } from '../entities/website.entity';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private readonly accountRepository: Repository<Account>,
    @InjectRepository(Website) private readonly websiteRepository: Repository<Website>,
  ) {}

  async findAll(websiteId: number): Promise<Account[]> {
    return this.accountRepository.find({ where: { website: { id: websiteId } } });
  }

  async findOne(websiteId: number, accountId: number): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id: accountId, website: { id: websiteId } },
    });
    if (!account) {
      throw new NotFoundException('Account not found');
    }
    return account;
  }

  async create(websiteId: number, createAccountDto: CreateAccountDto): Promise<Account> {
    const website = await this.websiteRepository.findOneOrFail({ where: { id: websiteId } });
    const account = this.accountRepository.create({ ...createAccountDto, website });
    return this.accountRepository.save(account);
  }

  async update(websiteId: number, accountId: number, updateAccountDto: CreateAccountDto): Promise<Account> {
    const account = await this.findOne(websiteId, accountId);
    Object.assign(account, updateAccountDto);
    return this.accountRepository.save(account);
  }

  async remove(websiteId: number, accountId: number): Promise<void> {
    const account = await this.findOne(websiteId, accountId);
    await this.accountRepository.remove(account);
  }
}