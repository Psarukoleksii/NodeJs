require('dotenv').config()

module.exports = {
    MONGO_URL: process.env.MONGO_URL,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || 'ACCESS SECRET',
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'REFRESH SECRET',
    PORT: 4000,
    AUTHORIZATION: 'Authorization',
    ROOT_EMAIL: process.env.ROOT_EMAIL || 'ROOT EMAIL',
    ROOT_EMAIL_PASSWORD: process.env.ROOT_EMAIL_PASSWORD || 'ROOT EMAIL PASSWORD',

    PHOTO_MAX_SIZE: 2 * 1024 * 1024,
    FILE_MAX_SIZE: 25 * 1024 * 1024,
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp',
        'image/svg'
    ],
    DOCS_MIMETYPES: [
        'application/msword', // DOC
        'application/pdf', // PDF
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // XLS
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // DOC 2007
    ]
};
