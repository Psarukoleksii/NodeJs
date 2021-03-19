require('dotenv').config()

module.exports = {
    MONGO_URL: process.env.MONGO_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'ACCESS SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
    PORT: 4000,
    AUTHORIZATION: 'Authorization',
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'ROOT EMAIL',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'ROOT EMAIL PASSWORD',
}
