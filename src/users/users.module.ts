import { Module } from '@nestjs/common';
import { CustomersService } from './services/customers.service';
import { UsersService } from './services/users.service';

@Module({
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
