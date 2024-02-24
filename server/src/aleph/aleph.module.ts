import { Module } from '@nestjs/common';
import { AlephService } from './aleph.service';
import { AlephController } from './aleph.controller';
import { DictionnaryModule } from 'src/dictionnary/dictionnary.module';
import { GroupModule } from 'src/group/group.module';
import { DictionnaryService } from 'src/dictionnary/dictionnary.service';
import { GroupService } from 'src/group/group.service';

@Module({
  providers: [AlephService, DictionnaryService, GroupService],
  controllers: [AlephController],
  imports: [DictionnaryModule, GroupModule],
})
export class AlephModule {}
