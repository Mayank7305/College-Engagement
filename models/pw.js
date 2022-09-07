const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pwSchema = new Schema({
    Username : String,
    password : String
});

module.exports = mongoose.model('pw',pwSchema);