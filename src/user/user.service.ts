import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserListDto } from "./dto/userList.dto";
import { UserEntity } from "./user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async list() {
    const storedUsers = await this.userRepository.find();

    const listUsers = storedUsers.map(
      (user) => new UserListDto(user.id, user.name),
    );

    return listUsers;
  }

  async create(user: UserEntity) {
    const userCreated = await this.userRepository.save(user);

    return new UserListDto(userCreated.id, userCreated.name);
  }

  async update(id: string, newValues: Partial<UserEntity>) {
    await this.userRepository.update(id, newValues);
  }

  async delete(id: string) {
    await this.userRepository.delete(id);
  }
}
