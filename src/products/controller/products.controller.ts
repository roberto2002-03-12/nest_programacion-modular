import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  // Res,
  ParseIntPipe,
} from '@nestjs/common';

// import { Response } from 'express'

import { ProductService } from '../services/product.service';
// import { Product } from 'src/entities/product.entity';
import { ParseIntPipe as CustomParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) {}

  // @Get()
  // @HttpCode(HttpStatus.ACCEPTED)
  // getProducts(
  //   @Query('limit') limit: number = 20,
  //   @Query('offset') offset: number = 0,
  //   @Query('brand') brand: string,
  // ) {
  //   return `${limit} ${offset} ${brand}`
  // }

  @Get()
  @HttpCode(HttpStatus.ACCEPTED)
  getProducts() {
    return this.productService.findAll();
  }

  // hacer un response directamento con express
  // al hacer esto estamos rompiendo la manera agnostica de trabajo que hace
  // nest, porque nest se adapta al framework escojido para el envio de respuestas
  // yo podría escojer express o fastapi y nest se encargaria del resto
  // @Get(':id')
  // @HttpCode(HttpStatus.ACCEPTED)
  // getProduct(
  //   @Res() response: Response,
  //   @Param('id') productId: number
  // ) {
  //   const result = this.productService.findOne(productId);
  //   return response.status(200).json({
  //     statusCode: 200,
  //     payload: result
  //   });
  // }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProduct(@Param('id', CustomParseIntPipe) productId: number) {
    // los pipes sirven para validar y transformar, también pueden trabajar de manera conjunta
    const result = this.productService.findOne(productId);
    return {
      statusCode: 200,
      payload: result,
    };
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() payload: CreateProductDto) {
    const result = this.productService.create(payload);
    return {
      statusCode: HttpStatus.CREATED,
      payload: result,
    };
  }

  @Put(':id')
  @HttpCode(HttpStatus.CREATED)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    const result = this.productService.update(id, payload);
    return {
      statusCode: HttpStatus.CREATED,
      payload: result,
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  delete(@Param('id', ParseIntPipe) id: number) {
    const result = this.productService.delete(id);
    return {
      statusCode: HttpStatus.CREATED,
      payload: result,
    };
  }
}
