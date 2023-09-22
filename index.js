const express = require('express')
const app = express()
const port = 3000


require('dotenv').config();
// note this required a .env file which is not in github

// own  modules
const db = require('./database');
const contacts = require('./routes/contacts')
const home = require('./routes/home')





app.use(express.json());

app.use('/api/v1/contacts', contacts)

app.use('/', home)



app.listen(port, () => console.log(`Example app listening on port ${port}!`))

