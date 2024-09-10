require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/amit', (req, res) => {
  res.send('Hello World Amit Mandal aaaa!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})