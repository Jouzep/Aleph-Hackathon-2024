import { HttpException, HttpStatus, Controller, Get, Post, Body } from '@nestjs/common';
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
}
