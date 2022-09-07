const { application } = require('express');
const express = require('express');
const noticeRouter = express.Router();
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});


const{
    getNotice,
    singleNotice,
    updateNotice,
    updateNoticeForm,
    deleteNotice
} = require('../controllers/NoticeController');
// const { authenticateToken } = require('../controllers/UserController');
const {isLoggedIn, isnoticeAuthor} = require('../middleware');

noticeRouter.get('/',getNotice);
noticeRouter.get('/:id',singleNotice);
noticeRouter.get('/:id/update',isLoggedIn,isnoticeAuthor,updateNoticeForm);
noticeRouter.get('/:id/delete',isLoggedIn,isnoticeAuthor,deleteNotice);

// // // BlogRouter.post()

noticeRouter.post('/:id',isLoggedIn,upload.array('image'),isnoticeAuthor,updateNotice);
module.exports = noticeRouter;
