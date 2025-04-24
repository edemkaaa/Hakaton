export const esiaConfig = {
  clientId: process.env.ESIA_CLIENT_ID || 'YOUR_CLIENT_ID',
  esiaHost: process.env.ESIA_HOST || 'https://esia-portal1.test.gosuslugi.ru',
  esiaPublicKey: process.env.ESIA_PUBLIC_KEY || '',
  cryptoProServiceAddress: process.env.CRYPTO_PRO_SERVICE || 'http://127.0.0.1:3037',
  redirectUri: process.env.ESIA_REDIRECT_URI || 'http://localhost:3000/api/auth/esia/callback'
};