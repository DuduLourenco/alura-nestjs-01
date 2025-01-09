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
import { ProductService } from "./product.service";

@Controller("/products")
export class ProductController {
  constructor(
    private productRepository: ProductRepository,
    private productService: ProductService,
  ) {}

  @Get()
  async list() {
    return {
      products: await this.productService.list(),
    };
  }

  @Post()
  async create(@Body() data: ProductCreateDto) {
    const product = new ProductEntity();

    product.id = uuid();
    product.name = data.name;
    product.userId = data.userId;
    product.price = data.price;
    product.amount = data.amount;
    product.description = data.description;
    product.category = data.category;

    this.productService.create(product);

    return {
      product,
    };
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() data: ProductUpdateDto) {
    await this.productService.update(id, data);

    return {
      message: "Produto atualizado com sucesso!",
    };
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    await this.productService.delete(id);

    return {
      message: "Produto deletado com sucesso!",
    };
  }
}
