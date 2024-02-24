import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlephModule } from './aleph/aleph.module';
import { DictionaryModule } from './dictionary/dictionary.module';
import { GroupService } from './group/group.service';
import { GroupModule } from './group/group.module';

@Module({
  imports: [AlephModule, DictionaryModule, GroupModule],
  controllers: [AppController],
  providers: [AppService, GroupService],
})
export class AppModule {}
