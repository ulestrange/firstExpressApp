const express = require('express')


const cors = require('cors')
require('dotenv').config();
// note this required a .env file which is not in github



const app = express()
const port = process.env.PORT || 3001

// own  modules
const db = require('./database');
const contacts = require('./routes/contacts')
const events = require('./routes/events')
const home = require('./routes/home')

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }


app.use(cors(corsOptions))
app.use(express.json());

app.use('/api/v1/contacts/', contacts)

app.use('/api/v1/events/', events)

app.use('/', home)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

