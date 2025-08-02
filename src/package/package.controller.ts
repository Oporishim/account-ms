import { Controller, UsePipes } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { validationPipe } from 'src/pipes/GlobalValidation.pipe';
import { SearchDto } from './dto/search-package.dto';

@Controller()
export class PackageController {
  constructor(private readonly packageService: PackageService) {}

  @MessagePattern({ cmd: 'package/create' })
  @UsePipes(validationPipe)
  create(@Payload() createPackageDto: CreatePackageDto) {
    return this.packageService.create(createPackageDto);
  }

  @MessagePattern({ cmd: 'package/findAll' })
  @UsePipes(validationPipe)
  findAll(@Payload() searchDto: SearchDto) {
    return this.packageService.findAll(searchDto);
  }

  @MessagePattern({ cmd: 'package/findOne' })
  findOne(@Payload() payloads: { id: number }) {
    return this.packageService.findOne(+payloads.id);
  }

  @MessagePattern({ cmd: 'package/update' })
  @UsePipes(validationPipe)
  update(@Payload() updatePackageDto: UpdatePackageDto) {
    return this.packageService.update(updatePackageDto.id, updatePackageDto);
  }

  @MessagePattern({ cmd: 'package/remove' })
  remove(@Payload() payloads: { id: number }) {
    return this.packageService.remove(+payloads.id);
  }
}
