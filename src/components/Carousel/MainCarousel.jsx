// import React from 'react'
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
const apiImages = "https://image.tmdb.org/t/p/w500/";
function MainCarousel({ data, title, link }) {
    return (
        <Wrapper>
            <div className="carousel-header">
                <Link to={`/${link}`}>{title}</Link>
            </div>
            <div className="carousel-container">
                <Swiper
                    slidesPerView={5}
                    spaceBetween={30}
                    freeMode={true}
                    modules={[FreeMode]}
                    className="my-swiper"
                >
                    {data.map((movie) => {
                        const { id, title, poster_path, name } = movie;
                        return (
                            <SwiperSlide className="swiper" key={id}>
                                <Link
                                    to={`${link}/${id}`}
                                    className="movie-card"
                                >
                                    <img
                                        src={apiImages + poster_path}
                                        alt={title}
                                    />
                                    <span>{title || name}</span>
                                </Link>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </Wrapper>
    );
}

MainCarousel.propTypes = {
    data: PropTypes.array,
    title: PropTypes.string,
    link: PropTypes.string,
};

export default MainCarousel;

const Wrapper = styled.div`
    width: 1116px;
    max-width: calc(100vw - 40px);
    margin: auto;
    margin-bottom: 84px;
    position: relative;
    z-index: 3;
    .carousel-header {
        margin-top: 45px;
        color: #fdfdfd;
        font-size: 24px;
        font-weight: 700;
        position: relative;
        a {
            text-decoration: none;
            color: #fdfdfd;
        }
        &::after {
            content: "";
            position: absolute;
            bottom: -3px;
            display: block;
            width: 61px;
            height: 1.5px;
            background: #ff6b00;
        }
    }
    .my-swiper {
        margin-top: 40px;
        .swiper-slide {
            border-radius: 15px;
            min-width: 250px;
            min-height: 375px;
        }
    }
    .movie-card {
        width: 100%;
        height: 100%;
        border-radius: 15px;
        transition: 0.3s ease;
        position: relative;
        &:hover {
            scale: 1.05;
        }
        img {
            border-radius: 15px;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        span {
            position: absolute;
            color: #fff;
            bottom: 17px;
            left: 13px;
            max-width: 180px;
        }
    }
`;
