require('dotenv').config()

module.exports = {
    MONGO_URL: process.env.MONGO_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'ACCESS SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
    PORT: 4000,
    AUTHORIZATION: 'Authorization'
}
