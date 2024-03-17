import jwt from 'jsonwebtoken'
import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from "../config/environmentVariables.js";

const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    selectCourse: {
        type: String,
        required: true
    },
    gender: {
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
    token: {
        default: [],
        type: [],
    }
})

studentSchema.pre('save', function (next) {
    const student = this
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(student.password, salt);
    student.password = hash;
    next()
})

studentSchema.methods.comparePassword = function (password) {
    const student = this
    return bcrypt.compareSync(password, student.password);
}

studentSchema.methods.generateToken = function () {
    const { _id } = this;
    const token = jwt.sign({ _id }, JWT_SECRET);
    return token
}

const Student = mongoose.model('Students', studentSchema)
export default Student