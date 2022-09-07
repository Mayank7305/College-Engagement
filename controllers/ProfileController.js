const Blog = require('../models/blog');
const User = require('../models/user');

module.exports.myProfile = async(req,res) =>{
    const user = req.user;
    res.render('userForm',{user});
}
module.exports.myBlogs = async(req,res) =>{
    let blogs = await Blog.find({}).populate('author');
    let new_blogs = [];
    for(let blog of blogs){
        if(blog.author.equals(req.user._id)){
            new_blogs.push(blog);
        }
    }
    // console.log(new_blogs);
    res.render('blog',{blog : new_blogs});
}
module.exports.updateProfile = async(req,res) =>{
    try{
        
        const id = req.user._id;
        console.log(req.body,req.file);
        // console.log(id);
        const user = await User.findByIdAndUpdate(id,{...req.body});
        if(req.file){
            user.image = req.file.path;
            await user.save();
        }
        console.log(user);
        req.flash('success','Information updated successfully')
        res.redirect('/profile');
    }
    catch(e){
        req.flash('error',e.message);
    }
}