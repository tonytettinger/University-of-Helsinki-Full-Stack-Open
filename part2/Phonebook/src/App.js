import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import phoneBookService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [toShow, setToShow] = useState("");
  const [notificationMessage, setNotificationMessage] = useState({ message: null, success: true });

  const handlePhoneBookSubmit = event => {
    event.preventDefault();
    const entryObject = {
      name: newName,
      number: newNumber
    };

    const searchResult = persons.filter(person => person.name === newName);
    if (searchResult.length && window.confirm(`Do you want to update the phone number for ${newName}?`)) {
      phoneBookService
        .update(searchResult[0].id, entryObject)
        .then(newEntry => {
          console.log("Update response", newEntry);
          setPersons(persons.map(person => (person.name === newName ? { ...person, number: newNumber } : person)));
          setNotificationMessage({
            message: `${newName} has been updated`,
            success: true
          });
          setTimeout(() => {
            setNotificationMessage({ ...notificationMessage, message: null });
          }, 5000);
        })
        .catch(error => {
          setNotificationMessage({
            message: `${newName} can't be updated due to error:${error}`,
            success: false
          });
          setTimeout(() => {
            setNotificationMessage({ ...notificationMessage, message: null });
          }, 5000);
        });
    } else {
      phoneBookService
        .create(entryObject)
        .then(newEntry => {
          setPersons(persons.concat(newEntry));
          setNotificationMessage({
            message: `${newName} has been added`,
            success: true
          });
          setTimeout(() => {
            setNotificationMessage({ ...notificationMessage, message: null });
          }, 5000);
        })
        .catch(error => {
          setNotificationMessage({
            message: `${newName} has not been added due to error:${error}`,
            success: false
          });
          setTimeout(() => {
            setNotificationMessage({ ...notificationMessage, message: null });
          }, 5000);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = event => {
    setNewName(event.target.value);
  };

  const handleNumberChange = event => {
    setNewNumber(event.target.value);
  };

  const handleSearch = event => setToShow(event.target.value);

  const personsToShow = persons.filter(person => person.name.includes(toShow));

  const deletePerson = (id, name) => {
    if (window.confirm(`Do you want to delete ${name}`)) {
      phoneBookService
        .deleteEntry(id)
        .then(() => setPersons(persons.filter(current => current.id !== id)))
        .catch(error => {
          setNotificationMessage({
            message: `The entry for ${name} has already been removed from the server`,
            success: false
          });
          setPersons(persons.filter(current => current.id !== id));
          setTimeout(() => {
            setNotificationMessage({ ...notificationMessage, message: null });
          }, 5000);
        });
    }
  };
  useEffect(() => {
    phoneBookService.getAll().then(entry => setPersons(entry));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification success={notificationMessage.success} message={notificationMessage.message} setNotificationMessage={setNotificationMessage} />
      <Filter handleSearch={handleSearch} toShow={toShow} />
      <h2>Add new </h2>
      <PersonForm handlePhoneBookSubmit={handlePhoneBookSubmit} handleNameChange={handleNameChange} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} setPersons={setPersons} persons={persons} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
