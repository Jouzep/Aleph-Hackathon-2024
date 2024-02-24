import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlephModule } from './aleph/aleph.module';
import { DictionnaryModule } from './dictionnary/dictionnary.module';
import { GroupService } from './group/group.service';
import { GroupModule } from './group/group.module';

@Module({
  imports: [AlephModule, DictionnaryModule, GroupModule],
  controllers: [AppController],
  providers: [AppService, GroupService],
})
export class AppModule {}
