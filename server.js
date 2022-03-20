const express = require('express')
const app = express()

const path = require('path')

//html in public folder, using json and extended json
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.listen(3000 || process.env.PORT)