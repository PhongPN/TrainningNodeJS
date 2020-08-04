const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
var userSchema  = new mongoose.Schema({
    id:{type:Number, required:true },
    username:{ type:String, required:true},
    password:{type:String, required:true},
    role:{type: String, required:true },
    userfirstname:{type:String, required:true},
    userlastname:{type:String, required:true},
    userprename:{type:String, required:true},
    createat:{type:Date,default:Date.now},
    updateat:{type:Date,default:Date.now}
});

userSchema.static('findByUsername', function (username) {
  return this.find({ username: username })
    .limit(10)
    .sort('-date')
    .exec();
});

userSchema.pre('save', async function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.statics.verifyPassword = function (verifyUser,callback) {
  this.findOne({ username: verifyUser.username })
    .then((user) => {
      if (bcrypt.compare(verifyUser.password, user.password)) {
        jwt.sign(
          { verifyUser },
          process.env.TOKEN_SECRET,
          { expiresIn: 60 * 60 },
          (err, token) => {
            if (err) {
             callback(err);
            } else {
             callback({"token": token});
            }
          }
        );
      }else{
          callback('Wrong Password')
      }
    })
    .catch((err) => {
     callback("User not found");
    });
};
 module.exports = mongoose.model('user', userSchema);