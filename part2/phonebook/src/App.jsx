import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'


const Filter = ({filter, handleFilterChange}) => (
  <input value={filter} onChange={handleFilterChange}/>
)

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handleNameChange}/>
    </div>
    <div>
      number: <input value={newNumber} onChange={handleNumberChange}/>
    </div>
    <div>
        <button type="submit">add</button>
    </div>
  </form>
)
  
const Persons = ({filteredPersons, handleDelete}) => (
  <div>
  {filteredPersons.map(person => <div key={person.name}>{person.name} {person.number} <button onClick={() => handleDelete(person)}>delete</button></div>)}
  </div>
)

const Notification = ({ notification }) => {
  if (notification === null) return null

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}




const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState("")
  const [notification, setNotification] = useState(null)

useEffect(() => {
  console.log('effect run')
  personService.getAll()
    .then(response => {
      console.log('response data', response.data)
      setPersons(response.data)
    })
}, [])



const deletePerson = (person) => {
  const confirm = window.confirm(`Delete "${person.name}"?`)
  if (confirm === false) return

  personService.remove(person.id)
  .then(() => {
    setPersons(persons.filter(p => p.id !== person.id))
      setNotification({ message: `Deleted ${person.name}`, type: 'success' })
      setTimeout(() => setNotification(null), 5000)
  })
  .catch(error => {
    setNotification({
      message: `Information of ${person.name} has already been removed from server`,
      type: 'error'
    })
    setTimeout(() => setNotification(null), 5000)
    setPersons(persons.filter(p => p.id !== person.id))
  })
}




  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) 
      {const found = persons.find( p => p.name === newName)
      const ok = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (ok === false) return

    const changed = {id: found.id, name: found.name, number: newNumber}
     personService
      .update(found.id, changed)
      .then(returnedPerson => {
      setPersons(persons.map(p => p.id !== found.id ? p : returnedPerson))
      setNotification({ message: `Updated ${returnedPerson.name}`, type: 'success' })
      setTimeout(() => setNotification(null), 5000)
  })
      .catch(error => {
      setNotification({
      message: `Information of ${found.name} has already been removed from server`,
      type: 'error'
    })
      setTimeout(() => setNotification(null), 5000)
      setPersons(persons.filter(p => p.id !== found.id))
  })
      setNewName("")
      setNewNumber("")
      return
  } 


    

    const newPerson = {name: newName, number: newNumber}
    personService.create(newPerson)
      .then(response => {
        setPersons(persons.concat(response.data))
    setNotification({ message: `Added ${newName}`, type: 'success' })
    setTimeout(() => {setNotification(null)}, 5000)
  })
    setNewName("")
    setNewNumber("")
    return
  }

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange= (event) => {setNewNumber(event.target.value)}
  const handleFilterChange= (event) => {setFilter(event.target.value)}

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
    <Notification notification={notification}/> 
    <h2>Phonebook</h2>
    <Filter filter={filter} handleFilterChange={handleFilterChange}/>
    <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
    <h2>Numbers</h2>
    <Persons filteredPersons={filteredPersons} handleDelete={deletePerson}/>
    </div>
  )
}

export default App




