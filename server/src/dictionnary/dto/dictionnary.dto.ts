import { image } from '../../constants/types';

import { IsString, IsBoolean, IsArray, ValidateNested, IsNotEmpty, IsInt } from 'class-validator';
import { Type, instanceToInstance } from 'class-transformer';

export class AllDictionnaryDTO {
  @IsNotEmpty()
  address: string;
}

export class createDicoDTO {
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  owner: string;
  @IsNotEmpty()
  @IsBoolean()
  private: boolean;
}

export class presetProductDTO {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsArray()
  size: number[];
  @IsNotEmpty()
  unit: string;
  @IsNotEmpty()
  @IsInt()
  price: number;
  image?: image;
}
export class createProductIntoDicoDTO {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsArray()
  size: number[];
  @IsNotEmpty()
  unit: string;
  @IsNotEmpty()
  @IsInt()
  price: number;
  image?: image;
}

export class deleteProductFromDicoDTO {
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsString()
  name: string;
}
