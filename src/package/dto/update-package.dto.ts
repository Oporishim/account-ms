import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageDto } from './create-package.dto';
import { IsDefined, IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class UpdatePackageDto extends PartialType(CreatePackageDto) {
  @IsDefined({ message: 'Package Id is required' })
  @IsNotEmpty({ message: 'Package Id is required' })
  @IsNumber({}, { message: 'Package Id must be a number' })
  @IsPositive({ message: 'Package Id must be a positive number' })
  id: number;
}
