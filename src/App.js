import "./App.css";
import React from "react";
import ItemList from "./components/ItemList";
import ItemForm from "./components/ItemForm";

function App() {
  return (
    <div className="App">
      <h1>CRUD Application</h1>
      <ItemForm />
      <ItemList />
    </div>
  );
}

export default App;
