const Notice =  require('../models/notice');
const {cloudinary} = require('../cloudinary');

module.exports.getNotice = async(req, res) => {
    try {
        let notices = await Notice.find({}).populate('author');
        //console.log(req.session.token);
        res.locals.token = req.session.token; // with this i can use token in ejs file with the help of locals
        res.render('notice', { notice: notices });
    } catch {
        console.log("home page error");
    }
};

//view single-notice
module.exports.singleNotice =  async(req, res) => {
    try {
        const id = req.params.id;
        const filteredData = await Notice.findById(id).populate('author');
        // console.log(filteredData);
        if(!filteredData){
            req.flash('error','Notice not found!');
            return res.redirect('/Notice');
        }
        return res.render('singlenotice', { notice: filteredData});
    } catch {
        console.log("single-notice error");
        // res.redirect('/blog');
    }
};

//update blog form
module.exports.updateNoticeForm = async(req,res) =>{
    try{
        const id = req.params.id;
        let filteredData = await Notice.findById(id);
        // console.log(filteredData);
        res.render('updatenotice',{notice : filteredData});
    }
    catch{
        console.log("update-notice-error");
    }
}

//display updated blog
module.exports.updateNotice = async(req,res) =>{
    try{
        // console.log(req.files);
        const id = req.params.id;
        const notice = await Notice.findByIdAndUpdate(id,{...req.body});
        const imgs = req.files.map(f =>({url : f.path,filename : f.filename}));
        notice.images.push(...imgs);
        await notice.save();

        if(req.body.deleteImages){
            for(let filename of req.body.deleteImages){
                await cloudinary.uploader.destroy(filename);
            }
            await notice.updateOne({$pull:{images:{filename:{$in: req.body.deleteImages}}}});
            console.log(notice);
        }
        req.flash('success','Successfully Updated Notice!')
        res.redirect(`/notice/${id}`);        
    }
    catch{
        console.log("display-updated-notice-error");
    }
}

//delete blog
module.exports.deleteNotice = async(req,res) =>{
    try{
        const id = req.params.id;
        //console.log(id);
        await Notice.findByIdAndDelete(id);
        //delete comments
        req.flash('success','Notice Deleted Successfully');
        res.redirect('/notice');
    }
    catch{
        console.log("error");
    }
}