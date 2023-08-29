import { FbIcon, OtherIcon, SubtractIcon, TwitterIcon } from "../icons";
import RatingNumber from "./RatingNumber";
import PropTypes from "prop-types";
function SectionIcon({ star }) {
    return (
        <section className="section-icon">
            <div className="icon">
                <FbIcon />
            </div>
            <div className="icon">
                <TwitterIcon />
            </div>
            <div className="icon">
                <OtherIcon />
            </div>
            <div className="icon">
                <SubtractIcon />
            </div>
            <div className="icon">
                <RatingNumber numberStar={star} theme="dark" />
            </div>
        </section>
    );
}
SectionIcon.propTypes = {
    star: PropTypes.number,
};
export default SectionIcon;
