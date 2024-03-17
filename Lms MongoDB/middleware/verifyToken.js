import jwt from "jsonwebtoken";
import Student from "../modules/Students.js";
import { JWT_SECRET } from "../config/environmentVariables.js";

async function verifyToken(req, res, next) {
    const token = req.headers.authorization?.slice(7);

    try {
        
        if (!token) {
            res.status(401).send("Token not Found!");
            return;
        }   
        const decoded = jwt.verify(token, JWT_SECRET);
        const tokenExists = await Student.findOne({token: token}) 
        if (!tokenExists) {
                res.status(400).send("Invalid Token");
                return;
            }
            req.studentId = decoded._id;
            req.tokenToRemove = token;
            next()
        } catch (error) {
            console.log(error.message);
        }
}

export default verifyToken