// import React from 'react'
import PropTypes from "prop-types";

function RatingIcon({ quantity }) {
    return (
        <div className="rating-icon">
            {Array.from({ length: quantity }, (_, i) => (
                <StarLight key={i} />
            ))}
            {quantity > parseInt(quantity) && <StarHalf />}
        </div>
    );
}

RatingIcon.propTypes = { quantity: PropTypes.number };

export default RatingIcon;

function StarLight() {
    return (
        <svg
            width="46"
            height="43"
            viewBox="0 0 46 43"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d_1_137)">
                <path
                    d="M23.0765 9L25.5633 16.2553H33.6108L27.1002 20.7394L29.587 27.9947L23.0765 23.5106L16.5659 27.9947L19.0527 20.7394L12.5421 16.2553H20.5896L23.0765 9Z"
                    fill="#FF6B00"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_1_137"
                    x="0.542236"
                    y="0"
                    width="45.0686"
                    height="42.9947"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="3" />
                    <feGaussianBlur stdDeviation="6" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 0.42 0 0 0 0 0 0 0 0 1 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1_137"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1_137"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
}

function StarHalf() {
    return (
        <svg
            width="37"
            height="45"
            viewBox="0 0 37 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g filter="url(#filter0_d_1_136)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M25 9.42973L24.4998 8L21.6934 16.0213H12.6116L19.9589 20.9787L17.1525 29L24.4998 24.0426L25 24.3801V9.42973Z"
                    fill="#FF6B00"
                />
            </g>
            <defs>
                <filter
                    id="filter0_d_1_136"
                    x="0.611572"
                    y="0"
                    width="36.3884"
                    height="45"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="4" />
                    <feGaussianBlur stdDeviation="6" />
                    <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 1 0 0 0 0 0.42 0 0 0 0 0 0 0 0 1 0"
                    />
                    <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_1_136"
                    />
                    <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_1_136"
                        result="shape"
                    />
                </filter>
            </defs>
        </svg>
    );
}
