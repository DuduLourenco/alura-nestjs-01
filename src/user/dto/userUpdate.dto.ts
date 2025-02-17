import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { UniqueEmail } from "../validation/unique-email.validator";

export class UserUpdateDto {
  @IsNotEmpty({
    message: "O nome não pode ser vazio",
  })
  @IsOptional()
  name: string;

  @IsEmail(undefined, {
    message: "O e-mail informado é inválido",
  })
  @UniqueEmail({})
  @IsOptional()
  email: string;

  @MinLength(6, {
    message: "A senha precisa ter pelo menos 6 caracteres",
  })
  @IsOptional()
  password: string;
}
