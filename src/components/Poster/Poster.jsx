// import React from 'react'
import PropTypes from "prop-types";

import { styled } from "styled-components";
function Poster({ images }) {
    const { posters } = images;
    if (!posters) {
        return <p>loading...</p>;
    }
    return (
        <Wrapper className="container">
            <div className="title">
                <p>Poster</p>
            </div>
            <div className="poster">
                {posters.slice(0, 6).map(({ file_path }) => (
                    <div key={file_path} className="poster-img">
                        <img
                            src={
                                import.meta.env.VITE_IMAGES_URL +
                                "/w500" +
                                file_path
                            }
                            alt={file_path}
                        />
                    </div>
                ))}
                {/* <div className="poster-img">
                    <img src="../images/poster-2.jpg" alt="" />
                </div>
                <div className="poster-img">
                    <img src="../images/poster-3.jpg" alt="" />
                </div>
                <div className="poster-img">
                    <img src="../images/poster-1.jpg" alt="" />
                </div>
                <div className="poster-img">
                    <img src="../images/poster-2.jpg" alt="" />
                </div>
                <div className="poster-img">
                    <img src="../images/poster-3.jpg" alt="" />
                </div> */}
            </div>
        </Wrapper>
    );
}

Poster.propTypes = {
    images: PropTypes.object,
};

export default Poster;

const Wrapper = styled.div`
    margin-top: 46px;
    color: #fdfdfd;
    .title {
        p {
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            position: relative;
            &::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: -7.5px;
                display: block;
                width: 48px;
                height: 1.5px;
                background: #ff6b00;
            }
        }
    }
    .poster {
        margin-top: 43px;
        display: grid;
        grid-template-columns: 1fr 1fr;

        justify-content: center;
        align-items: center;
        gap: 20px;
        .poster-img {
            max-width: 457px;
            &:nth-child(2) {
                margin-top: 58px;
                text-align: left;
            }
            &:nth-child(1),
            &:nth-child(3),
            &:nth-child(5) {
                margin-left: auto;
            }
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
                filter: grayscale(100%);
            }
            &:nth-child(4) img {
                -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
                filter: grayscale(0%);
            }
        }
    }
`;
