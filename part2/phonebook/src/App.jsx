import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      phoneNumber: "040-1234567"
    }
  ]) 

  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(event) => {
        event.preventDefault();

        if (persons.findIndex(person => person.name === newName) != -1 ) {
          alert(`${newName} is already in the phonebook!`);
          return;
        }

        if (newName === "") {
          alert(`Please provide a name!`);
          return;
        }

        if (newNumber === "") {
          alert(`Please provide a phone number!`);
          return;
        }

        const newPerson = {
          name: newName,
          phoneNumber: newNumber
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
          number: <input type="text" value={newNumber} onChange={event => {
            const number = event.target.value;
            setNewNumber(number);
          }}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name} {person.phoneNumber}</li>)}
      </ul>
    </div>
  )
}

export default App