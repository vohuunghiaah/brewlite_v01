import { Injectable } from '@nestjs/common';
import { SAMPLE_PRODUCTS } from './products.data.js';
import { Product } from './products.types.js';

@Injectable()
export class ProductsService {
  private readonly products: readonly Product[] = SAMPLE_PRODUCTS;

  findAll(): Product[] {
    return [...this.products];
  }
}
