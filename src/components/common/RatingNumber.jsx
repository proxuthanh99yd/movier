import PropTypes from "prop-types";
import { Star } from "../icons";

function RatingNumber({ numberStar, theme = "default" }) {
    return (
        <div className={`rating-number ${theme}`}>
            <span>{numberStar?.toFixed()}</span>
            <Star />
        </div>
    );
}

RatingNumber.propTypes = {
    numberStar: PropTypes.number,
    theme: PropTypes.oneOf(["dark", "default"]),
};

export default RatingNumber;
