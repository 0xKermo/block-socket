import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Block } from './block.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {}

  async getCurrentBlock() {
    const block = await this.blockRepository.find();
    return block[0].last_block;
  }
  async updateBlock(block: number) {
    await this.blockRepository.update({ id: 1 }, { last_block: block});
  }
}
