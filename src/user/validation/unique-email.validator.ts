import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { UserRepository } from "../user.repository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({
  async: true,
})
export class UniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userRepository: UserRepository) {}

  async validate(value: string): Promise<boolean> {
    const userWithEmailExists = await this.userRepository.existsByEmail(value);

    return !userWithEmailExists;
  }

  defaultMessage?(): string {
    return "Já existe um usuário cadastrado com o e-mail informado";
  }
}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
  return (obj: object, propertyName: string) => {
    registerDecorator({
      target: obj.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueEmailValidator,
    });
  };
};
