import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();
export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'mysql',
  host: process.env.TYPEORM_HOST,
  port: 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: /^true/i.test(process.env.TYPEORM_LOGGING),
  synchronize: false,
  name: 'default',
  entities: ['src/**/*.model.ts'],
  migrations: ['src/migrations/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
});
