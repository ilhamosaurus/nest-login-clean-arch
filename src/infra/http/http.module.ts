import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import {
  CreateUserUseCase,
  GetUserById,
  LoginUseCase,
} from 'src/application/auth/user';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.register({}),
  ],
  controllers: [UserController],
  providers: [CreateUserUseCase, LoginUseCase, GetUserById, JwtService],
  exports: [],
})
export class HttpModule {}
