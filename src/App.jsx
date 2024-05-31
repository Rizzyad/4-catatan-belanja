import { useState } from "react";

const groceryItems = [
  {
    id: 1,
    name: "Kopi Bubuk",
    quantity: 2,
    checked: true,
  },
  {
    id: 2,
    name: "Gula Pasir",
    quantity: 5,
    checked: true,
  },
  {
    id: 3,
    name: "Air Mineral",
    quantity: 3,
    checked: false,
  },
];

const App = () => {
  return (
    <>
      <div className="app">
        <Header />
        <Form />
        <GroceryList />
        <Footer />
      </div>
    </>
  );
};

export default App;

const Header = () => {
  return <h1>Catatan Belanjaku 📝</h1>;
};

const Form = () => {
  const [nama, setNama] = useState("");
  const [quantity, setQuantity] = useState(1);

  
  function handleSubmit(e) {
    e.preventDefault();
    
    if(!nama) return;
    
    const newItem = { nama, quantity, checked: false, id: Date.now() };

    console.log(newItem);

    setNama("")
    setQuantity(1)
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
        <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
          {quantityNum}
        </select>
        <input
          type="text"
          placeholder="nama barang..."
          value={nama}
          required
          onChange={(e) => setNama(e.target.value)}
        />
      </div>
      <button>Tambah</button>
    </form>
  );
};

const GroceryList = () => {
  return (
    <>
      <div className="list">
        <ul>
          {groceryItems.map((item) => (
            <Item item={item} key={item.id}/>
          ))}
        </ul>
      </div>
      <div className="actions">
        <select>
          <option value="input">Urutkan berdasarkan urutan input</option>
          <option value="name">Urutkan berdasarkan nama barang</option>
          <option value="checked">Urutkan berdasarkan ceklis</option>
        </select>
        <button>Bersihkan Daftar</button>
      </div>
    </>
  );
};

const Item = ({ item }) => {
  return (
    <li key={item.id}>
      <input type="checkbox" />
      <span style={item.checked ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.name}
      </span>
      <button>&times;</button>
    </li>
  );
};

const Footer = () => {
  return (
    <footer className="stats">
      {" "}
      Ada 10 barang di daftar belanjaan, 5 barang sudah dibeli (50%){" "}
    </footer>
  );
};
