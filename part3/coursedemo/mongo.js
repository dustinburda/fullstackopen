const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Give a password as argument");
    process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://dustin99wii:${password}@cluster0.lyw8f.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    booleanTwo: Boolean,
    boolean: Boolean
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    booleanTwo: true,
    boolean: false
})

// note.save().then(result => {
//     console.log("Note Saved!")
//     mongoose.connection.close()
// })


Note.find({booleanTwo: true}).then(results => {
    results.forEach(result => {
        console.log(result);
    })
    mongoose.connection.close()
})
