import PropTypes from "prop-types";

export default function ArrowButton({ className }) {
    return (
        <svg
            className={`arrow-btn arrow-${className}`}
            fill="none"
            height="170"
            viewBox="0 0 170 170"
            width="170"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g className="g" filter="url(#filter0_d_31_145)">
                <rect
                    className="rect"
                    fill="#FDFDFD"
                    height="70"
                    rx="35"
                    width="70"
                    x="50"
                    y="46"
                />
                <path
                    className="path"
                    d="M76 62L95 81L76 100"
                    stroke="#0D0D0D"
                    strokeWidth="5"
                />
            </g>
        </svg>
    );
}
ArrowButton.propTypes = { className: PropTypes.string };
