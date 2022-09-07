if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const app = express();
const session = require('express-session');
const flash = require('connect-flash');
const BlogRouter = require('./routes/blog');
const noticeRouter = require('./routes/notice');
const profileRouter = require('./routes/profile');
// const MongoDBStore = require('connect-mongo')(session);
const dburl = process.env.DB_URL
//for passport
const UserRouter = require('./routes/auth');
//for bcrypt session salt
// const UserRouter = require('./routes/auth');
const morgan = require('morgan');

//const path = require('path');

//passport
const Passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

//express-seesion
// const store = new MongoDBStore({
//     url: dburl,
//     secret: 'keyboard cat',
//     touchAfter : 24 * 60 * 60
// });
// store.on("error",function(e){
//     console.log("sesssion Store error",e)
// });
// app.set('trust proxy', 1) // trust first proxy
app.use(session({
//   store,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge : 1000 * 60 * 60 * 24 * 7
   }
}))

//use to flash messages use after session
app.use(flash());

////////////////////////////////////////////////
//for passport
app.use(Passport.initialize());
app.use(Passport.session());
Passport.use(new LocalStrategy(User.authenticate()));
Passport.serializeUser(User.serializeUser());
Passport.deserializeUser(User.deserializeUser());

////////////////////////////////////////////////

app.use((req,res,next)=>{
    //console.log(req.session.returnTo);
    res.locals.currentUser = req.user;
    next();
})

app.use((req,res,next) =>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})
// app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(express.json());

app.use('/user',UserRouter);
app.use('/blog',BlogRouter);
app.use('/notice',noticeRouter);
app.use('/profile',profileRouter);


app.set("view engine", "ejs");

// 'mongodb://localhost:27017/blog'
mongoose.connect(dburl).then(() =>{
    // console.log(dburl);
    console.log("connected to database");    
});

//Home
app.get('/',(req,res)=>{
    res.render('main');
});

// app.get('/fakeUser',async(req,res)=>{
//     const user = new User({email : 'mayankgond9643@gmail.com', username: 'mayank'});
//     const newUser = await User.register(user,'mayank');
//     res.send(newUser);
// })
const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});

// to do
// 1. Problem in comment (not deleting in comment ref)
// 2. so many basic improvements


//problem in profile repeating url (fixed use '/' )
//like feature added but local refresh need
// need to add profile image