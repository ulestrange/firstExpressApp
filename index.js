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

// temporary store for the contacts data 

var contacts = [];

app.use(express.json());

app.post('/contacts', (req, res) => {
    const contact = req.body;
  

    console.log(contact) // to check what was received
   
    contacts.push(contact);

    res.send ('contact has been added to the database');
    console.log(`contact name is ${contact.name} number of contacts is ${contacts.length}`);

});

app.get('/contacts', (req, res) => {
    res.send(contacts);
})

app.get('/contacts/:id', (req,res) => {

  let id = req.params.id; 
  res.json(contacts[id]);
})




  app.listen(port, () => console.log(`Example app listening on port ${port}!`))

