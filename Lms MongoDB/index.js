import express from 'express'
import cors from 'cors'
import db from './config/db.js'
import router from './routes/index.js'
import { PORT } from './config/environmentVariables.js'

const app = express()
app.use(cors())
const port = PORT

//!Middle Ware
app.use(express.json())

//!MongoDB Connect
db.connection
.once('open', ()=> console.log("Database Connected"))
.on('error', (error)=> console.log("Error Connecting in db -->", error))

app.use('/', router)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})