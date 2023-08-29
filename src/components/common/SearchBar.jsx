// import React from 'react'
// import PropTypes from 'prop-types'

import { SearchIcon } from "../icons";

function SearchBar() {
    return (
        <div className="search-bar search-bar--dark search-bar--narrow">
            <input
                type="search"
                placeholder="Search movie ..."
                className="search-control"
            />
            <button className="search-btn">
                <SearchIcon />
            </button>
        </div>
    );
}

SearchBar.propTypes = {};

export default SearchBar;
