import { Module } from '@nestjs/common';
import { DictionnaryService } from './dictionnary.service';

@Module({
  providers: [DictionnaryService],
  exports: [DictionnaryService],
})
export class DictionnaryModule {}
