import { IsNotEmpty, IsNumber } from "class-validator";

export class ProductCreateDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  userId: string;

  @IsNumber()
  price: number;

  @IsNumber()
  amount: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: string;
}
