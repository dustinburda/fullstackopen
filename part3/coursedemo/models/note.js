const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery',false)
mongoose.connect(url)
        .then(result => console.log('Connected to MongoDB'))
        .catch(error => console.log('Error connecting to MongoDB', error.message))

const noteSchema = new mongoose.Schema({
    booleanTwo: Boolean,
    boolean: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Note', noteSchema)
