
"use client";

import { useState } from 'react';

const SearchBar = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
 
  const [filteredData, setFilteredData] = useState(data || []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

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
//this searchBar functionality should be added
export default SearchBar;
