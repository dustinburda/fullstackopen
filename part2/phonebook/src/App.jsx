import { useState, useEffect } from 'react'
import personService from './services/persons.js'


const Form = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const addNewPerson = () => {
    const index = persons.findIndex(person => person.name === newName);

    if ( index != -1 ) {
      if (!window.confirm(`${newName} has already been added to the phonenook, replace the old number with a new one?`))
        return;

      const newPerson = {
        ...persons[index],
        number: newNumber
      }

      personService.update(newPerson, newPerson.id)
                   .then(data => setPersons(persons.map(person => newPerson.id === person.id ? data : person)))

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
      number: newNumber,
      id: String(persons.length + 1)
    }

    personService.create(newPerson)
                 .then( response =>
                    setPersons([...persons, newPerson])
                  )
  }

  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      addNewPerson();
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

const Person = ({persons, setPersons, person}) => {
  const deletePerson = (id) => {
      personService.deletePerson(id)
                   .then(data => setPersons(persons.filter(person => person.id !== id)))
         
    
  }

  return (
    <>
      <li key={person.name}>{person.name} {person.number}</li>
      <button style={{display: "inline"}} onClick={() => deletePerson(person.id)}>delete</button>
    </>
  );
}

const PhoneBook = ({persons, setPersons}) => {
  return (
    <ul style={{listStyle: "none"}}>
      {persons.map(person => <Person persons={persons} setPersons={setPersons} person={person} key={person.id}/>)}
    </ul>
  );
}

const App = () => {
  const [persons, setPersons] = useState([]) 

  const getHook = () => {
   personService.getAll()
         .then(response => {
          setPersons(response);
         })
         .catch(reason => [
          console.log(reason)
         ])
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
      <PhoneBook persons={renderedPersons} setPersons={setPersons}/>
    </div>
  )
}

export default App