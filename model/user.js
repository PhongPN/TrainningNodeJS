const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const jwt = require("../helper/jwt");

let userSchema = new mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true
    },
    user_username: {
        type: String,
        required: true,
        unique: true
    },
    user_userpass: {
        type: String,
        required: true
    },
    user_fullname: {
        type: String,
        required: true
    }
}, { collection: "user" });

userSchema.pre("save", async function save(next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.user_userpass = await bcrypt.hash(this.user_userpass, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.statics.verifyPassword = function (verifyUser, callback) {
    this.findOne({ user_username: verifyUser.username })
        .then((user) => {
            if (bcrypt.compare(verifyUser.password, user.user_userpass)) {
                //console.log(user.user_username)
                jwt.generateToken(verifyUser, process.env.TOKEN_SECRETKEY, process.env.TOKEN_LIFE, (token)=>{
                    callback(token)
                })
            } else {
                callback({ error: "error username, password" });
            }
        })
        .catch((err) => {
            callback({ error: "error" });
        });
};

const User = mongoose.model("user", userSchema);

module.exports = User;