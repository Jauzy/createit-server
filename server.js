require('dotenv').config()

const express = require("express")
const app = express()
const PORT = process.env.PORT || 8001

const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

//setting up swagger
const swaggerOptions = {
    swaggerDefinition : {
        info : {
            title : 'Create It - API Server',
            description : 'Create It API Docs',
            contacts : {
                name : 'Anonymous'
            },
            servers : ['http://localhost:5000']
        }
    },
    apis:["./routes/user.js"]
}
const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use('/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

//mongoose
const mongoose = require('mongoose')

//db URL
const mongodbUri = process.env.MONGOURI

//setting up DB params (mongodbUri, optional) (wajib)
// useNewURLParser buat ignore warning (wajib)
mongoose 
    .connect(mongodbUri, {useNewUrlParser : true})
    .then(()=>{
        console.log('MongoDb connected on',mongodbUri)
    })
    .catch(err => {
        console.log(err)
    })

//cors
app.use(require('cors')())

//body-parser express
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//routers in index.js
const router = require('./routes/index')
app.use('/',router)

app.listen(PORT, (err) => {
    if(err) console.log(err)
    console.log(`Server is running on Port ${PORT}`)
})