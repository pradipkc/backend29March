const express = require('express')
require('dotenv').config()
require('./connection')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const ProductRoute = require('./routes/ProductRoute')
const UserRoute = require('./routes/userRoute')


// routes
const TestRoute = require('./routes/testroute')
const CategoryRoute = require('./routes/categoryRoute')
const ProductRoute = require('./routes/ProductRoute')
const UserRoute = require('./routes/userRoute')


// creating an app using express
const app = express()

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

// starting server
let port = process.env.PORT
app.use(bodyParser.json())
app.listen(port,()=>{
    console.log(`APP STARTED AT PORT ${port}`)
})

// using routes
app.use(TestRoute)
app.use(CategoryRoute)
app.use(ProductRoute)
app.use(UserRoute)
app.use(OrderRoute)