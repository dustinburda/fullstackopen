const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.static('dist'))

let notes = [
    {
        id: "1",
        content: "HTML is easy",
        important: true
    },
    {
        id: "2",
        content: "Browser can execute only JavaScript",
        important: false
    },
    {
        id: "3",
        content: "GET and POST are the most important methods of HTTP protocol",
        important: true
    }
]

app.get("/", (request, response) => {
    response.set({
        "Content-Type": "text/html"
    })
    response.send("<h1>Hello World</h1>")
    response.status(200)
})

app.get("/api/notes", (request, response) => {
    response.set({
        "Content-Type": "application/json"
    })
    response.send(JSON.stringify(notes))
    response.status(200)
})


const PORT =  process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})