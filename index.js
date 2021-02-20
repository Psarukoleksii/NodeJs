const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const routerHome = require('./routers/home');
const routerSignin = require('./routers/signin');
const routerSignup = require('./routers/signup');
const routerUser = require('./routers/user');
const routerError = require('./routers/error');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');
app.use(express.urlencoded({extended: true}))
app.use('/', routerHome);
app.use('/signin', routerSignin);
app.use('/signup', routerSignup);
app.use('/user', routerUser);
app.use('/error', routerError);


app.listen(4000, ()=>{
    console.log('Starting developer server...')
})