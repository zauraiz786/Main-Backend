import express from 'express'
import Student from '../modules/Students.js'
import verifyToken from '../middleware/verifyToken.js'
const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const students = await Student.find()
        res.status(200).send({ message: 'Students fetched successfully', students: students })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.post('/add', async (req, res) => {
    try {
        await Student.create(req.body)
        res.status(200).send({ message: "Student Added Successfully" })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        //Checking if email exist
        const student = await Student.findOne({ email })
        if (!student) {
            res.status(404).send({ message: "Email not found" })
            return
        }
        //Comparing Password
        const isCorrectPassword = student.comparePassword(password)
        if (!isCorrectPassword) {
            res.status(400).send({ message: 'Password is incorrect!' })
            return
        }
        //Token Generation
        const token = student.generateToken()
        student.token.push(token)
        await student.save()

        res.status(200).send({ message: "Student logged successfully", Token: token })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/logout', verifyToken, async (req, res) => {
    await Student.findByIdAndUpdate(req.studentId,{
        $pull: {token : req.tokenToRemove}
    })
    res.status(200).send("logged out sucessfully")
})

export default router