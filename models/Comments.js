const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let commentsSchema = new Schema({
    comment: String,
    author :{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }
});
module.exports = mongoose.model("Comments",commentsSchema);