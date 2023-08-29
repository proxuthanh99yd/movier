// import React from 'react'
import PropTypes from "prop-types";

function Info({ director, originalTitle, revenue }) {
    return (
        <div className="info">
            <div className="info-item">
                <p className="text-wrapper">Director</p>
                {director.map((director) => (
                    <p key={director.id} className="text-wrapper-2">
                        {director.name}
                    </p>
                ))}
            </div>
            <div className="info-item">
                <p className="text-wrapper">Original Title</p>
                <p className="text-wrapper-2">{originalTitle}</p>
            </div>
            <div className="info-item">
                <p className="text-wrapper">Revenue</p>
                <p className="text-wrapper-2">
                    {revenue
                        ? revenue
                              .toString()
                              .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
                        : "?"}{" "}
                    $
                </p>
            </div>
        </div>
    );
}

Info.propTypes = {
    director: PropTypes.any,
    originalTitle: PropTypes.string,
    revenue: PropTypes.number,
};

export default Info;
