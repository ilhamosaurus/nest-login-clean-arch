import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UserRepository } from 'src/application/auth/user/user.repository';
import { PrismaService } from '../prisma.service';
import { User } from 'src/domain/auth/user';
import { UserMapper } from '../mapper/user.mapper';
import * as bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private prisma: PrismaService) {}

  async findMany(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    if (!users || users.length === 0) {
      throw new NotFoundException('Users not found');
    }

    return users.map((user) => UserMapper.toDomain(user));
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserMapper.toSystem(user);
  }

  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return UserMapper.toDomain(user);
  }

  async create(user: User): Promise<User> {
    const data = UserMapper.toPrisma(user);
    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;

    try {
      const newUser = await this.prisma.user.create({
        data,
      });
      return UserMapper.toDomain(newUser);
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new UnprocessableEntityException('User already exists');
      }

      throw error;
    }
  }
}
