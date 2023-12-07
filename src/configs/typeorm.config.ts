import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Board } from 'src/boards/board-entity';
import 'dotenv/config';

export const typeORMConig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity.{js,ts}', Board],
  synchronize: true,
  logging: true,
};
