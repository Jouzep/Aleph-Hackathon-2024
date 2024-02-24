import { Module } from '@nestjs/common';
import { AlephService } from './aleph.service';

@Module({
  providers: [AlephService]
})
export class AlephModule {}
