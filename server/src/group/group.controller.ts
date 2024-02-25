import {
  HttpException,
  HttpStatus,
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { updateGroupRequest, deleteProductRequest } from '../constants/requests';
import { group } from '../constants/types';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private readonly group: GroupService) {}

  @Get('/ping')
  pint(): string {
    return 'pong';
  }

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
  async getGroups(@Param() address): Promise<group[] | {}> {
    const res = await this.group.getGroups(address.address);
    return res as group[];
  }

  @Get(':address/:name')
  async getGroup(
    @Param('address') address: string,
    @Param('name') groupName: string,
  ): Promise<group | {}> {
    if (!address || !groupName) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }
    console.log('address: ' + address + ' groupName: ' + groupName);
    const res = await this.group.getGroup(address, groupName);
    if (res === undefined) {
      return {};
    }

    return res;
  }

  @Post('/update')
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
  async deleteAllProductsFromGroup(@Body() req: deleteProductRequest): Promise<string> {
    if (!req.ownerAddress || !req.groupName) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    return 'All products deleted from group: ' + req.groupName;
  }

  @Delete('/delete/:index')
  async deleteProductFromGroup(
    @Body() req: deleteProductRequest,
    @Param('index') index: string,
  ): Promise<string> {
    if (!req.ownerAddress || !req.groupName || !index) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    return 'Product deleted from group: ' + req.groupName;
  }
}
