const mongoose = require('mongoose');
const Schema  = mongoose.Schema;
const passport = require('passport-local-mongoose');
const UserSchema = new Schema({
    admin :{
        type: Boolean,
        default: false
    },
    first_name :{
        type : String
    },
    last_name :{
        type : String
    },
    Department :{
        type : String
    },
    Location :{
        type : String
    },
    Phone :{
        type : String
    },
    image :{
        type : String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToplStyx8pu0DsUkR-zSI6hAAN-vzcrZF0HA&usqp=CAU.jpg"
    },
    DOB :{
        type : String,
    },
    email:{
        type: String,
        required:true,
        unique:true
    }
});

UserSchema.plugin(passport); //add on username password unique username
module.exports = mongoose.model('User',UserSchema);


// const mongoose = require('mongoose');

// let UserSchema = new mongoose.Schema({
//     name : String,
//     email : {
//         type : String,
//         required : true,
//         unique: true,
//         lowercase: true
//     },
//     password : {
//         type : String,
//         required: true,
//         minlength: 6
//     }
    
// });

// module.exports = mongoose.model('User',UserSchema);