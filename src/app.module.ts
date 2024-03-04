import { BlockModule } from './block/block.module';
import { BlockTrackerGateway } from './blocktracker.gateway';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { databaseProviders } from './database';

@Module({
  imports: [BlockModule, databaseProviders],
  controllers: [],
  providers: [BlockTrackerGateway, AppService],
})
export class AppModule {}
