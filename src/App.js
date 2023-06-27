import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}

//
function Logo() {
  return <h1>🌴Far Away💼</h1>;
}

//
function Form() {
  /* Controlled elements:
    1. define a piece of state
    2. use that piece of state oin the element that we want to control
    3. update that state variable (onChange)
  */
  // state for description
  const [description, setDescription] = useState("");
  //state for quantity
  const [quantity, setQuantity] = useState(1);
  // event handler
  function handleSubmit(event) {
    // disable page reload on submit
    event.preventDefault();

    // if no description don't submit
    if (!description) return;

    // add new item
    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    // setDescription to itial state
    setDescription("");
    setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(event) => setQuantity(Number(event.target.value))}
      >
        {/* create an empty array with 20 elements, (current value, index) return i + 1 */}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter an item"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

//
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

// item component
function Item({ item }) {
  return (
    <li>
      {/* set style for packed item */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button>❌</button>
    </li>
  );
}

//
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have x items on your list, you've already packed x (x%)</em>
    </footer>
  );
}
