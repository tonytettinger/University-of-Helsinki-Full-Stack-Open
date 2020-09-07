import React from "react";

const PersonForm = ({ handlePhoneBookSubmit, handleNameChange, handleNumberChange, newName, newNumber }) => {
  return (
    <form onSubmit={handlePhoneBookSubmit}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
