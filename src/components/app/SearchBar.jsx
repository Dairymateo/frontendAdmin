import React from 'react';
import { Link } from 'react-router-dom';
import './SearchBar.css'; 

function SearchBar() {
  return (
    <div className="search-bar">


      <nav className="search-bar__nav">
        <ul className="search-bar__nav-list">
          <li className="search-bar__nav-item"><Link to="/" className="search-bar__nav-link">Sign out</Link></li>
          <li className="search-bar__nav-item"><Link to="/vehicles" className="search-bar__nav-link">Vehicles</Link></li>
          <li className="search-bar__nav-item"><Link to="/pilots" className="search-bar__nav-link">Pilot's</Link></li>
          <li className="search-bar__nav-item"><Link to="/circuits" className="search-bar__nav-link">Circuits</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default SearchBar;