import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [toShow, setToShow] = useState("");

  const handlePhoneBookSubmit = event => {
    event.preventDefault();
    const entryObject = {
      name: newName,
      number: newNumber
    };
    console.log("Filtered person", persons.filter(person => person.name === newName).length);
    persons.filter(person => person.name === newName).length ? alert(`${newName} is already added to the phonebook`) : setPersons(persons.concat(entryObject));
    console.log("Toshow", toShow || "false");
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
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then(response => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} toShow={toShow} />
      <h2>Add new </h2>
      <PersonForm handlePhoneBookSubmit={handlePhoneBookSubmit} handleNameChange={handleNameChange} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
