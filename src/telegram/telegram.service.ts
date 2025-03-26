import { Injectable, Inject } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  private readonly bot: TelegramBot;

  constructor(
    @Inject('TELEGRAM_CONFIG')
    private readonly config: { token: string; chatId: string },
  ) {
    this.bot = new TelegramBot(this.config.token);
  }

  async sendMessage(message: string) {
    await this.bot.sendMessage(this.config.chatId, message);
  }
}
