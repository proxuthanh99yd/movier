// import React from 'react'
import PropTypes from "prop-types";
import { SearchIcon } from "../icons";

function Button({ title, className = "btn btn--default" }) {
    return (
        <button className={className}>
            <span>{title}</span>
            <SearchIcon />
        </button>
    );
}

Button.propTypes = {
    title: PropTypes.string,
    className: PropTypes.string,
};

export default Button;
