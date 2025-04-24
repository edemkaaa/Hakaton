module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'postgres',
  database: process.env.DATABASE_NAME || 'appointment_system',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  seeds: ['dist/database/seeds/*{.ts,.js}'],
  factories: ['dist/database/factories/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/database/migrations',
    seedsDir: 'src/database/seeds',
    factoriesDir: 'src/database/factories',
  },
  synchronize: false,
};