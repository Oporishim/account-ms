import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SubscriberService } from './subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { validationPipe } from 'src/pipes/GlobalValidation.pipe';

@Controller()
export class SubscriberController {
  constructor(private readonly subscriberService: SubscriberService) {}

  @MessagePattern({ cmd: 'subscriber/create' })
  @UsePipes(validationPipe)
  create(@Payload() createSubscriberDto: CreateSubscriberDto) {
    return this.subscriberService.create(createSubscriberDto);
  }

  @MessagePattern({ cmd: 'subscriber/findAll' })
  @UsePipes(validationPipe)
  findAll() {
    return this.subscriberService.findAll();
  }

  @MessagePattern({ cmd: 'subscriber/findOne' })
  findOne(@Payload() id: number) {
    return this.subscriberService.findOne(id);
  }

  @MessagePattern({ cmd: 'subscriber/update' })
  @UsePipes(validationPipe)
  update(@Payload() updateSubscriberDto: UpdateSubscriberDto) {
    return this.subscriberService.update(
      updateSubscriberDto.id,
      updateSubscriberDto,
    );
  }

  @MessagePattern({ cmd: 'subscriber/remove' })
  remove(@Payload() id: number) {
    return this.subscriberService.remove(id);
  }
}
