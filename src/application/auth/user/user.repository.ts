import { User } from 'src/domain/auth/user';

export abstract class UserRepository {
  abstract findMany(): Promise<User[]>;
  abstract findByUsername(username: string): Promise<User>;
  abstract findById(id: number): Promise<User>;
  abstract create(user: User): Promise<User>;
}
