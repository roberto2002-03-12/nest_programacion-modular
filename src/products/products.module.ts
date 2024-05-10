import { Module } from '@nestjs/common';

import { ProductsController } from './controller/products.controller';
import { CategoryController } from './controller/category.controller';
import { BrandController } from './controller/brand/brand.controller';

import { BrandsService, CategoriesService, ProductService } from './services';

@Module({
  controllers: [ProductsController, CategoryController, BrandController],
  providers: [ProductService, CategoriesService, BrandsService],
})
export class ProductsModule {}
