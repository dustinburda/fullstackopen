require('dotenv').config()

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Note = require('./models/note')

const app = express()
app.use(cors())
app.use(express.static('dist'))
app.use(bodyParser.json())




app.get("/", (request, response) => {
    response.set({
        "Content-Type": "text/html"
    })
    response.send("<h1>Hello World</h1>")
    response.status(200)
})

app.get("/api/notes", (request, response) => {
    console.log("Getting...")
    let notes = []

    Note.find({}).then(results => {
        results.forEach(result => {
            notes.push(result)
        })
        
        response.set({
            "Content-Type": "application/json"
        })
        response.send(JSON.stringify(notes))
    })
})

app.post('/api/notes', (request, response) => {
    console.log("In post");
    const body = request.body;

    console.log(request);

    if(!body.content)
        return response.status(400).json({error: 'content missing'});

    const note = new Note({
        content: body.content,
        important: body.important || false
    })

    note.save().then(savedNote => {
        response.set({
            "Content-Type": "application/json"
        })
        response.send(JSON.stringify(savedNote))
    })
})


const PORT =  process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})