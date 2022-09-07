// const { CommentsController } = require('moongose/controller');
// const { token } = require('morgan');
// const blog = require('../models/blog');
const Blog = require('../models/blog');
const Comments = require('../models/Comments');
const Notice = require('../models/notice');
const {cloudinary} = require('../cloudinary');
//home page of blogs
module.exports.getBlogs = async(req, res) => {
    try {
        let blogs = await Blog.find({}).populate('author');
        //console.log(req.session.token);
        res.locals.token = req.session.token; // with this i can use token in ejs file with the help of locals
        res.render('blog', { blog: blogs });
    } catch {
        console.log("home page error");
    }
};

// create new blog
module.exports.CreateBlogForm = (req,res) =>{
    try{
        res.render('form');
    }
    catch{
        console.log('display-new-blog-form error');
    }
    
};

//view single-blog
module.exports.singleBlog =  async(req, res) => {
    try {
        const id = req.params.id;
        const filteredData = await Blog.findById(id).populate({
            path : 'comments',
            populate :{
                path : 'author'
            }
        }).populate('author');
        // console.log(filteredData);
        if(!filteredData){
            req.flash('error','Blog not found!');
            return res.redirect('/blog');
        }
        // console
        res.render('singleblog', { blog: filteredData});
        
    } catch {
        console.log("single-blog error");
        // res.redirect('/blog');
    }
};


//add new blog in database
module.exports.newBlog = async(req,res) =>{
    // console.log(req.body,req.file);
    // res.render('home',{blog : req.body});
    try {
        
        const blog = new Blog(req.body);
        const notice = new Notice(req.body);
        blog.images = req.files.map(f =>({url : f.path,filename : f.filename}));
        

        console.log(blog);
        blog.author = req.user._id;
        // console.log(blog.title);
        notice.author = req.user._id;
        if(blog.title === 'Notice'){
            notice.images = req.files.map(f =>({url : f.path,filename : f.filename}));
            await notice.save();
            req.flash('success','Successfully made a new Notice!');
            res.redirect('/notice');
        }
        else{
            await blog.save();
            req.flash('success','Successfully made a new Blog!');
            //console.log(blog._id);
            res.redirect(`/blog/${blog._id}`);
        }
    } catch {
        console.log("creating new blog error");
       // res.redirect('/blog');
    }
};

//update blog form
module.exports.updateBlogForm = async(req,res) =>{
    try{
        const id = req.params.id;
        let filteredData = await Blog.findById(id);
        console.log(filteredData);
        res.render('updateBlog',{blog : filteredData});
    }
    catch{
        console.log("update-bloog-error");
    }
}

//display updated blog
module.exports.updateBlog = async(req,res) =>{
    try{
        const id = req.params.id;
        
        const blog = await Blog.findByIdAndUpdate(id,{...req.body});
        const imgs = req.files.map(f =>({url : f.path,filename : f.filename}));
        blog.images.push(...imgs);
        await blog.save();
        if(req.body.deleteImages){
            for(let filename of req.body.deleteImages){
                await cloudinary.uploader.destroy(filename);
            }
            await blog.updateOne({$pull:{images:{filename:{$in: req.body.deleteImages}}}});
            console.log(blog);
        }
        
        req.flash('success','Successfully Updated Blog!')
        res.redirect(`/blog/${id}`);        
    }
    catch{
        console.log("display-updated-blog-error");
    }
}

//see comments
module.exports.seeComments = async(req,res) =>{
    const id = req.params.id;
    const blog = await Blog.findById(id)
    const comment = new Comments(req.body);
    comment.author = req.user._id;
    blog.comments.push(comment);
    await comment.save();
    await blog.save();
    req.flash('success','Comment posted!');
    res.redirect(`/blog/${blog._id}`);
}

//delete blog
module.exports.deleteBlog = async(req,res) =>{
    try{
        const id = req.params.id;
        //console.log(id);
        const blog = await Blog.findById(id)
        await Blog.findByIdAndDelete(id);
        //delete comments
        if(blog){
            await Comments.deleteMany({
                _id: {
                    $in: blog.comments
                }
            })
        }
        req.flash('success','Blog Deleted Successfully');
        res.redirect('/blog');
    }
    catch{
        console.log("error");
    }
}

//delete comment
module.exports.deleteComments = async(req,res) =>{
    const {id,Commentid} = req.params;
    console.log(id);
    // const blog = await Blog.findById(id);
    // console.log(blog);
    await Blog.findByIdAndUpdate(id,{$pull:{comments : Commentid}});
    await Comments.findByIdAndDelete(req.params.Commentid);
    req.flash('success','Comment Deleted!');
    res.redirect(`/blog/${id}`);
}
//like
module.exports.likeblog = async(req,res) =>{
    const id = req.params.id;
    const blog = await Blog.findById(id);
    // blog.likes.push(req.user._id);
    // await blog.save();
    // return blog;
    await Blog.findByIdAndUpdate(id,{$push : {likes : req.user._id}},{
        new : true
    }).exec((err,result) =>{
        if(err){
            return res.satus(422).json({error : err});
        }else{
            res.json(result);
        }
    })
}
//dislike
module.exports.dislikeBlog = async(req,res) =>{
    const id = req.params.id;
    const blog = await Blog.findById(id);
    await Blog.findByIdAndUpdate(id,{$pull:{likes : req.user._id}},{
        new : true
    }).exec((err,result) =>{
        if(err){
            return res.satus(422).json({error : err});
        }else{
            res.json(result);
        }
    })
}

