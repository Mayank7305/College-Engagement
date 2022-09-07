const { getMaxListeners } = require('./models/blog');
const Blog = require('./models/blog');
const Notice = require('./models/notice');
const Comment = require('./models/Comments');
const sessionStorage = require('express-session');
module.exports.isLoggedIn = (req,res,next) =>{
    //console.log("req.user..",req.user);
    if(!req.isAuthenticated()){
        // console.log(req.path);
        req.session.returnTo = req.originalUrl;  //store the url for redirect
        req.flash('error','You must be singed in first !');
        console.log("your must be singed in");
        return res.redirect('/user/login');
    }
    next();
}

module.exports.isAuthor = async(req,res,next) =>{
    const {id} = req.params;
    const blog = await Blog.findById(id);
    if(!blog.author.equals(req.user._id)){
        req.flash('error','You are not author');
        return res.redirect(`/blog/${id}`);
    }
    next();
}


module.exports.iscommentAuthor = async(req,res,next) =>{
    const {id,Commentid} = req.params;
    const comment = await Comment.findById(Commentid);
    if(!comment.author.equals(req.user._id)){
        // console.log('you cannot');
        req.flash('error','You are not author');
        return res.redirect(`/blog/${id}`);
    }
    next();
}

module.exports.isnoticeAuthor = async(req,res,next) =>{
    const {id} = req.params;
    const notice = await Notice.findById(id);
    if(!notice.author.equals(req.user._id)){
        req.flash('error','You are not author');
        return res.redirect(`/notice/${id}`);
    }
    next();
}

