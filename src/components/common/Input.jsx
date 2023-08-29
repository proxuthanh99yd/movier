// import React from 'react'
import PropTypes from "prop-types";

function Input({ input, setInput }) {
    return (
        <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            className="input"
            placeholder="Type something ...."
        />
    );
}

Input.propTypes = {
    input: PropTypes.string,
    setInput: PropTypes.func,
};

export default Input;
