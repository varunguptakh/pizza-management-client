import React, { useState, useEffect } from "react";
import axios from "axios";

const ToppingList = () => {
  const [toppings, setToppings] = useState([]); // State to store topping list
  const [newTopping, setNewTopping] = useState(""); // State to store new topping input

  // Fetch all toppings on component mount
  useEffect(() => {
    axios.get("/toppings").then((response) => {
      setToppings(response.data); // Set the toppings from the response
    });
  }, []);

  // Function to add a new topping
  const addTopping = () => {
    if (newTopping.trim() === "") return;
    axios
      .post("/toppings", { name: newTopping })
      .then((response) => {
        setToppings([...toppings, response.data]); // Add new topping to the state
        setNewTopping(""); // Clear input field
      })
      .catch((error) => {
        console.error("Error adding topping", error);
      });
  };

  // Function to delete a topping
  const deleteTopping = (id) => {
    axios
      .delete(`/toppings/${id}`)
      .then(() => {
        setToppings(toppings.filter((t) => t._id !== id)); // Remove topping from state
      })
      .catch((error) => {
        console.error("Error deleting topping", error);
      });
  };

  return (
    <div>
      <h1>Manage Toppings</h1>
      <ul>
        {toppings.map((topping) => (
          <li key={topping._id}>
            {topping.name}{" "}
            <button onClick={() => deleteTopping(topping._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newTopping}
        onChange={(e) => setNewTopping(e.target.value)}
        placeholder="Add a new topping"
      />
      <button onClick={addTopping}>Add Topping</button>
    </div>
  );
};

export default ToppingList;
