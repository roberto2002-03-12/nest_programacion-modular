import { Controller, Get, Param } from '@nestjs/common';

@Controller('category')
export class CategoryController {
  @Get('/:id/products/:productId')
  getCategory(@Param('id') id: number, @Param('productId') productId: number) {
    return `product ${productId} y ${id}`;
  }
}
