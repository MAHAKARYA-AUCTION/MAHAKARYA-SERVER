if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require("express")
const app = express()
const port = process.env.PORT || 4002;
const cors = require("cors")
const router = require('./routes/index')

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.use(cors())

app.use('/', router)

app.listen(port, () => {
  console.log(`service app is running on port ${port}`)
})