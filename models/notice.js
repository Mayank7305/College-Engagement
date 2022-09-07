const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//data Base
const ImageSchema = new Schema({
    url : String,
    filename : String
})
ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200');
});
let noticeSchema = new Schema({
    title: String,
    images: [ImageSchema],
    message : String,
    author : {
        type: Schema.Types.ObjectId,
        ref: 'User' //model schema name
    },
    created: { type: Date, default: Date.now }
})
// blogSchema.post('findOneAndDelete',async function(doc){
//     consolole.log(doc);
// })
module.exports = mongoose.model('Notice',noticeSchema);
