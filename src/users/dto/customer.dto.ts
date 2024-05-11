import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';
// import { PartialType } from '@nestjs/mapped-types';

// con esto habilitamos que los DTO puedan ser habilitados y
// documentados
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the name of customer' })
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  readonly phone: string;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
