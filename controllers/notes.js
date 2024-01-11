const notesRouter = require('express').Router()
const Note = require('../models/note')

notesRouter.get('/', async (req, res) => {
  const notes = await Note.find({})
  res.json(notes)
})

notesRouter.get('/:id', async (req,res) => {
  const note = await Note.findById(req.params.id)
  if(note){
    res.json(note)
  }else{
    res.status(404).end()
  }
})

notesRouter.post('/', async (request, response) => {
  const body = request.body

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await note.save()
  response.status(201).json(savedNote)
})

notesRouter.delete('/:id', async (req, res) => {
  await Note.findByIdAndDelete(req.params.id)
  res.status(204).end()
})

notesRouter.put('./:id', (req,res,next) => {
  const body = req.body

  const note = {
    content: body.content,
    important: body.important
  }
  Note.findByIdAndUpdate(req.params.id, note, { new: true }).then(updatedNote => {
    res.json(updatedNote)
  }).catch(error => next(error))
})

module.exports = notesRouter