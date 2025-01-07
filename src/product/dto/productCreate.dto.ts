import { IsNotEmpty, IsNumber } from "class-validator";

export class ProductCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  price: number;
}
