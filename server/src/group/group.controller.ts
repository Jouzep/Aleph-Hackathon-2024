import { Controller } from '@nestjs/common';

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
      products: []
    }
    const res = await this.group.createGroup(newGroup);
    if (res === undefined) {
      throw new HttpException('Error creating group', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return newGroup;
  }

  @Get('/list')
  async getGroups(@Body() address: string): Promise<group[]> {
    const res = await this.group.getGroups(address);
    if (res === undefined) {
      throw new HttpException('Error fetching groups', HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return res as group[];
  }

  @Get(':name')
  async getGroup(@Param('name') groupName: string): Promise<group> {
    if (!groupName) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    const res = await this.group.getGroup(groupName);
    if (res === undefined) {
      throw new HttpException('Error fetching group', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return res;
  }

  @Post('/update')
  async updateGroup(@Body() ownerAddress: string, groupName: string, product: product): Promise<string> {
    if (!ownerAddress || !groupName || !product.name || !product.description || !product.price || !product.size || !product.state || !product.quantity) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    const res = await this.group.addProductToGroup(ownerAddress, groupName, product)
    if (res === undefined) {
      throw new HttpException('Error updating group', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return 'Group updated';
  }

  @Delete('/delete')
  async deleteAllProductsFromGroup(@Body() ownerAddress: string, groupName: string): Promise<string> {
    if (!ownerAddress || !groupName) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    return 'All products deleted from group: ' + groupName;
  }

  @Delete('/delete/:index')
  async deleteProductFromGroup(@Body() ownerAddress: string, groupName: string, @Param('index') index: number): Promise<string> {
    if (!ownerAddress || !groupName || !index) {
      throw new HttpException('Missing parameters', HttpStatus.BAD_REQUEST);
    }

    return 'Product deleted from group: ' + groupName;
  }
}
