const express = require('express')
const app = express()
let notes = require('./db/db.json')
const { uid } = require('uid')
const path = require('path')
const htmlRoute = require('./public/assets/js/htmlRoute')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use('/', htmlRoute)
app.get('/api/notes', (req, res) => {
  res.json(notes)
})
app.post('/api/notes', (req, res) => {
  let newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uid()
  }
  notes.push(newNote)
  res.json(200)
})
app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== req.params.id)
  res.json(notes)
})
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening in on PORT: ${PORT}`))