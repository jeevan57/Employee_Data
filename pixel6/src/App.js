// src/App.js
import React from "react";
import UserList from "./features/users/UserList";
import SortAndFilter from "./features/users/SortAndFilter";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Employees</h1>
      </header>
      <SortAndFilter />
      <UserList />
    </div>
  );
}

export default App;
