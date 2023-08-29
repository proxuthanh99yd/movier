import PropTypes from "prop-types";
import { memo } from "react";
// import React from "react";

function TitleAvatar() {
    return (
        <div className="title-avatar" style={{ backgroundColor: "#FF6B00" }}>
            <img className="avatar" alt="avatar" src="../images/avatar.png" />
        </div>
    );
}
const MemoTitleAvatar = memo(TitleAvatar);
export default MemoTitleAvatar;
TitleAvatar.propTypes = {
    ellipse: PropTypes.string,
};
