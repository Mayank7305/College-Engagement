const express = require('express');
const UserRouter = express.Router();
// const { remove } = require('../models/user');

// UserRouter.get('/signup',(req, res) =>{
//     res.render('/user/signup');
// });
const{
    createUserForm,
    loginForm,
    createUser,
    getUser
} = require('../controllers/UserController')

UserRouter.get('/signup',createUserForm);
UserRouter.get('/login',loginForm);

UserRouter.post('/signup',createUser);
UserRouter.post('/login',getUser);

module.exports = UserRouter;








// const{
//     createUserForm,
//     loginForm,
//     createUser,
//     getUser
// } = require('../controllers/UserController')

// UserRouter.get('/signup',createUserForm);
// UserRouter.get('/login',loginForm);

// UserRouter.post('/signup',createUser);
// UserRouter.post('/login',getUser);

// module.exports = UserRouter;