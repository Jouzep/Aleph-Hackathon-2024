import {
  HttpException,
  HttpStatus,
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { updateGroupRequest, deleteProductRequest } from '../constants/requests';
import { group } from '../constants/types';
import { GroupService } from './group.service';
import { AuthGuard } from 'src/Auth/Auth.guard';

@Controller('group')
export class GroupController {
  constructor(private readonly group: GroupService) {}

  @Get('/ping')
  pint(): string {
    return 'pong';
  }

  @UseGuards(AuthGuard)
  @Post('/create')
  async createGroup(@Body() group: group): Promise<group> {
    if (!group.name || !group.owner || !group.authorized) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    // TODO: Check the validity of the owner & the list of authorized products

    let newGroup: group = {
      name: group.name,
      owner: group.owner,
      authorized: group.authorized,
      products: [],
    };
    const res = await this.group.createGroup(newGroup);
    if (res === undefined) {
      throw new HttpException('Error creating group', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return newGroup;
  }

  @Get(':address/list')
  async getGroups(@Param() address) {
    const res = await this.group.getGroups(address.address);
    return { active: res[0], inactive: res[1] };
  }

  @Get(':address/:name')
  async getGroup(
    @Param('address') address: string,
    @Param('name') groupName: string,
  ): Promise<group | {}> {
    if (!address || !groupName) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }
    const res = await this.group.getGroup(address, groupName);
    if (res === undefined) {
      return {};
    }

    return res;
  }

  @Post('/update')
  @UseGuards(AuthGuard)
  async updateGroup(@Body() req: updateGroupRequest): Promise<string> {
    if (
      !req.ownerAddress ||
      !req.groupName ||
      !req.product.name ||
      !req.product.description ||
      !req.product.price ||
      !req.product.size ||
      !req.product.state ||
      !req.product.quantity
    ) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    await this.group.addProductToGroup(req.ownerAddress, req.groupName, req.product);

    return 'Group updated';
  }

  @Delete('/delete')
  @UseGuards(AuthGuard)
  async deleteAllProductsFromGroup(@Body() req: deleteProductRequest): Promise<string> {
    if (!req.ownerAddress || !req.groupName) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    return 'All products deleted from group: ' + req.groupName;
  }

  @Delete('/delete/:index')
  @UseGuards(AuthGuard)
  async deleteProductFromGroup(
    @Body() req: deleteProductRequest,
    @Param('index') index: string,
  ): Promise<string> {
    if (!req.ownerAddress || !req.groupName || !index) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    return 'Product deleted from group: ' + req.groupName;
  }

  @Patch(':address/:name/state')
  @UseGuards(AuthGuard)
  async changeState(@Param('address') address: string, @Param('name') name: string) {
    return await this.group.changeGroupState(name, address);
  }
}
