import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "src/domain/auth/user";

interface GetByIdCommand {
  id: number
}

@Injectable()
export class GetUserById {
  constructor(private userRepository: UserRepository) {}

  async execute({id}: GetByIdCommand): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}