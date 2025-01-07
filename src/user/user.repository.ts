import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  private async get(id: string): Promise<UserEntity> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error("Usuário não existe");
    }

    return user;
  }

  async list() {
    return this.users;
  }

  async create(user: UserEntity) {
    this.users.push(user);
  }

  async update(id: string, data: Partial<UserEntity>): Promise<UserEntity> {
    const user = await this.get(id);

    Object.entries(data).forEach(([key, value]) => {
      if (key === "id") return;

      user[key] = value;
    });

    return user;
  }

  async delete(id: string) {
    const user = await this.get(id);

    this.users = this.users.filter((i) => i.id !== user.id);
  }

  async getByEmail(email: string): Promise<UserEntity | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async existsByEmail(email: string) {
    const user = await this.getByEmail(email);

    return user !== undefined;
  }
}
