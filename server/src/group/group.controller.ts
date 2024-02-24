import { Controller } from '@nestjs/common';

@Controller('group')
export class GroupController {
  @Get('/ping')
  pint(): string {
    return 'pong';
  }

  @Post('/create')
  createGroup(): string {
    return 'Group created';
  }

  @Get('/list')
  listGroups(): string {
    return 'Group list';
  }

  @Get('/get')
  getGroup(): string {
    return 'Group get';
  }

  @Post('/update')
  updateGroup(): string {
    return 'Group updated';
  }
}
