import { useState } from 'react';

export default function SearchBar({ onSearch, onSort }) {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        {query && (
          <button className="search-clear" onClick={() => { setQuery(''); onSearch(''); }}>✕</button>
        )}
      </div>
      <select className="sort-select" onChange={(e) => onSort(e.target.value)}>
        <option value="newest">Newest First</option>
        <option value="price-low">Price: Low → High</option>
        <option value="price-high">Price: High → Low</option>
        <option value="name">Name A-Z</option>
      </select>
    </div>
  );
}
