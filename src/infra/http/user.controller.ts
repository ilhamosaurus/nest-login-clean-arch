import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  CreateUserUseCase,
  GetUserById,
  LoginUseCase,
} from 'src/application/auth/user';
import { LoginDTO, RegisterDTO } from './dto';
import { JwtGuard } from 'src/application/auth/guard';
import { CurrentUser } from 'src/application/auth/decorator';
import { User } from 'src/domain/auth/user';

@Controller()
export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private loginUseCase: LoginUseCase,
  ) {}

  @Post('/register')
  async register(@Body() dto: RegisterDTO) {
    await this.createUserUseCase.execute(dto);
    return { message: 'User created successfully, please login' };
  }

  @Post('/login')
  async login(@Body() dto: LoginDTO) {
    const response = await this.loginUseCase.execute({username: dto.username, password: dto.password});
    return response;
  }

  @UseGuards(JwtGuard)
  @Get('/user')
  async getUser(@CurrentUser() user: User) {
    return user;
  }
}
