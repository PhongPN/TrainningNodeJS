import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const ObjectId = mongoose.SchemaTypes.ObjectId;

const userSchema = new mongoose.Schema({
    user_id:{
        type: ObjectId,
        required: true
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
    },
    user_created_date: {
        type: Date,
        default: Date.now
    },
    user_lastEdited_date: {
        type: Date,
        default: Date.now
    },
    resetToken: {
        type: String,
        default: null,
    },
    resetTokenExpired: {
        type: Date,
        default: Date.now
    }

}, { collection: "user" });

userSchema.pre("save", async function save(next) {
    try {
        console.log(this.user_userpass)
        const salt = await bcrypt.genSalt(10);
        this.user_userpass = await bcrypt.hash(this.user_userpass, salt);
        console.log(this.user_userpass)
        return next();
    } catch (err) {
        return next(err);
    }
});

userSchema.pre("findOneAndUpdate", async function (next) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    docToUpdate.user_userpass = this._update.user_userpass
    docToUpdate.user_lastEdited_date = Date.now();
    docToUpdate.save(function (err) {
        if (err) {
           console.log(err);
        }
    });
    next();
});


userSchema.statics.verifyPassword = async function (verifyUser){
    const user = await this.findOne({ user_username : verifyUser.username })
    if (!user)
        return { error: true, message: 'Username not found' }
    else {
        if (bcrypt.compareSync(verifyUser.password, user.user_userpass)) {
            return { error: false, message: { fullname: user.user_fullName, username: user.user_username } }
        } else {
            return { error: true, message: 'Incorrect password' }
        }
    }

};
const User = mongoose.model("user", userSchema);

export default User;