export class ProductListDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly price: number,
    readonly amount: number,
    readonly description: string,
    readonly category: string,
  ) {}
}
