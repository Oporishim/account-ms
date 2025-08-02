import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Package } from './entities/package.entity';
import { SearchDto } from './dto/search-package.dto';
import { DEFAULT_PAGE_SIZE } from 'src/utils/constants';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package) private packageRepository: Repository<Package>,
  ) {}

  async create(createPackageDto: CreatePackageDto): Promise<Package> {
    const record = this.packageRepository.create(createPackageDto);
    await this.packageRepository.save(record);
    return record;
  }

  async findAll(searchDto: SearchDto): Promise<Record<string, any>> {
    const conditions: Record<string, unknown> = {};
    const limit = searchDto.limit ?? DEFAULT_PAGE_SIZE;

    // Set conditions based on searchDto
    if (searchDto.name) conditions.name = Like(`%${searchDto.name}%`);

    const packages = await this.packageRepository.find({
      skip: searchDto.skip,
      take: limit,
      where: conditions,
      relations: ['subscribers'],
    });

    return {
      records: packages,
      skip: searchDto.skip ?? 0,
      limit: limit,
      total: await this.packageRepository.count(),
    };
  }

  async findOne(id: number): Promise<Package | null> {
    const record = await this.packageRepository.findOne({
      where: { id },
      relations: ['subscribers'],
    });

    if (!record) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }

    return record;
  }

  async update(
    id: number,
    updatePackageDto: UpdatePackageDto,
  ): Promise<Package> {
    const record = await this.packageRepository.findOneBy({ id });

    if (!record) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }

    const updatedPackage = this.packageRepository.merge(
      record,
      updatePackageDto,
    );

    return await this.packageRepository.save(updatedPackage);
  }

  async remove(id: number): Promise<any> {
    const record = await this.packageRepository.delete(id);

    if (record.affected === 0) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }

    return record;
  }
}
