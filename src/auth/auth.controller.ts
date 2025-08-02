import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignInDto } from './dto/sign-in.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth/signin' })
  signin(@Payload() signInDto: SignInDto) {
    const token = this.authService.login(signInDto);
    return {
      message: 'Token Generated Successfully',
      token,
    };
  }

  @MessagePattern({ cmd: 'auth/validate-token' })
  validateToken(@Payload() token: string) {
    return this.authService.validateToken(token);
  }
}
