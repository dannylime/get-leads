import React, { useState } from "react";

function EditableUser({
  userId,
  assignedTo,
  onSaveAssignedTo,
  note,
  onSaveNote,
}) {
  const [selectedValue, setSelectedValue] = useState(assignedTo);
  const [noteValue, setNoteValue] = useState(note);

  const handleSaveAssignedTo = () => {
    onSaveAssignedTo(userId, selectedValue);
  };

  const handleSaveNote = () => {
    onSaveNote(userId, noteValue);
  };

  return (
    <div className="editable-user">
      <div className="editable-section">
        <p>Przypisano do:</p>
        <select
          value={selectedValue}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option value="Maciek">Maciek</option>
          <option value="Krzysiek">Krzysiek</option>
          <option value="Wojtek">Wojtek</option>
          <option value="Andrzej">Andrzej</option>
        </select>
        <button onClick={handleSaveAssignedTo}>Zapisz przypisanie</button>
      </div>
      <div className="editable-section">
        <p>Notatka:</p>
        <textarea
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          rows="4"
          cols="50"
          placeholder="Wprowadź notatkę..."
        ></textarea>
        <button onClick={handleSaveNote}>Zapisz notatkę</button>
      </div>
    </div>
  );
}

export default EditableUser;
