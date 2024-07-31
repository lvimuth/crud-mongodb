import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const response = await axios.get("http://localhost:5000/items");
      setItems(response.data);
    };

    fetchItems();

    const socket = io("http://localhost:5000");

    socket.on("itemAdded", (newItem) => {
      setItems((prevItems) => [...prevItems, newItem]);
    });

    socket.on("itemUpdated", (updatedItem) => {
      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === updatedItem._id ? updatedItem : item
        )
      );
    });

    socket.on("itemDeleted", (id) => {
      setItems((prevItems) => prevItems.filter((item) => item._id !== id));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleEdit = (item) => {
    setEditingItem(item);
    setName(item.name);
    setQuantity(item.quantity);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedItem = { name, quantity };
    await axios.put(
      `http://localhost:5000/items/${editingItem._id}`,
      updatedItem
    );
    setEditingItem(null);
    setName("");
    setQuantity("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/items/${id}`);
  };

  return (
    <div>
      <h2>Item List</h2>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            {item.name} - {item.quantity}
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingItem && (
        <form onSubmit={handleUpdate}>
          <h2>Edit Item</h2>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
          <button type="submit">Update Item</button>
          <button type="button" onClick={() => setEditingItem(null)}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default ItemList;
