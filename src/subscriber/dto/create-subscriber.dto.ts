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

export class CreateSubscriberDto {
  @IsDefined({ message: 'Name is required' })
  @IsNotEmpty({ message: 'Name value is required' })
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  tagline: string;

  @IsOptional()
  @IsString()
  logo: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsDefined({ message: 'Email address is required' })
  @IsNotEmpty({ message: 'Email address value is required' })
  @IsEmail()
  email: string;

  @IsDefined({ message: 'Phone number is required' })
  @IsNotEmpty({ message: 'Phone number value is required' })
  @IsString()
  phone: string;

  @IsOptional()
  @ValidateNested()
  address: any;

  @IsOptional()
  @ValidateNested()
  properties: any;

  @IsDefined({ message: 'Package Id is required' })
  @IsNotEmpty({ message: 'Package Id value is required' })
  @IsNumber({}, { message: 'Package Id must be a number' })
  @IsPositive({ message: 'Package Id must be a positive number' })
  packageId: number;
}
