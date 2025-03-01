import { useState } from "react";

import Note from "./Note"


const App = (props) => {
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState("Enter a note here")
  const [showAll, setShowAll] = useState(true)


  const notesToShow = showAll 
      ? notes
      : notes.filter(note => note.important)

  
  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: note,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }
    console.log(noteObject)

    setNotes([noteObject, ...notes]);
  }

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  }


  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notesToShow.map((note) => 
          <Note note={note.content} key={note.id}/>)
        }
      </ul>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <form onSubmit={addNote}>
        <input type="text" value={note} onChange={handleNoteChange}/>
        <button type="">save</button>
      </form>
    </div>
  )
}

export default App