require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const connectDB = require('./db/connect')
const notFoundMid = require('./middleware/not-found')
const errHandleMid = require('./middleware/error-handler')
const {urlencoded} = require("express");
const routes = require('./routes/products')

app.use(express.json())
app.use(urlencoded({extended: false}))
app.set('json spaces', 2)
app.get('/', (req, res) => {
    res.send("<h1>Store API</h1><a href='/api/v1/products'>products</a>")
})
app.use('/api/v1/products', routes)
app.use(notFoundMid)
app.use(errHandleMid)

const port = process.env.PORT || 3000
app.listen(port, async () => {
    await connectDB(process.env.MONGO_URI).then(()=>{
        console.log('DB connected.')
    })
    console.log('Listening on port 3000.....')
})