const express = require('express')
const app = express()
let notes = require('./db/db.json')
const { uid } = require('uid')

const path = require('path')

//html in public folder, using json and extended json
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))
})
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
  console.log('note create w/ id success')
  res.json(200)
})
app.delete('/api/notes/:id', (req, res) => {
  notes = notes.filter(note => note.id !== req.params.id)
})

app.listen(3000 || process.env.PORT)