// const{hash, genSalt, compare} = require('bcrypt');
// const User = require('../models/user');
// const jwt = require('jsonwebtoken');


// module.exports.createUserForm = (req,res) =>{
//     res.render('signup');
// }
// module.exports.loginForm = (req,res) =>{
//     res.render('login');
// }


// module.exports.createUser  = async(req,res) =>{
//     res.send("user created");
// }

// module.exports.createUser = async(req,res) =>{
//     // res.send('user created');
//     let{ name, email, password} = req.body;
//     //const salt = await genSalt();
//     const hashedPassowrd = await hash(password,10); //attach 10 lines of salt
//     //password  = salt + hashedpasword
//     //console.log(salt,hashedPassowrd);
//     password = hashedPassowrd;
//     try{
//         await User.create({
//             name,
//             email,
//             password
//         });
//         res.render('main');
//     }catch(err){
//         console.log(err);
//     }

// }

// module.exports.getUser = async(req,res) =>{
//     //console.log(res.body);
//     try {
//         const [email,password] = [req.body.email,req.body.password];
//         //console.log(email);
//         let user = await User.findOne({ email });
//         //console.log(user);
//         if (!user) {
//             return res.send("user not found");
//         }
//         //console.log(user.password,password);
//         if (await compare(password, user.password)) {
//             let loggedInUser = {
//                 email,
//                 name: user.name
//             }
//             const token = await jwt.sign(loggedInUser, 'secret_key')
//             //console.log(token);
//             req.session.token = token;
//             // localStorage.setItem('info', JSON.stringify({
//             //     'token': token
//             // }));
//             return res.redirect('/blog');
//         }
//         return res.render('/blog');
//         return res.send("invalid credentials!!!");

//     } catch (err) {
//         console.log(err);
//     }
// }

// module.exports.authenticateToken = async(req, res, next) => {
//     try {
//         const token = req.body.token || req.params.token;
//         //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1heWFua2t1bWFyZ29uZF8yazE5Y28yMjRAZHR1LmFjLmluIiwibmFtZSI6Im1vZGVsIiwiaWF0IjoxNjUxNDkwMTgxfQ.Lyem1swyPx_AlUBmAcT-AZR3tZMY1Oqu83_6YhpDvS4";
//         if (token == null) return res.send("Please log in!!");
//         let user = await jwt.verify(token, 'secret_key');
//         console.log(user);
//         if (!user) {
//             return res.redirect('/user/login');
//         }
//         //req.user = user;
//         next();
//     } catch (err) {
//         res.redirect('/user/login');
//     }
// }

