const express = require('express');
const router = express.Router();
const BlogRouter = express.Router();
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});

const{
    getBlogs,
    CreateBlogForm,
    singleBlog,
    updateBlog,
    updateBlogForm,
    deleteBlog,
    newBlog,
    seeComments,
    deleteComments,
    likeblog,
    dislikeBlog
} = require('../controllers/BlogController');
const { authenticateToken } = require('../controllers/UserController');
const {isLoggedIn, isAuthor, iscommentAuthor} = require('../middleware');



BlogRouter.get('/',getBlogs);
BlogRouter.get('/new',isLoggedIn,CreateBlogForm);
BlogRouter.get('/:id',singleBlog);
BlogRouter.get('/:id/update',isLoggedIn,isAuthor,updateBlogForm);
BlogRouter.get('/:id/delete',isLoggedIn,isAuthor,deleteBlog);
BlogRouter.get('/:id/comments/:Commentid',isLoggedIn,iscommentAuthor,deleteComments);

// BlogRouter.post()
BlogRouter.post('/',isLoggedIn,upload.array('image'),newBlog);
BlogRouter.post('/:id',isLoggedIn,isAuthor,upload.array('image'),updateBlog);
BlogRouter.post('/:id/comments',isLoggedIn,seeComments);
BlogRouter.post('/:id/like',isLoggedIn,likeblog);
BlogRouter.post('/:id/dislike',isLoggedIn,dislikeBlog);
module.exports = BlogRouter;