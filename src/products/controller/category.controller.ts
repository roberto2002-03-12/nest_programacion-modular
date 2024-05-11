import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories endpoints')
@Controller('category')
export class CategoryController {
  @Get('/:id/products/:productId')
  getCategory(@Param('id') id: number, @Param('productId') productId: number) {
    return `product ${productId} y ${id}`;
  }
}
