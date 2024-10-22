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
const astRoutes = require('./routes/astRoutes.js');
app.get('/', (req, res) => {
    res.send('The Rule Engine backend')
})

app.get('/api/ast' , astRoutes);


app.listen(port, () => {
    console.log(`The Daily Scoop listening on port ${port}`)
})
  