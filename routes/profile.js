const express = require('express');
const profileRouter = express.Router();
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

const{
    myProfile,
    myBlogs,
    updateProfile
} = require('../controllers/ProfileController');
const {isLoggedIn} = require('../middleware');

profileRouter.get('/',isLoggedIn, myProfile);
profileRouter.get('/myblogs',isLoggedIn,myBlogs);

profileRouter.post('/',isLoggedIn,upload.single('image'),updateProfile);

module.exports = profileRouter;
