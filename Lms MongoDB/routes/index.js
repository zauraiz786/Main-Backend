import express from 'express'
import students from '../routes/students.js'
import courses from '../routes/courses.js'
const router = express.Router()

router.use('/students', students)
router.use('/courses', courses)

export default router