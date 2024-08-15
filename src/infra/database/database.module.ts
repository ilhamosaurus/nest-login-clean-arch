import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from 'src/application/auth/user/user.repository';
import { PrismaUserRepository } from './repository/prisma-user.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}
