import { useState, useEffect } from 'react';

function SearchableList() {
  const [items] = useState([
    { id: 1, name: "Apple iPhone", category: "Electronics" },
    { id: 2, name: "Samsung Galaxy", category: "Electronics" },
    { id: 3, name: "Nike Shoes", category: "Fashion" },
    { id: 4, name: "Adidas Jacket", category: "Fashion" },
    { id: 5, name: "Dell Laptop", category: "Electronics" },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // 🔹 Debounce logic (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => clearTimeout(timer); // cleanup
  }, [searchTerm]);

  // 🔹 Case-insensitive filtering
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(debouncedTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '12px' }}
      />

      {filteredItems.length === 0 ? (
        <p>No results found</p>
      ) : (
        <ul>
          {filteredItems.map(item => (
            <li key={item.id}>
              <strong>{item.name}</strong> — {item.category}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchableList;
