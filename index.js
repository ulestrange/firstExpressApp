const express = require('express')
const https = require('https')
const fs = require('fs')

require('dotenv').config();
// note this required a .env file which is not in github

const app = express()
const port = process.env.PORT || 3001

// own  modules
const db = require('./database');
const contacts = require('./routes/contacts')
const events = require('./routes/events')
const home = require('./routes/home')

const { validAPIKeyNeeded, logging1, logging2} = require('./middleware/logging')



app.use(express.json());


app.use('/api/v1/contacts/',  contacts)

app.use('/api/v1/events/', events)

app.use('/', logging2, logging1, home)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// const serverOptions = {
//     key: fs.readFileSync('ssl/local.key'),
//     cert: fs.readFileSync('ssl/local.cert')
//   };

// https.createServer(serverOptions,app).listen(8080,() =>
//   console.log(`listening on 8080, don't forget the https`));
