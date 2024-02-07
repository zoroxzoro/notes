const express = require('express')
const Router = express.Router();
const Note = require('../models/Notess')


express.json()
// get all the notes

Router.get('/',async (req,res)=>{
    try {
        const notes = await Note.find()
        res.json(notes)
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
        
    }
})

// get note by ID
Router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({
        message: 'Note not found',
      });
    }

    res.json(note);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message,
    });
  }
});



// post any note
Router.post('/', async (req, res) => {
  try {
    // Validate request body
    if (!req.body || !req.body.title || !req.body.content) {
      return res.status(400).json({ message: 'Invalid request body' });
    }

    const note = new Note({
      title: req.body.title,
      content: req.body.content,
    });

    const newNote = await note.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


// update note 

Router.patch('/:id',  async(req,res)=>{

    try {const note = await Note.findById(req.params.id);
     if(!note){
         return res.status(400).json({ message: 'Invalid request body' });
     }
     
     if(req.body.title){
        note.title = req.body.title
        note.content = req.body.content
     }
     if(req.body.content){
        note.content = req.body.content
     }
     const UpdatedNote = await note.save();
     res.json(UpdatedNote)} 
     catch (err){
        res.status(500).json({message:"error ", err})

     }
     
})


// delete note
Router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await note.deleteOne();
    res.status(200).json({ message: 'Note deleted!' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});
module.exports = Router;
