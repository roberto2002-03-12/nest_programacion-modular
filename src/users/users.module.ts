import { Module } from '@nestjs/common';

import { CustomerController } from './controller/customer.controller';
import { UsersController } from './controller/user.controller';

import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  // si quieres importar los servicios de otros modulos debes utilizar
  // import, sin embargo, el modulo debe permitir exportar su servicio
  // caso contrario no te dejará.
  imports: [ProductsModule],
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
