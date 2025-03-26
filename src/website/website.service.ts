import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Website } from '../entities/website.entity';
import { CreateWebsiteDto } from './dto/create-website.dto';

@Injectable()
export class WebsiteService {
  constructor(
    @InjectRepository(Website)
    private readonly websiteRepository: Repository<Website>,
  ) {}

  async findAll(): Promise<Website[]> {
    return this.websiteRepository.find();
  }

  async findOne(id: number): Promise<Website> {
    return this.websiteRepository.findOneOrFail({ where: { id } });
  }

  async create(createWebsiteDto: CreateWebsiteDto): Promise<Website> {
    const website = this.websiteRepository.create(createWebsiteDto);
    return this.websiteRepository.save(website);
  }

  async update(
    id: number,
    updateWebsiteDto: CreateWebsiteDto,
  ): Promise<Website> {
    await this.websiteRepository.update(id, updateWebsiteDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.websiteRepository.delete(id);
  }
}
