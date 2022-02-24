const express = require('express')
const path = require('path')

// include and initialize the rollbar library with your access token
const Rollbar = require("rollbar");
const rollbar = new Rollbar({
  accessToken: 'd2b77c1914574a5d913bd4898cbcc55a',
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

let students = []

app.post('/api/student', (req, res)=>{
    let {name} = req.body
    name = name.trim()

    students.push(name)

    rollbar.log('student was added succesfully', {author: 'Austin'})

    res.status(200).send(students)
})

app.use(rollbar.errorHandler())


// app.use(express.static(path.join(__dirname, '../')))

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`Take us to warp ${port}`))