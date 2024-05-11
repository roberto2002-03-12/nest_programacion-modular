import { Injectable, Inject } from '@nestjs/common';

/*
utiliza ConfigService para obtener variables de entorno directamente declarando
el nombre de la variable en env, pero esto no es recomendable cuando el proyecto
va creciendo, es mejor manejar mediante objetos y declararles los valores ahí
*/

// import { ConfigService } from '@nestjs/config';

/*
para usar objetos en los cuales haz declarado las variables de entorno debes usar
ConfigType
*/

import { ConfigType } from '@nestjs/config';
import config from './config';

@Injectable()
export class AppService {
  // de esta manera declaramos el valor que fue declarado en el useValue
  // en el modulo general
  constructor(
    @Inject('API_KEY') private readonly apiKey: string,
    @Inject('TASKS') private readonly tasks: any[],
    // private readonly configService: ConfigService,
    @Inject(config.KEY) private readonly configEnvData: ConfigType<typeof config>
  ) {}

  getHello(): string {
    // const apiKey = this.configService.get<string>('API_KEY');
    // const mydb = this.configService.get<string>('DATABASE_NAME');
    const apiKey = this.configEnvData.apiKey;
    const mydb = this.configEnvData.database.name;
    // console.log(this.tasks);
    return `Hello world! ${apiKey} ${mydb}`;
  }
}
