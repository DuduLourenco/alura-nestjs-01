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
import { UserService } from "./user.service";

import { UserCreateDto } from "./dto/userCreate.dto";
import { UserUpdateDto } from "./dto/userUpdate.dto";

@Controller("/users")
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

  @Get()
  async list() {
    const list = await this.userService.list();

    return list;
  }

  @Post()
  async create(@Body() data: UserCreateDto) {
    const user = new UserEntity();

    user.name = data.name;
    user.email = data.email;
    user.password = data.password;
    user.id = uuid();

    const userCreated = await this.userService.create(user);

    return {
      user: userCreated,
    };
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: UserUpdateDto) {
    await this.userService.update(id, data);

    return {
      message: "Usuário atualizado com sucesso!",
    };
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    await this.userService.delete(id);

    return {
      message: "Usuário deletado com sucesso!",
    };
  }
}
