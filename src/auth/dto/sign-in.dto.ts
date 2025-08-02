import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsDefined({ message: 'Email address is required' })
  @IsNotEmpty({ message: 'Email address value is required' })
  @IsEmail()
  email: string;

  @IsDefined({ message: 'Password is required' })
  @IsNotEmpty({ message: 'Password value is required' })
  @IsString()
  password: string;
}
