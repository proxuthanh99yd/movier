// import React from 'react'
import PropTypes from "prop-types";
import YoutubeIframe from "./YoutubeIframe";
function TrailerVideo({ videoId }) {
    const id = videoId?.results[0]?.key;

    return (
        <div className="trailer-video">
            <YoutubeIframe videoId={id} />
        </div>
    );
}

TrailerVideo.propTypes = {
    videoId: PropTypes.object,
};

export default TrailerVideo;
