if (!process.env.ENV) {
  process.env.ENV = 'dev';
}
require('dotenv').config({ path: `.env.${process.env.ENV || 'dev'}` });
console.log(`environment is set to: ${process.env.ENV}`);

if (!process.env.PORT) {
  console.error('error: PORT not defined, please check your .env');
  process.exit(1);
}

const {
  PORT,
  MONGODB_URI = '',
  JWT_SECRET,
  ACCESS_TOKEN_LIFE = '6h'
} = process.env;

RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW) || 900000;
RATE_LIMIT_MAX_REQUESTS = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 10;

module.exports = {
  PORT,
  MONGODB_URI,
  RATE_LIMIT_WINDOW,
  RATE_LIMIT_MAX_REQUESTS,
  JWT_SECRET,
  ACCESS_TOKEN_LIFE
};
