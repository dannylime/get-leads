import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faEdit,
  faSave,
  faTimes,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";

function UserTable({ currentUsers, onAddAssignedTo, onAddNote }) {
  return (
    <table className="table table-bordered table-striped mt-4">
      <thead>
        <tr>
          <th>Nazwa firmy</th>
          <th>Kategoria</th>
          <th>Adres</th>
          <th>Link</th>
          <th>Telefon</th>
          <th>Przypisano do:</th>
          <th>Notatka</th>
        </tr>
      </thead>
      <tbody>
        {currentUsers.map((user, index) => {
          const [assignedTo, setAssignedTo] = useState(user.assignedTo);
          const [note, setNote] = useState(user.note || ""); // Initialize with the existing note or an empty string
          const [isEditing, setIsEditing] = useState(false);
          const [updatedAt, setUpdatedAt] = useState(new Date(user.updatedAt)); // Initialize with the existing updatedAt

          const handleEditClick = () => {
            setIsEditing(true);
          };

          const handleSaveClick = () => {
            // Update the updatedAt field to the current date and time
            const newUpdatedAt = new Date();
            setUpdatedAt(newUpdatedAt);

            // Save the assignedTo value and updatedAt
            onAddAssignedTo(user._id, assignedTo, newUpdatedAt.toISOString());
            onAddNote(user._id, note); // Save the note
            setIsEditing(false);
          };

          const handleCancelClick = () => {
            setAssignedTo(user.assignedTo);
            setNote(user.note || ""); // Restore the previous note or an empty string
            setIsEditing(false);
          };

          const handleAssignedToChange = (e) => {
            setAssignedTo(e.target.value);
          };

          const handleNoteChange = (e) => {
            setNote(e.target.value);
          };

          return (
            <tr key={index}>
              <td>{user.storeName}</td>
              <td>{user.category}</td>
              <td>{user.city + " - " + user.address}</td>
              <td>
                <a
                  href={user.googleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FontAwesomeIcon icon={faLink} />
                </a>
              </td>
              <td className="w-100">{user.phone}</td>
              <td className="w-100">
                {isEditing ? (
                  <div className="d-flex align-items-center">
                    <select
                      value={assignedTo}
                      onChange={handleAssignedToChange}
                    >
                      <option value="Maciek">Maciek</option>
                      <option value="Krzysiek">Krzysiek</option>
                      <option value="Wojtek">Wojtek</option>
                      <option value="Andrzej">Andrzej</option>
                    </select>
                    <FontAwesomeIcon
                      icon={faSave}
                      className="text-success ml-2 pl-2"
                      onClick={handleSaveClick}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-secondary ml-2 pl-2"
                      onClick={handleCancelClick}
                    />
                  </div>
                ) : (
                  <div className="d-flex align-items-center">
                    {assignedTo}
                    <FontAwesomeIcon
                      icon={faEdit}
                      className="text-primary ml-2 pl-2"
                      onClick={handleEditClick}
                    />
                  </div>
                )}
              </td>
              <td>
                {isEditing ? (
                  <div className="d-flex align-items-center">
                    <textarea
                      value={note}
                      onChange={handleNoteChange}
                      rows="3"
                      cols="30"
                    ></textarea>
                    <FontAwesomeIcon
                      icon={faSave}
                      className="text-success ml-2 pl-2"
                      onClick={handleSaveClick}
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="text-secondary ml-2 pl-2"
                      onClick={handleCancelClick}
                    />
                  </div>
                ) : (
                  <div>
                    <FontAwesomeIcon
                      icon={faStickyNote}
                      className="text-primary"
                      onClick={handleEditClick} // Dodaj obsługę edycji notatki
                    />
                    {note}
                  </div>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default UserTable;
