import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { Account } from '../entities/account.entity';

@Controller('websites/:websiteId/accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async findAll(@Param('websiteId') websiteId: string): Promise<Account[]> {
    return this.accountService.findAll(+websiteId);
  }

  @Post()
  async create(@Param('websiteId') websiteId: string, @Body() createAccountDto: CreateAccountDto): Promise<Account> {
    return this.accountService.create(+websiteId, createAccountDto);
  }

  @Get(':accountId')
  async findOne(@Param('websiteId') websiteId: string, @Param('accountId') accountId: string): Promise<Account> {
    return this.accountService.findOne(+websiteId, +accountId);
  }

  @Put(':accountId')
  async update(
    @Param('websiteId') websiteId: string,
    @Param('accountId') accountId: string,
    @Body() updateAccountDto: CreateAccountDto,
  ): Promise<Account> {
    return this.accountService.update(+websiteId, +accountId, updateAccountDto);
  }

  @Delete(':accountId')
  async remove(@Param('websiteId') websiteId: string, @Param('accountId') accountId: string): Promise<void> {
    return this.accountService.remove(+websiteId, +accountId);
  }
}