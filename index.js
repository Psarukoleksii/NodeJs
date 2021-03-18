const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')

const apiRouter = require('./routers/api.router');
const { constants } = require('./config');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/', apiRouter);

dotenv.config();

_connectDB();

app.listen(constants.PORT, () => {
    console.log('Starting developer server...');
})

function _connectDB() {
    mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});

    const connection = mongoose.connection;

    connection.on('error', (error) => {
        console.log(error);
    })
}
