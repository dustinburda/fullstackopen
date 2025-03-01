import { useState, useEffect } from 'react'
import axios from 'axios'


const Form = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  return (
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
  );
}

const Person = ({person}) => {
  return (
    <li key={person.name}>{person.name} {person.phoneNumber}</li>
  );
}

const PhoneBook = ({persons}) => {
  return (
    <ul>
      {persons.map(person => <Person person={person} key={person.id}/>)}
    </ul>
  );
}

const App = () => {



  const [persons, setPersons] = useState([]) 

  const getHook = () => {
    axios.get("http://localhost:3001/persons")
         .then(response => {
          setPersons(response.data);
         }, reason => {
          console.log("Reason: ", reason);
         })
  };

  useEffect(getHook, []);


  const [filterValue, setFilterValue] = useState("")

  let renderedPersons = [...persons];
  if(filterValue != ""){
    renderedPersons = persons.filter((person) => person.name.toLowerCase().includes(filterValue.toLowerCase()))
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filterValue} onChange={event => setFilterValue(event.target.value)} />
      </div>
      <Form persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <PhoneBook persons={renderedPersons}/>
    </div>
  )
}

export default App