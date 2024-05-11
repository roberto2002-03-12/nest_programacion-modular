import { Module, Global } from '@nestjs/common';

const API_KEY = '12312412';
const API_KEY_PROD = 'PROD12312412';

// con global indicas que el modulo va ser global
// y que los demás modulos podrán utilizarlo sin problemas
// lo bueno es que podemos usar los providers sin necesidad
// de declarar la importación en el modulo
@Global()
@Module({
  providers: [
    {
      // nombre del provedor
      provide: 'API_KEY',
      // valor asignado
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
  ],
  exports: ['API_KEY'],
})
export class DatabaseModule {}
