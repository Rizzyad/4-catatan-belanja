import { useState } from "react";

const groceryItems = [
  {
    id: 1,
    name: "Kopi Bubuk",
    quantity: 2,
    checked: false,
  },
  {
    id: 2,
    name: "Gula Pasir",
    quantity: 5,
    checked: false,
  },
  {
    id: 3,
    name: "Air Mineral",
    quantity: 3,
    checked: false,
  },
];

const App = () => {
  const [items, setItems] = useState(groceryItems);

  function handleAddItem(item) {
    if(item === " ") return;
    
    setItems([...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handletoggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function handleClear() {
    setItems([]);
  }

  console.log(items);

  return (
    <>
      <div className="app">
        <Header />
        <Form OnAddItem={handleAddItem} />
        <GroceryList
          items={items}
          onDeleteItem={handleDeleteItem}
          onToggleItem={handletoggleItem}
          onClearItem={handleClear}
        />
        <Footer items={items} />
      </div>
    </>
  );
};

export default App;

const Header = () => {
  return <h1>Catatan Belanjaku 📝</h1>;
};

const Form = ({ OnAddItem }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return; 

    const newItem = { id: Date.now(), name, quantity, checked: false };

    OnAddItem(newItem);

    setName("");
    setQuantity(1);
  }

  const quantityNum = [...Array(10)].map((_, i) => (
    <option value={i + 1} key={i + 1}>
      {i + 1}
    </option>
  ));

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>Hari ini belanja apa kita?</h3>
      <div>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {quantityNum}
        </select>
        <input
          type="text"
          placeholder="nama barang..."
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button>Tambah</button>
    </form>
  );
};

const GroceryList = ({ items, onDeleteItem, onToggleItem, onClearItem }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  switch (sortBy) {
    case "name":
      sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "checked":
      sortedItems = items.slice().sort((a, b) => a.checked - b.checked);
      break;
    default:
      sortedItems = items;
      break;
  }

  return (
    <>
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item
              item={item}
              key={item.id}
              onDeleteItem={onDeleteItem}
              onToggleItem={onToggleItem}
            />
          ))}
        </ul>
      </div>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button onClick={onClearItem}>Bersihkan Daftar</button>
      </div>
    </>
  );
};

const Item = ({ item, onDeleteItem, onToggleItem }) => {
  return (
    <li key={item.id}>
      <input type="checkbox" onClick={() => onToggleItem(item.id)} />
      <span style={item.checked ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.name}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>&times;</button>
    </li>
  );
};

const Footer = ({ items }) => {
  const totalItems = items.length;
  const checkedItems = items.filter((item) => item.checked).length;
  const percentage = Math.round((checkedItems / totalItems) * 100);

  return (
    <footer className="stats">
      {" "}
      Ada {totalItems} barang di daftar belanjaan, {checkedItems} barang sudah
        dibeli ({checkedItems ? percentage : 0} %){" "}
    </footer>
  );
};
