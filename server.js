const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const router = require("./routes/routes")

app.use(express.json())
app.use(cors())
app.use("/raashi",router)

mongoose.connect(
    "mongodb+srv://raashiarora1006:06072022@cluster0.taaofwa.mongodb.net/beeSt1?retryWrites=true&w=majority"
)
.then(() => console.log("Database connected"))
.then(() => {
    app.listen(5000)
})
.catch((err) => console.log(err))
