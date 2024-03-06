import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
})

userSchema.pre('save', function (next) {
    const user = this
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
    next()
})

userSchema.methods.comparePassword = function(password){
    const user = this
    return bcrypt.compareSync(password, user.password); 
}

const User = mongoose.model('Users', userSchema)
export default User