import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { WebsiteModule } from './website/website.module';
import { AccountModule } from './account/account.module';
import { DataCollectionService } from './data-collection/data-collection.service';

import { TelegramService } from './telegram/telegram.service';
import { Website } from './entities/website.entity';
import { Account } from './entities/account.entity';
import { BankInfo } from './entities/bank-info.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://mrnobody:password@host.docker.internal:5432/dbname',
      // port: 5432,
      // host: 'localhost',
      // username: 'mrnobody',
      // password: 'password',
      // database: 'dbname',
      entities: [Website, Account, BankInfo],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Website, Account, BankInfo]), // Add this line
    ScheduleModule.forRoot(),
    HttpModule,
    WebsiteModule,
    AccountModule,
  ],
  providers: [
    DataCollectionService,
    {
      provide: 'TELEGRAM_CONFIG',
      useValue: {
        token: process.env.TELEGRAM_TOKEN,
        chatId: process.env.TELEGRAM_CHAT_ID,
      },
    },
    TelegramService,
  ],
})
export class AppModule {}