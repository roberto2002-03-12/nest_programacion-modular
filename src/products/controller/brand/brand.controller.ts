import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Brand endpoints')
@Controller('brand')
export class BrandController {}
