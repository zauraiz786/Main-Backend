import express from 'express'
import db from './config/db.js'
import 'dotenv/config'
import router from './routes/index.js'

const app = express()
const port = process.env.PORT

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