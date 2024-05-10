import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'Lorem lalalalalalalal',
      price: 122.31,
      image: 'dadada.com',
      stock: 2,
    },
    {
      id: 2,
      name: 'Producto 2',
      description: 'Lorem lalalalalalalal',
      price: 122.32,
      image: 'dadada.com',
      stock: 10,
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product: Product | undefined = this.products.find(
      (pro) => pro.id === id,
    );
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  create(payload: CreateProductDto) {
    const id: number =
      this.products.length > 0
        ? this.products[this.products.length - 1].id + 1
        : 1;

    const newObject: Product = {
      id,
      ...payload,
    };

    this.products.push(newObject);

    return newObject;
  }

  update(id: number, payload: UpdateProductDto) {
    const indexOfProduct = this.products.findIndex((pro) => pro.id === id);

    if (indexOfProduct === -1)
      throw new NotFoundException(`Product with id ${id} not found`);

    let product: Product = this.products[indexOfProduct];

    product = {
      id,
      ...product, // los datos que ya tiene
      ...payload, // remplazar los antiguos datos
    };

    // remplazar directamente
    this.products[indexOfProduct] = product;

    return product;
  }

  delete(id: number) {
    this.products = this.products.filter((pro) => pro.id !== id);

    return 'Eliminado';
  }
}
