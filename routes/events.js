const express = require('express')

const {Event} = require('../models/events')

const router = express.Router();

router.post('/', async (req, res) => {
    

    let event = new Event(req.body);

    console.log(event) // to check what was received
   
    try {

      event = await event.save();
  
  
      res
        .location(`${event._id}`)
        .status(201)
        .json(event)
    }

    catch (error) {
      res.status(500).send('db_error ' + error)
    }



});

router.get('/', async (req, res) => {

  const {name, places, limit} = req.query;


  let limitNumber = parseInt(limit)
  if (isNaN(limitNumber)) {
    limitNumber = 0

  }


  let filter = {}

  if (name)
  {
    filter.name = { $regex: `${name}`, $options: 'i' }
  }

  const numberOfPlaces = parseInt(places)


  // if places does not parse to an int it is ignored.
  if (!isNaN(numberOfPlaces)) {

    filter.numberOfPlaces = numberOfPlaces
  }



  try {
    const events = await Event
      .find(filter)
      .limit(limitNumber)
      .sort({numberOfPlaces : 1})
    res.json(events);
  }
  catch (error) {
    res.status(500).json('db error ' + error)
  }

})

router.get('/:id', async (req,res) => {

  let id = req.params.id;
  
  try {
    const event = await Event.findById(id)

    if (event)
    {
      res.json(event)
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
    const event = await Event.findByIdAndDelete(id)

    if (event)
    {
      res.json(event)
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
    const event = await Event.findByIdAndUpdate(id, req.body)

    if (event)
    {
      res.json(event)
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