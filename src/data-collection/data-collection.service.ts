import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Website } from '../entities/website.entity';
import { Account } from '../entities/account.entity';
import { BankInfo } from '../entities/bank-info.entity';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class DataCollectionService {
  constructor(
    private readonly httpService: HttpService,
    private readonly telegramService: TelegramService,
    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(BankInfo)
    private readonly bankInfoRepository: Repository<BankInfo>,
  ) {}

  @Cron('0 */10 * * * *') // Every 10 minutes
  async collectData() {
    const websites = await this.websiteRepository.find();
    for (const website of websites) {
      await this.processWebsite(website);
    }
  }

  private async processWebsite(website: Website) {
    let account: Account | null;
    while (true) {
      account = await this.accountRepository.findOne({
        where: { website, status: 'unused' },
      });
      if (!account) {
        console.log(`No unused accounts for website ${website.name}`);
        return;
      }

      await this.accountRepository.update(account.id, { status: 'in use' });
      try {
        const accessToken = await this.login(website, account);
        const bankInfos = await this.getBankInfos(website, accessToken);
        for (const bankInfo of bankInfos) {
          const exists = await this.bankInfoRepository.findOne({
            where: { website, bank_id: bankInfo.bank_id },
          });
          if (!exists) {
            await this.bankInfoRepository.save({
              website,
              account,
              bank_id: bankInfo.bank_id,
              bank_data: bankInfo,
              created_at: new Date(),
            });
            await this.telegramService.sendMessage(
              `New bank information for ${website.name}: ${bankInfo.bank_id}`,
            );
          }
        }
        await this.accountRepository.update(account.id, { status: 'unused' });
        return;
      } catch (error) {
        if (this.isLockedError(error)) {
          await this.accountRepository.update(account.id, { status: 'locked' });
        } else {
          console.error(`Error processing ${website.name}:`, error);
          await this.accountRepository.update(account.id, { status: 'unused' });
          return;
        }
      }
    }
  }

  private async login(website: Website, account: Account): Promise<string> {
    var payload = {
      ...account.payload,
      username: account.username,
      password: account.password,
    };
    const response = await this.httpService.axiosRef.post(
      website.login_url,
      payload,
    );
    if (response.data.status === 'locked') {
      throw new Error('Account locked');
    }
    return response.data.access_token;
  }

  private async getBankInfos(
    website: Website,
    accessToken: string,
  ): Promise<any[]> {
    const response = await this.httpService.axiosRef.get(
      website.payment_info_url,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    return response.data.bank_infos;
  }

  private isLockedError(error: any): boolean {
    return error.message === 'Account locked';
  }
}
