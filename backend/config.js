// Environment configuration file
module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || 'mysecret', // You should set a strong secret in your .env file
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'myrefreshsecret',
};