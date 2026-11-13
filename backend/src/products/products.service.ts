import { Injectable } from '@nestjs/common';
import type { Product } from './products.types.js';
import { SAMPLE_PRODUCTS } from './products.data.js';

@Injectable()
export class ProductsService {
  findAll(): Product[] {
    // Trả về bản sao phòng thủ để tránh thay đổi dữ liệu gốc khi xử lý request
    return SAMPLE_PRODUCTS.map((product) => ({ ...product }));
  }
}
