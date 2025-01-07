import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class ProductUpdateDto {
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  price: number;
}
