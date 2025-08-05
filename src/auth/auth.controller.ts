import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignInDto } from './dto/sign-in.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern({ cmd: 'auth/signin' })
  signin(@Payload() signInDto: SignInDto) {
    return this.authService.login(signInDto);
  }

  @MessagePattern({ cmd: 'auth/signout' })
  signout(@Payload() userId: number) {
    return this.authService.logout(userId);
  }

  @MessagePattern({ cmd: 'auth/validate-token' })
  validateToken(@Payload() accessToken: string) {
    return this.authService.validateToken(accessToken);
  }

  @MessagePattern({ cmd: 'auth/validate-refresh-token' })
  validateRefreshToken(@Payload() refreshToken: string) {
    return this.authService.validateRefreshToken(refreshToken);
  }

  @MessagePattern({ cmd: 'auth/refresh-token' })
  refresh(@Payload() userId: number) {
    return this.authService.generateAccessToken(userId);
  }
}
