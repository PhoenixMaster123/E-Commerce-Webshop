import { useState } from 'react';
import './SearchBox.css';

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);
  };

  const handleSearch = () => {
    // Regex to check for valid search input (letters and numbers)
    const regex = /^[a-zA-Z0-9]*$/;
    if (regex.test(searchQuery)) {
      alert(`Searching for: ${searchQuery}`);
      // Here you can trigger a real search action like API request
    } else {
      alert('Invalid search input. Only letters, numbers, and spaces allowed.');
    }
  };

  return (
    <div className="searchBox">
      <input
        className="searchInput"
        type="text"
        value={searchQuery}
        onChange={handleChange}
        placeholder="Search"
      />
      <button className="searchButton" onClick={handleSearch}>
        <i className="material-icons">search</i>
      </button>
    </div>
  );
};

export default SearchBox;
