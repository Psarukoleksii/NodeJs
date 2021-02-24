const express = require('express');
const app = express();
const path = require('path');

const apiRouter = require('./routers/api.router');

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use('/', apiRouter);


app.listen(4000, ()=>{
    console.log('Starting developer server...')
})
