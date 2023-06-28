import { useState } from "react";
import Logo from "./Logo.js";
import Form from "./Form.js";
import PackingList from "./PackingList.js";
import Stats from "./Stats.js";

// default App component
export default function App() {
  // moved ites state up from form
  const [items, setItems] = useState([]);

  // clear list function
  function handleClearList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

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
        onClearList={handleClearList}
      />
      <Stats items={items} />
    </div>
  );
}
