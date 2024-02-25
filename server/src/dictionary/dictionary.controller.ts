import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  deleteProductFromDicoDTO,
  createProductIntoDicoDTO,
  createDicoDTO,
  AllDictionnaryDTO,
} from './dto/dictionnary.dto';
import { DictionaryService } from './dictionary.service';
import { dico, presetProducts } from 'src/constants/types';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from 'src/Auth/Auth.guard';
@Controller('dictionnary')
@ApiTags('Dictionnary')
export class DictionaryController {
  constructor(private readonly dictionnaryService: DictionaryService) {}
  @Get('/')
  async getAllDictionnary(@Query(new ValidationPipe()) body: AllDictionnaryDTO) {
    try {
      console.log('getAllDictionnary', body);
      const data = await this.dictionnaryService.fetchAllDico(body.address);
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Get('/:dico')
  async getDictionnary(
    @Query(new ValidationPipe()) body: AllDictionnaryDTO,
    @Param('dico') dico: string,
  ) {
    try {
      const data = await this.dictionnaryService.fetchAggregate(body.address, 'dico', dico);
      return data;
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Post('/')
  @UseGuards(AuthGuard)
  async createDictionnary(@Body(new ValidationPipe()) body: createDicoDTO) {
    console.log('createDictionnary', body);
    const dico: dico = {
      name: body.name,
      owner: body.owner,
      private: false,
      presetProducts: [],
    };
    try {
      const data = await this.dictionnaryService.createDico(dico);
      return { message: 'Dictionnary successfully created' };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Post('/:dico/addProduct')
  @UseGuards(AuthGuard)
  async addPresetProductToDictionnary(
    @Body(new ValidationPipe()) body: createProductIntoDicoDTO,
    @Param('dico') dico: string,
  ) {
    try {
      console.log('addPresetProductToDictionnary', body);
      const product: presetProducts = {
        name: body.name,
        size: body.size,
        unit: body.unit,
        price: body.price,
        image: body.image,
      };
      console.log('product', product);
      const data = await this.dictionnaryService.addProductToDico(body.address, dico, product);
      return data;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
  }

  @Delete('/:dico/addProduct')
  @UseGuards(AuthGuard)
  async deletePresetProductToDictionnary(
    @Body(new ValidationPipe()) body: deleteProductFromDicoDTO,
    @Param('dico') dico: string,
  ) {
    try {
      const data = await this.dictionnaryService.deleteProductFromDico(
        body.address,
        dico,
        body.name,
      );
      return data;
    } catch (e) {
      console.log(e);
      throw new BadRequestException(e);
    }
  }
}
