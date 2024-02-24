import { Module } from '@nestjs/common';
import { DictionnaryService } from './dictionnary.service';

@Module({
  providers: [DictionnaryService]
})
export class DictionnaryModule {}
