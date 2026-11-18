import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { DrinkSize, TOPPING_PRICES } from '../orders.types.js';

const ALLOWED_TOPPINGS = Object.keys(TOPPING_PRICES);

export class CreateOrderItemDto {
  @IsString()
  @IsNotEmpty({ message: 'productId không được để trống' })
  productId!: string;

  @IsEnum(DrinkSize, { message: 'size phải là một trong các giá trị: S, M, L' })
  size!: DrinkSize;

  @IsOptional()
  @IsArray({ message: 'toppings phải là một mảng chuỗi' })
  @IsString({ each: true })
  @IsIn(ALLOWED_TOPPINGS, {
    each: true,
    message: `Topping không hợp lệ. Chỉ hỗ trợ: ${ALLOWED_TOPPINGS.join(', ')}`,
  })
  toppings?: string[];

  @IsInt({ message: 'qty phải là số nguyên' })
  @Min(1, { message: 'qty tối thiểu phải bằng 1' })
  qty!: number;
}

export class CreateOrderDto {
  @IsArray({ message: 'items phải là một mảng sản phẩm' })
  @ArrayMinSize(1, { message: 'Giỏ hàng phải có ít nhất 1 sản phẩm' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items!: CreateOrderItemDto[];

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Ghi chú tối đa 200 ký tự' })
  note?: string;
}
