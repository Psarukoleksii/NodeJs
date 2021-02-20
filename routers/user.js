const {Router} = require('express');
const router = Router();
const SignUp = require('../models/signup');

router.get('/', async (req, res)=>{
    const users = await SignUp.getAll()

    res.render('user', {
        users
    });
})

module.exports = router;