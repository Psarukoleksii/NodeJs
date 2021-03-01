const express = require('express');
const mongoose = require('mongoose')

const apiRouter = require('./routers/api.router');

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use('/', apiRouter);

_connectDB();

app.listen(4000, () => {
    console.log('Starting developer server...');
})

function _connectDB() {
    mongoose.connect('mongodb://localhost:27017/homeWork4', {useNewUrlParser: true, useUnifiedTopology: true});

    const connection = mongoose.connection;

    connection.on('error', (error) => {
        console.log(error);
    })
}
