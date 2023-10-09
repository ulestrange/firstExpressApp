const express = require('express')

const {Contact, ValidateContact} = require('../models/contacts')

const router = express.Router();

router.post('/', async (req, res) => {
    

  let result = ValidateContact(req.body)

  if (result.error) {
    res.status(400).json(result.error);
    return;
  }


    let contact = new Contact(req.body);

  //  console.log(contact) // to check what was received
   
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

router.get('/', async (req, res) => {


  try {
    const contacts = await Contact
      .find()

    res.json(contacts);

  }
  catch (error) {
    res.status(500).json('db error ' + error)
  }


})

router.get('/:id', async (req,res) => {

  let id = req.params.id;
  
  try {
    const contact = await Contact.findById(id)

    if (contact)
    {
      res.json(contact)
    }
    else{
      res.status('404').json('not found');
    }
  }
catch (error)
{
  res.status(404).json('id is incorrect' + error)
}

})


router.delete('/:id', async (req,res) => {

  let id = req.params.id;
  
  try {
    const contact = await Contact.findByIdAndDelete(id)

    if (contact)
    {
      res.json(contact)
    }
    else{
      res.status('404').json('not found');
    }
  }
catch (error)
{
  res.status(404).json('id is incorrect' + error)
}

})

router.put('/:id', async (req,res) => {

  let id = req.params.id;
  
  try {
    const contact = await Contact.findByIdAndUpdate(id, req.body)

    if (contact)
    {
      res.json(contact)
    }
    else{
      res.status('404').json('not found');
    }
  }
catch (error)
{
  res.status(404).json('id is incorrect' + error)
}

})

module.exports = router