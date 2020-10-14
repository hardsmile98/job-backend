const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const auth = require('./routes/auth')
const job = require('./routes/job')
const user = require('./routes/user')

const app = express()

app.use(express.json({ extended: true }))

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.use('/api/auth', auth)
app.use('/api/job', job)
app.use('/api/user', user)

const PORT = process.env.PORT || '5000'
async function start() {
  try {
    await mongoose.connect(config.get('mongoUrl'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    app.listen(PORT, () => {
      console.log(`server start on ${PORT} port`)
    })
  } catch (error) {
    console.log('server error', error)
    process.exit(1)
  }
}

start()
