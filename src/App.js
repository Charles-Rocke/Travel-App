import { useState } from "react";
const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
];

// default App component
export default function App() {
  // moved ites state up from form
  const [items, setItems] = useState([]);
  // handle add items
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}

// Logo commponent
function Logo() {
  return <h1>🌴Far Away💼</h1>;
}

// Form component
function Form({ onAddItems }) {
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

    onAddItems(newItem);
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

// Packing List component
function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}

// Item component
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

// Stats component
function Stats() {
  return (
    <footer className="stats">
      <em>💼 You have x items on your list, you've already packed x (x%)</em>
    </footer>
  );
}
