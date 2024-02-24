import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlephModule } from './aleph/aleph.module';
import { AlpehService } from './alpeh/alpeh.service';

@Module({
  imports: [AlephModule],
  controllers: [AppController],
  providers: [AppService, AlpehService],
})
export class AppModule {}
