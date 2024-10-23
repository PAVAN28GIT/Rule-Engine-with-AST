const express = require('express');
const dotenv = require('dotenv');
var cors = require('cors')

//express app
const app = express()

// middlewares
app.use(cors()) //  If CORS is not configured on the backend, browsers will block cross-origin requests. This means that your frontend application will not be able to communicate with your API,
app.use(express.json())
app.use(express.urlencoded({extended : true}));


// connect to db
const connectToMongo = require('./db');
connectToMongo();

// env variables
dotenv.config({path: './config.env'})
const port = process.env.PORT


// ROUTES
const ruleRoutes = require('./routes/ruleRoutes.js');
app.get('/', (req, res) => {
    res.send('The Rule Engine backend')
})

app.get('/api/rules' , ruleRoutes);


app.listen(port, () => {
    console.log(`The Rule Engine listening on port ${port}`)
})
  