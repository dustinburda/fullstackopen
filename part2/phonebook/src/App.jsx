import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 

  const [newName, setNewName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(event) => {
        event.preventDefault();

        if (persons.findIndex(person => person.name === newName) != -1) {
          alert(`${newName} is already in the phonebook!`);
          return;
        }

        const newPerson = {
          name: newName
        }

        setPersons([newPerson, ...persons]);
      }}>
        <div>
          name: <input type="text" value={newName} onChange={(event) => {
            const name = event.target.value;
            setNewName(name);
          }}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App