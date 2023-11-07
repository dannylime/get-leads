import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "./components/Pagination";
import UserTable from "./components/UserTable";
import EditableUser from "./components/EditableUser";

function App() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(50);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/getUsers")
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const indexOfLastRecord = currentPage * perPage;
  const indexOfFirstRecord = indexOfLastRecord - perPage;
  const currentUsers = filteredUsers.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchInput(searchTerm);
    const filtered = users.filter((user) =>
      user.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleAddAssignedTo = (userId, newAssignedTo, updatedAt) => {
    axios
      .put(`http://localhost:3001/updateAssignedTo/${userId}`, {
        assignedTo: newAssignedTo,
        updatedAt: updatedAt,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("AssignedTo added successfully:", response.data);
        } else {
          console.error("User not found:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding assignedTo:", error);
      });
  };

  // Function to handle adding a note to the database
  const handleAddNote = (userId, note) => {
    axios
      .put(`http://localhost:3001/updateNote/${userId}`, {
        note: note,
      })
      .then((response) => {
        if (response.data.success) {
          console.log("Note added successfully:", response.data);
        } else {
          console.error("User not found:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error adding note:", error);
      });
  };

  return (
    <div className="container">
      <h3 className="mt-4">
        Łączna liczba przedsiębiorstw: {filteredUsers.length}
      </h3>
      <div className="w-75 mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Wyszukaj po kategorii"
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <UserTable
          currentUsers={currentUsers}
          onAddAssignedTo={handleAddAssignedTo}
          onAddNote={handleAddNote} // Pass the handler to the UserTable component
        />
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          totalRecords={filteredUsers.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default App;
