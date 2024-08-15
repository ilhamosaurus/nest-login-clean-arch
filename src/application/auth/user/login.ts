import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

interface LoginCommand {
  username: string;
  password: string;
}

@Injectable()
export class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async execute({
    username,
    password,
  }: LoginCommand): Promise<{ access_token: string }> {
    const user = await this.userRepository.findByUsername(username);
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new ForbiddenException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      username: user.username,
      name: user.name,
    };
    const secret = this.configService.get<string>('SECRET');
    const token = this.jwtService.sign(payload, {
      secret,
      expiresIn: '2h',
      algorithm: 'HS256',
    });

    return { access_token: token };
  }
}
