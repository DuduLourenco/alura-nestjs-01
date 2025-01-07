import { ProductEntity } from "./product.entity";

export class ProductRepository {
  private products: ProductEntity[] = [];

  async get(id: string) {
    const product = this.products.find((p) => p.id === id);

    if (!product) {
      throw new Error("Produto não existe");
    }

    return product;
  }

  async list() {
    return this.products;
  }

  async create(product: ProductEntity) {
    this.products.push(product);
  }

  async update(id: string, data: Partial<ProductEntity>) {
    const product = await this.get(id);

    Object.entries(data).forEach(([key, value]) => {
      if (key === "id") return;

      product[key] = value;
    });

    return product;
  }

  async delete(id: string) {
    const product = await this.get(id);

    this.products = this.products.filter((p) => p.id !== product.id);

    return product;
  }
}
