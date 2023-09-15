const express = require('express')
const app = express()
const port = 3000


// Some silly routes for fun

app.get('/', (req, res) => res.send('Hello World from Una!'))

app.get('/fruit/apples', (req, res) =>
  res.send('hello world, this is apples '));

  app.get('/bananas', (req, res) =>
  res.send('hello world, this is bananas'));

// routes for the contact api



  app.listen(port, () => console.log(`Example app listening on port ${port}!`))

