// const user = require('../model/user')
// const bcrypt = require('bcryptjs')
// const jwt = require ('jsonwebtoken')

// const register = (req,res, next)=>{
//     bcrypt.hash(req.body.password,10,function(err,hashedpass){
//         if(err)
//         res.json({
//             error : err
//         })
//     })
//     let user = new User ({
//         name : req.body.name,
//         password : hashedpass
//     })

//     user.save()
//     .then(user => {
//         res.json({
//             message : "user added"
//         })
//     })
//     .catch (err => {
//         res.json({
//             message:"An Error occured"
//         })
//     })
// }

// module.exports = {
//     register
// }