import { useState, useEffect } from "react";
import noteService from './services/notes.js'
import axios from 'axios'
import Note from "./Note"
import Notification from "./Notification"
import Footer from './Footer'


const App = () => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)


  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        console.log(initialNotes)
        setNotes(initialNotes)
      })
      .catch(reason =>
        console.log(reason)
      )
  }, [])

  const notesToShow = showAll 
      ? notes
      : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: note,
      important: Math.random() < 0.5,
      id: String(notes.length + 1)
    }

    noteService.create(noteObject);
    setNotes([...notes, noteObject]);
    setNote('')
  }

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  }

  const toggleImportanceOf = (id) => {
    const noteObject = notes.find(note => note.id === id)
    const newNoteObject = {...noteObject, important: !noteObject.important}
    
    noteService.update(id, newNoteObject)
               .then(response => { 
                  setNotes(notes.map(note => note.id === id ? response : note))
               })
               .catch(error => {

                setErrorMessage(`the note '${note.content}' was already deleted from server`);

                setTimeout( ()=> {
                  setErrorMessage(null);
                }, 5000);

                setNotes(notes.filter(n => n.id !== id))
              })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <ul>
        {notesToShow.map((note) => {
            return (<Note note={note} toggleImportanceOf={toggleImportanceOf} key={note.id}/>);
          }
        )}
      </ul>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <form onSubmit={addNote}>
        <input type="text" value={note} onChange={handleNoteChange} placeholder="Enter a note here"/>
        <button type="">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App