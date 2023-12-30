// components/SearchBar.js
"use client";
// components/SearchBar.js
import { useState } from 'react';

const SearchBar = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // Provide a default value (empty array) for filteredData
  const [filteredData, setFilteredData] = useState(data || []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter the data based on the search term
    const filtered = data.filter(item =>
      item.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredData(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
