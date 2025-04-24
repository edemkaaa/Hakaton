export default () => ({
  port: parseInt(process.env.PORT ?? '3000', 10),
  database: {
    host: process.env.DATABASE_HOST ?? 'localhost',
    port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
    username: process.env.DATABASE_USER ?? 'postgres',
    password: process.env.DATABASE_PASSWORD ?? 'postgres',
    database: process.env.DATABASE_NAME ?? 'appointment_system',
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'super-secret',
    expiresIn: '1d',
  },
  smsc: {
    login: process.env.SMSC_LOGIN,
    password: process.env.SMSC_PASSWORD,
    sender: process.env.SMSC_SENDER || 'DEFAULT',
    test: process.env.NODE_ENV !== 'production'
  }
});
