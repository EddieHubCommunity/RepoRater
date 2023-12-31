"use client";
import { useState } from 'react';
//the searchBar functionality should be added.
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
        className="bg-gray-300 text-white border-2 border-gray-100 rounded-md p-2 transition-all duration-500 hover:bg-gray-500 hover:border-black"
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
