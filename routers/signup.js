const {Router} = require('express');
const SignUp = require('../models/signup');
const router = Router();

router.get('/', (req, res)=>{
    res.render('signup',{
        title: 'Page signUp'
    })
})

router.post('/', async (req, res)=>{
    const signup = new SignUp(req.body.email, req.body.password, req.body.firstName, req.body.lastName)
    const allUsers = await SignUp.getAll()

    const findUser = () =>{
        allUsers.find(async v=> {
            if(v.email === req.body.email){
                res.redirect('/error')
            } else {
                await signup.save()
                res.redirect('/user')
            }
        });
    }
    findUser()
})

module.exports = router;