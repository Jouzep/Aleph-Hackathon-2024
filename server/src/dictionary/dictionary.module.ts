import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryController } from './dictionary.controller';

@Module({
  providers: [DictionaryService],
  exports: [DictionaryService],
  controllers: [DictionaryController],
})
export class DictionaryModule {}
