import express from 'express'
import User from '../modules/Users.js'
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).send({ message: 'User fetched successfully', users: users })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/add', async (req, res) => {
    try {
        await User.create(req.body)
        res.status(200).send({ message: "User Added Successfully" })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        //Checking if email exist
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).send({ message: "Email not found" })
            return
        }
        //Comparing Password
        const isCorrectPassword = user.comparePassword(password)
        if (!isCorrectPassword) {
            res.status(400).send({ message: 'Password is incorrect!' })
            return
        }
        res.status(200).send({ message: "User logged successfully" })
    }catch(error){
        res.status(400).send(error.message)
    }
})

export default router