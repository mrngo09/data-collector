import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { WebsiteService } from './website.service';
import { CreateWebsiteDto } from './dto/create-website.dto';
import { Website } from '../entities/website.entity';

@Controller('websites')
export class WebsiteController {
  constructor(private readonly websiteService: WebsiteService) {}

  @Get()
  async findAll(): Promise<Website[]> {
    return this.websiteService.findAll();
  }

  @Post()
  async create(@Body() createWebsiteDto: CreateWebsiteDto): Promise<Website> {
    return this.websiteService.create(createWebsiteDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Website> {
    return this.websiteService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateWebsiteDto: CreateWebsiteDto): Promise<Website> {
    return this.websiteService.update(+id, updateWebsiteDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.websiteService.remove(+id);
  }
}