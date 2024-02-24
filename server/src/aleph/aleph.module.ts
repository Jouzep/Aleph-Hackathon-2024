import { Module } from '@nestjs/common';
import { AlephService } from './aleph.service';
import { AlephController } from './aleph.controller';
import { DictionaryModule } from 'src/dictionary/dictionary.module';
import { GroupModule } from 'src/group/group.module';
import { DictionaryService } from 'src/dictionary/dictionary.service';
import { GroupService } from 'src/group/group.service';

@Module({
  providers: [AlephService, DictionaryService, GroupService],
  controllers: [AlephController],
  imports: [DictionaryModule, GroupModule],
})
export class AlephModule {}
