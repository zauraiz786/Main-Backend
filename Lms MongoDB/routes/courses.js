import express from 'express'
import Courses from '../modules/Courses.js'
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const courses = await Courses.find()
        res.status(200).send({ message: "Courses \n", courses: courses })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/add', async (req, res) => {
    try{
        await Courses.create(req.body)
        res.send({message: "Course Added Successfully"})
    }catch(error){
        res.status(400).send(error.message)
    }
})

export default router