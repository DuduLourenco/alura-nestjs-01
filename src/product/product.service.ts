import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ProductListDto } from "./dto/productList.dto";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepository: Repository<ProductEntity>,
  ) {}

  async list() {
    const storedProducts = await this.productRepository.find();
    const listProducts = storedProducts.map(
      (product) =>
        new ProductListDto(
          product.id,
          product.name,
          product.price,
          product.amount,
          product.description,
          product.category,
        ),
    );

    return listProducts;
  }

  async create(product: ProductEntity) {
    return await this.productRepository.save(product);
  }

  async update(id: string, newValues: Partial<ProductEntity>) {
    await this.productRepository.update(id, newValues);
  }

  async delete(id: string) {
    await this.productRepository.delete(id);
  }
}
