import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  // Login
  async login(credential: { email: string; password: string }) {
    const user = await this.userRepo.findOne({
      where: { email: credential.email },
      relations: ['subscriber'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await argon2.verify(user.password, credential.password);

    if (isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...userWithoutPassword } = user;
      const tokens = await this.generateUserTokens(user);

      // Update hashed refresh token
      const hashedRefreshToken = await argon2.hash(tokens.refreshToken);
      await this.userRepo.update(user.id, {
        hashedRefreshToken: hashedRefreshToken,
      });

      return {
        ...userWithoutPassword,
        ...tokens,
      };
    }

    throw new UnauthorizedException('Invalid credentials');
  }

  async logout(userId: number) {
    await this.userRepo.update({ id: userId }, { hashedRefreshToken: '' });
    return { success: true };
  }

  async generateUserTokens(user: User): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const payload: AuthJwtPayload = {
      sub: user.id,
      username: user.email,
      role: 'admin',
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload),
      this.jwtService.signAsync(payload, this.refreshTokenConfig),
    ]);

    return { accessToken, refreshToken };
  }

  // Verify the access-token
  validateToken(token: string) {
    try {
      const decoded = this.jwtService.verify<AuthJwtPayload>(token);
      return { valid: true, userId: decoded.sub, role: decoded.role };
    } catch (error) {
      console.log(error);
      return { valid: false, userId: null, role: null };
    }
  }

  // Verify the refresh-token
  async validateRefreshToken(token: string) {
    try {
      const decoded = this.jwtService.verify<AuthJwtPayload>(
        token,
        this.refreshTokenConfig,
      );

      const user = await this.userRepo.findOneBy({ id: decoded.sub });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (!user.hashedRefreshToken) {
        throw new UnauthorizedException('No refresh token set for user');
      }

      const isMatch = await argon2.verify(user.hashedRefreshToken, token);
      if (!isMatch) throw new UnauthorizedException('Invalid refresh token');

      return { valid: true, userId: decoded.sub, role: decoded.role };
    } catch (error) {
      console.log(error);
      return { valid: false, userId: null, role: null };
    }
  }

  async generateAccessToken(userId: number) {
    const user = await this.userRepo.findOneBy({ id: userId });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const payload: AuthJwtPayload = {
      sub: user.id,
      username: user.email,
      role: 'admin',
    };

    const accessToken = this.jwtService.sign(payload);

    return { accessToken };
  }
}
