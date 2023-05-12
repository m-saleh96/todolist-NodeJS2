const express = require('express')
const router = require('./routes/route')
const app = express()
const port = 5000

app.use(express.json())


app.use('/hamada' , router)

app.listen(port , (err) => {
    if (!err) {
        console.log("no error")
    }
})
