import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Subscriber } from 'src/subscriber/entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Subscriber])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
