import { useState } from "react";
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

export default Form;
