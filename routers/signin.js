const {Router} = require('express');
const router = Router();
const SignUp = require('../models/signup');

router.get('/', (req, res)=>{
    res.render('signin', {
        title: 'Page signIn'
    })
})

router.post('/',async (req, res)=>{
    const allUsers = await SignUp.getAll();
    
    const findUser = () =>{
        allUsers.find(v=>{
            if(v.email === req.body.email && v.password === req.body.password){
                res.redirect('/user')
            } else {
                res.redirect('/error')
            }
        })
    }
    findUser()
})

module.exports = router;