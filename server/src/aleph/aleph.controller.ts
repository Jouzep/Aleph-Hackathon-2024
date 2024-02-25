import { HttpException, HttpStatus, Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import {
  createDicoRequest,
  getDicoRequest,
  createGroupRequest,
  getGroupRequest,
  createProductRequest,
} from '../constants/requests';
import { product } from '../constants/types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AlephService } from './aleph.service';
import { AuthGuard } from 'src/Auth/Auth.guard';

@ApiTags('DeStock')
@Controller('aleph')
export class AlephController {
  constructor(private readonly aleph: AlephService) {}
  // @Post('/product')
  // createProduct(@Body() productData: createProductRequest): string {
  //   if (!productData || !productData.name || !productData.price || !productData.size) {
  //     throw new HttpException('Invalid product data', HttpStatus.BAD_REQUEST);
  //   }
  //   return 'Product created';
  // }

  // @Post('/dico')
  // createDico(@Body() dicoData: createDicoRequest): string {
  //   if (!dicoData || !dicoData.name || !dicoData.owner) {
  //     throw new HttpException('Invalid dico data', HttpStatus.BAD_REQUEST);
  //   }

  //   return 'Dico created';
  // }

  // @Get('/dico')
  // getDico(@Body() request: getDicoRequest): product[] {
  //   if (!request || !request.name) {
  //     throw new HttpException('Invalid dico name', HttpStatus.BAD_REQUEST);
  //   }

  //   // getDico(request.Name);

  //   throw new HttpException('Dico not found', HttpStatus.NO_CONTENT);
  // }

  // @Post('/group')
  // createGroup(@Body() groupData: createGroupRequest): string {
  //   if (!groupData || !groupData.name || !groupData.owner) {
  //     throw new HttpException('Invalid group data', HttpStatus.BAD_REQUEST);
  //   }
  //   return 'Group created';
  // }

  // @Get('/group')
  // getGroup(@Body() request: getGroupRequest): product[] {
  //   if (!request || !request.name) {
  //     throw new HttpException('Invalid group name', HttpStatus.BAD_REQUEST);
  //   }

  //   // getGroup(request.Name);
  //   throw new HttpException('Group not found', HttpStatus.NO_CONTENT);
  // }
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Sign') // Include the names of your security schemes
  @ApiBearerAuth('Address') // Include the names of your security schemes
  @ApiBearerAuth('Message') // Include the names of your security schemes
  @Get('Test')
  async signTest() {
    await this.aleph.signTest();
  }
}
