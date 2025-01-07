import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { ProductEntity } from "./product.entity";

import { v4 as uuid } from "uuid";
import { ProductCreateDto } from "./dto/productCreate.dto";
import { ProductUpdateDto } from "./dto/productUpdate.dto";

@Controller("/products")
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Get()
  async list() {
    return {
      products: await this.productRepository.list(),
    };
  }

  @Post()
  async create(@Body() data: ProductCreateDto) {
    const product = new ProductEntity();

    product.id = uuid();
    product.name = data.name;
    product.price = data.price;

    this.productRepository.create(product);

    return {
      product,
    };
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: ProductUpdateDto) {
    const product = await this.productRepository.update(id, data);

    return {
      product,
    };
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    const product = await this.productRepository.delete(id);

    return {
      product,
    };
  }
}
