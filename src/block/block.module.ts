/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';
import { Block } from './block.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlockService } from './block.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Block])],
  controllers: [],
  providers: [BlockService],
  exports: [BlockService],
})
export class BlockModule {}
