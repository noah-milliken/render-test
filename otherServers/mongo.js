const mongoose = require('mongoose')


console.log(url)
mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// eslint-disable-next-line no-unused-vars
const note = new Note({
  content: 'My mom is a skilled mountain climber.',
  date: new Date(),
  important: true,
})


note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})


// Note.find({}).then(result => {
//   result.forEach(note => {
//     console.log(note)
//   })
//   mongoose.connection.close()
// })