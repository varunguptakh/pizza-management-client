import React, { useState, useEffect } from "react";
import axios from "axios";

const PizzaList = () => {
  const [pizzas, setPizzas] = useState([]);
  const [newPizza, setNewPizza] = useState({ name: "", toppings: [] });
  const [toppings, setToppings] = useState([]);

  // Fetch all pizzas and toppings on component mount
  useEffect(() => {
    axios.get("/pizzas").then((response) => {
      setPizzas(response.data);
    });
    axios.get("/toppings").then((response) => {
      setToppings(response.data);
    });
  }, []);

  // Function to add a new pizza
  const addPizza = () => {
    if (newPizza.name.trim() === "") return;
    axios
      .post("/pizzas", newPizza)
      .then((response) => {
        setPizzas([...pizzas, response.data]);
        setNewPizza({ name: "", toppings: [] });
      })
      .catch((error) => {
        console.error("Error adding pizza", error);
      });
  };

  return (
    <div>
      <h1>Manage Pizzas</h1>
      <ul>
        {pizzas.map((pizza) => (
          <li key={pizza._id}>
            {pizza.name} ({pizza.toppings.map((t) => t.name).join(", ")})
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newPizza.name}
        onChange={(e) => setNewPizza({ ...newPizza, name: e.target.value })}
        placeholder="Add a new pizza"
      />
      <h2>Choose Toppings</h2>
      {toppings.map((topping) => (
        <div key={topping._id}>
          <input
            type="checkbox"
            checked={newPizza.toppings.includes(topping._id)}
            onChange={() => {
              const selected = newPizza.toppings.includes(topping._id);
              setNewPizza({
                ...newPizza,
                toppings: selected
                  ? newPizza.toppings.filter((t) => t !== topping._id)
                  : [...newPizza.toppings, topping._id],
              });
            }}
          />
          {topping.name}
        </div>
      ))}
      <button onClick={addPizza}>Add Pizza</button>
    </div>
  );
};

export default PizzaList;
