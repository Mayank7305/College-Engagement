const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const Blog = require('../models/blog');
const pw = require('../models/pw');
const {isLoggedIn} = require('../middleware');
router.get('/signup',(req,res) =>{
    res.render('signup');
})
router.post('/signup',async(req,res) =>{
    try{
        const {email,username,password} = req.body;
        const Pw = new pw({username,password});
        await Pw.save();
        const user = new User({email,username});
        const registerUser = await User.register(user,password);
        //console.log(registerUser);
        req.login(registerUser,err =>{
            if(err){
                req.flash('error',err);
                return res.redirect('/user/signup');
            }
            req.flash('success','Welcome to college Engagement');
            res.redirect('/blog');
        });
        
    }catch(e){
        req.flash('error',e.message);
        res.redirect('signup');
    }
});

router.get('/login',(req,res) =>{
    res.render('login');
})

router.post('/login',passport.authenticate('local',{failureFlash: true,failureRedirect:'/user/login'}),(req,res)=>{
    const redirectURL = req.session.returnTo || '/blog';
    //console.log(redirectURL);
    // res.redirect('/blog/new');
    delete req.session.returnTo;
    //console.log(req.session);

    req.flash('success','welcome back!');
    res.redirect(redirectURL);
})

router.get('/logout',(req,res) =>{
    req.logout();
    req.flash('success','Logout Successfully');
    res.redirect('/blog');
})
module.exports = router