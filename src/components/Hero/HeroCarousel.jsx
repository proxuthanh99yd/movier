// import React from 'react'
import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./HeroCarousel.scss";
import Hero from "./Hero";
// import required modules
function HeroCarousel({ data, genres }) {
    return (
        <Swiper
            direction={"vertical"}
            pagination={{
                clickable: true,
            }}
            modules={[Pagination]}
            className="hero-carousel"
        >
            {data.map((movie, index) => {
                if (index < 5) {
                    return (
                        <SwiperSlide key={movie.id}>
                            <Hero genres={genres} movie={movie} />
                        </SwiperSlide>
                    );
                }
            })}
        </Swiper>
    );
}

HeroCarousel.propTypes = {
    data: PropTypes.array,
    genres: PropTypes.array,
};

export default HeroCarousel;
