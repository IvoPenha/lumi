import { DataSource } from 'typeorm';
import { env } from '../../core/env';
import { declaratedEntities } from '../entities';

export class DataSourceConnection {
  public dataSource;
  constructor() {
    const db = {
      host: env.db.host,
      port: Number(env.db.port),
      username: env.db.user,
      password: env.db.password,
      database: env.db.database,
    };

    console.log('Connecting to database...', db);

    this.dataSource = new DataSource({
      ...db,
      logging: true,
      type: 'postgres',
      // ssl: false,
      entities: declaratedEntities,
    });

    this.dataSource
      .initialize()
      .then(() => {
        console.log('Data Source has been initialized!');
      })
      .catch(err => {
        console.error('Error during Data Source initialization:', err);
      });
  }
}
