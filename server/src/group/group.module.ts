import { Module } from '@nestjs/common';

@Module({})
export class GroupModule {
  exports: [GroupModule];
}
