import { HttpException, HttpStatus, Controller, Get, Post, Body } from '@nestjs/common';
import { getDicoRequest, getGroupRequest } from '../constants/requests';
import { product } from '../constants/types';

@Controller('aleph')
export class AlephController {

  @Get('/ping')
  ping(): string {
    return 'pong';
  }

  @Post('/product')
  createProduct(@Body() productData: product): string {
    if (!productData || !productData.name || !productData.price || !productData.size) {
      throw new HttpException('Invalid product data', HttpStatus.BAD_REQUEST);
    }
    return 'Product created';
  }

  @Get('/dico')
  getDico(@Body() request: getDicoRequest): product[] {
    if (!request || !request.Name) {
      throw new HttpException('Invalid dico name', HttpStatus.BAD_REQUEST);
    }

    // getDico(request.Name);

    return [];
  }

  @Get('/group')
  getGroup(@Body() request: getGroupRequest): product[] {
    if (!request || !request.Name) {
      throw new HttpException('Invalid group name', HttpStatus.BAD_REQUEST);
    }

    // getGroup(request.Name);

    return [];
  }
}
