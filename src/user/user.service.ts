import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Subscriber } from 'src/subscriber/entities/subscriber.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepo: Repository<Subscriber>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const subscriber = this.subscriberRepo.create({
      name: createUserDto.name,
      email: createUserDto.email,
      phone: createUserDto.phone,
      package: { id: createUserDto.packageId },
    });
    await this.subscriberRepo.save(subscriber);

    const user = this.userRepo.create({
      ...createUserDto,
      subscriber: subscriber,
    });
    await this.userRepo.save(user);

    return user;
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findByEmail(email: string) {
    return this.userRepo.findOne({ where: { email } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
