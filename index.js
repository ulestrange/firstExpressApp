const express = require('express')
const app = express()
const port = 3000

require('dotenv').config();
// note this required a .env file which is not in github

// own  modules
const db = require('./database');
const { Contact } = require('./models/contacts')


// Some silly routes for fun

app.get('/', (req, res) => res.send('Hello World from Una!'))

app.get('/fruit/apples', (req, res) =>
  res.send('hello world, this is apples '));

  app.get('/bananas', (req, res) =>
  res.send('hello world, this is bananas'));

// routes for the contact api

// temporary store for the contacts data 

let contacts = []

app.use(express.json());

app.post('/contacts', async (req, res) => {
    
  

    let contact = new Contact(req.body);

    console.log(contact) // to check what was received
   
    try {

      contact = await contact.save();
  
  
      res
        .location(`${contact._id}`)
        .status(201)
        .json(contact)
    }

    catch (error) {
      res.status(500).send('db_error ' + error)
    }



});

app.get('/contacts', async (req, res) => {


  try {
    const contacts = await Contact
      .find()

    res.json(contacts);

  }
  catch (error) {
    res.status(500).json('db error ' + error)
  }


})

app.get('/contacts/:id', async (req,res) => {

  let id = req.params.id;
  
  try {
    const contact = await Contact.findById(id)

    if (contact)
    {
      res.json(contact)
    }
    else{
      res.status('404').json('not fount');
    }
  }
catch (error)
{
  res.status(404).json('id is incorrect' + error)
}

  res.json(contacts[id]);
})




  app.listen(port, () => console.log(`Example app listening on port ${port}!`))

