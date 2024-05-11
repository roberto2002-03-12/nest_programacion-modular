import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { firstValueFrom } from 'rxjs';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';

// const API_KEY = '12312412';
// const API_KEY_PROD = 'PROD12312412';

import { environments } from './environments';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.number().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      })
    }),
    HttpModule,
    UsersModule,
    ProductsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    // {
    //   // nombre del provedor
    //   provide: 'API_KEY',
    //   // valor asignado
    //   useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    // },
    {
      provide: 'TASKS',
      useFactory: async (http: HttpService) => {
        const tasks = await firstValueFrom(
          http.get('https://jsonplaceholder.typicode.com/todos')
        );
        return tasks.data;
      },
      inject: [HttpService],
    },
    AppService,
  ],
})
export class AppModule { }
/*
useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY

no te confundas, funciona el process.env.NODE_ENV directo en este caso porque
se esta declarando al momento de correr la api.
*/
