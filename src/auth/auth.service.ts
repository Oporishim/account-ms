import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Login
  login(credential: { email: string; password: string }) {
    if (
      credential.email === 'bjayanta.me@gmail.com' &&
      credential.password === 'password'
    ) {
      const payload = { sub: '123', email: credential.email, role: 'admin' };
      const token = this.jwtService.sign(payload);
      return token;
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  // Verify the token
  validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify<JwtPayload>(token);
      return { valid: true, userId: decoded.sub, role: decoded.role };
    } catch (error) {
      console.log(error);
      return { valid: false, userId: null, role: null };
    }
  }
}
