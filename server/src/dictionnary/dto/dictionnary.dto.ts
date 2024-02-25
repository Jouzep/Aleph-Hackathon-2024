import { image } from '../../constants/types';

import { IsString, IsBoolean, IsArray, ValidateNested, IsNotEmpty, IsInt } from 'class-validator';
import { Type, instanceToInstance } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AllDictionnaryDTO {
  @ApiProperty()
  @IsNotEmpty()
  @ApiProperty()
  address: string;
}

export class createDicoDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  owner: string;
  @IsNotEmpty()
  @IsBoolean()
  @ApiProperty()
  private: boolean;
}

export class presetProductDTO {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  size: number[];
  @IsNotEmpty()
  @ApiProperty()
  unit: string;
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  price: number;
  @ApiProperty()
  image?: image;
}
export class createProductIntoDicoDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @IsArray()
  @ApiProperty()
  size: number[];
  @IsNotEmpty()
  @ApiProperty()
  unit: string;
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  price: number;
  @ApiProperty()
  image?: image;
}

export class deleteProductFromDicoDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  address: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
}
