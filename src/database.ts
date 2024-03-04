import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from './block/block.entity';

const dotenv = require('dotenv');
dotenv.config();
export const databaseProviders = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Block],
  synchronize: true,
});
