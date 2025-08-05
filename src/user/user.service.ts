import { Injectable, NotFoundException } from '@nestjs/common';
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

  async create(createUserDto: CreateUserDto): Promise<Partial<User> | null> {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, hashedRefreshToken, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<Partial<User> | null> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['subscriber'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, hashedRefreshToken, ...userWithoutPassword } = user;

    return userWithoutPassword;
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

  async updateHashedRefreshToken(userId: number, hashedRefreshToken: string) {
    return await this.userRepo.update({ id: userId }, { hashedRefreshToken });
  }
}
