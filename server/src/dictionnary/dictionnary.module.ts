import { Module } from '@nestjs/common';
import { DictionnaryService } from './dictionnary.service';
import { DictionnaryController } from './dictionnary.controller';

@Module({
  providers: [DictionnaryService],
  exports: [DictionnaryService],
  controllers: [DictionnaryController],
})
export class DictionnaryModule {}
