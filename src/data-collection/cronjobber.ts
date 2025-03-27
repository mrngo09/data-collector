import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from 'src/entities/account.entity';
import { BankInfo } from 'src/entities/bank-info.entity';
import { Website } from 'src/entities/website.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CronJobber {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
    @InjectRepository(BankInfo)
    private readonly bankInfoRepository: Repository<BankInfo>,
  ) {}
  @Cron('0 */10 * * * *') // Every 10 minutes
  collectData() {}

  private async processWebsite(website: Website) {
    let account: Account | null;
    while (true) {
      account = await this.accountRepository.findOne({
        where: { website, status: 'in use' },
      });
      if (!account) {
        break;
      }
    }
    try {
      
    } catch (error) {
      
    }
  }

  private async login(url: string, account: Account): Promise<string> {
    var payload = {
      ...account.payload,
      username: account.username,
      password: account.password,
    };
    const response = await this.httpService.axiosRef.post(url, payload);
    if (response.data.status === 'locked') {
      throw new Error('Account locked');
    }
    return response.data.access_token;
  }

  private async getBankCode(url: string, xtoken: string): Promise<any> {
    url += `/bank-code?xtoken=${xtoken}`;
    const response = await this.httpService.axiosRef.get(url, {
      headers: {},
    });
    return response.data;
  }

  private async getBankInfo(url: string, xtoken: string): Promise<any> {
    url += `/bank-info?xtoken=${xtoken}`;
    var payload = {
      amount: 500000,
      bank_code: 'VCB',
      bank_code2: 'VCB',
      ext_status: true,
    };
    const response = await this.httpService.axiosRef.post(url, payload);
    return response.data;
  }
}
