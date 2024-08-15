import { Prisma, User as PrismaUser } from '@prisma/client';
import { User } from 'src/domain/auth/user';
export class UserMapper {
  static toDomain(entity: PrismaUser): User {
    const model = new User({
      name: entity.name,
      username: entity.username,
    });

    return model;
  }

  static toSystem(entity: PrismaUser): User {
    const model = new User({
      id: entity.id,
      name: entity.name,
      username: entity.username,
      password: entity.password,
    });

    return model;
  }

  static toPrisma(model: User) {
    return {
      name: model.name,
      username: model.username,
      password: model.password,
    };
  }
}
