import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class ProductUpdateDto {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsNumber()
  @IsOptional()
  amount: number;

  @IsNotEmpty()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  category: string;
}
