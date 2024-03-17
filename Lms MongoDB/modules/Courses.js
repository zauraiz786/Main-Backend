import mongoose from "mongoose";

const CourseSchema = mongoose.Schema({
    courseName:{
        type: String,
        required: true,
    },
    teacherName:{
        type: String,
        required: true
    },
    days:{
        type: String,
        required: true
    }
})

const Course = mongoose.model('Course', CourseSchema);
export default Course;