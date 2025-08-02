import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateUserDto {
  @IsDefined({ message: 'Name is required' })
  @IsNotEmpty({ message: 'Name value is required' })
  @IsString()
  name: string;

  @IsDefined({ message: 'Email address is required' })
  @IsNotEmpty({ message: 'Email address value is required' })
  @IsEmail()
  email: string;

  @IsDefined({ message: 'Phone number is required' })
  @IsNotEmpty({ message: 'Phone number value is required' })
  @IsString()
  phone: string;

  @IsDefined({ message: 'Password is required' })
  @IsNotEmpty({ message: 'Password value is required' })
  @IsString()
  password: string;

  @IsOptional()
  @ValidateNested()
  properties?: any;

  @IsDefined({ message: 'Package Id is required' })
  @IsNotEmpty({ message: 'Package Id value is required' })
  @IsNumber({}, { message: 'Package Id must be a number' })
  @IsPositive({ message: 'Package Id must be a positive number' })
  packageId: number;
}
