import { Module } from '@nestjs/common';
import { AlephService } from './aleph.service';
import { AlephController } from './aleph.controller';

@Module({
  providers: [AlephService],
  controllers: [AlephController]
})
export class AlephModule {}
