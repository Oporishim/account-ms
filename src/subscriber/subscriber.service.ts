import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from './entities/subscriber.entity';
import { Repository } from 'typeorm';
import { Package } from 'src/package/entities/package.entity';

@Injectable()
export class SubscriberService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>,
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
  ) {}

  async create(createSubscriberDto: CreateSubscriberDto): Promise<Subscriber> {
    const pkg = await this.packageRepository.findOneBy({
      id: createSubscriberDto.packageId,
    });

    if (!pkg) {
      throw new Error(
        `Package with ID ${createSubscriberDto.packageId} not found`,
      );
    }

    const subscriber = this.subscriberRepository.create({
      ...createSubscriberDto,
      package: pkg,
    });
    await this.subscriberRepository.save(subscriber);

    return subscriber;
  }

  findAll() {
    return `This action returns all subscriber`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscriber`;
  }

  update(id: number, updateSubscriberDto: UpdateSubscriberDto) {
    console.log(updateSubscriberDto);
    return `This action updates a #${id} subscriber`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscriber`;
  }
}
