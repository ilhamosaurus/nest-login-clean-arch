import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "src/domain/auth/user";

interface CreateUserCommand {
  username: string;
  password: string;
  name: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {  }

  async execute({name, username, password}: CreateUserCommand): Promise<User> {
    const user = new User({
      name,
      username,
      password
    });

    const newUser = await this.userRepository.create(user)

    return newUser
  }
}
