import { v4 as uuid } from "uuid";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserEntity } from "./user.entity";

import { UserCreateDto } from "./dto/userCreate.dto";
import { UserListDto } from "./dto/userList.dto";
import { UserUpdateDto } from "./dto/userUpdate.dto";

@Controller("/users")
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Get()
  async list() {
    const users = await this.userRepository.list();
    const list = users.map((user) => new UserListDto(user.id, user.name));

    return list;
  }

  @Post()
  async create(@Body() data: UserCreateDto) {
    const user = new UserEntity();

    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.id = uuid();

    this.userRepository.create(user);

    return {
      user: new UserListDto(user.id, user.name),
    };
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: UserUpdateDto) {
    const user = await this.userRepository.update(id, data);

    return {
      user: new UserListDto(user.id, user.name),
    };
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    await this.userRepository.delete(id);
  }
}
