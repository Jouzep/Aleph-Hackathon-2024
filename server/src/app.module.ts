import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlephModule } from './aleph/aleph.module';

@Module({
  imports: [AlephModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
