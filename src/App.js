import { useState } from "react";

// default App component
export default function App() {
  // moved ites state up from form
  const [items, setItems] = useState([]);

  // handle add items
  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  // delete item handler
  function handleDeleteItem(id) {
    // filter out the id that is passed from the array
    setItems((items) => items.filter((item) => item.id !== id));
  }

  // update item handler
  function handleToggleItem(id) {
    // if item is equal to id add packed opposite true or false to the array
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
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
function PackingList({ items, onDeleteItem, onToggleItem }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
    </div>
  );
}

// Item component
function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      {/* set style for packed item */}
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

// Stats component
function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  // derived state
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? `You've got everything! Ready to go✈️`
          : `💼 You have ${numItems} items on your list, you've already packed
        ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
