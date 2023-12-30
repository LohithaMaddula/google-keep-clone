import express from 'express'
import mongoose from 'mongoose'

const app = express()
const PORT = 8080

app.use(express.json())

app.get('/', (req, res) => {
  res.send('hello')
})

app.listen(PORT, () => { 
  console.log(`listening in ${PORT}`)
})