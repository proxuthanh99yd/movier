import PropTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { memo } from "react";

SecondCarousel.propTypes = {
    data: PropTypes.array,
    linkTo: PropTypes.string,
};
function SecondCarousel({ data, linkTo }) {
    return (
        <Wrapper>
            <Swiper
                loop={true}
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={2}
                spaceBetween={30}
                coverflowEffect={{
                    rotate: 0,
                    depth: 800,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={true}
                modules={[Autoplay, EffectCoverflow, Pagination]}
                className="mySwiper"
            >
                {data.slice(0, 10).map(({ id, title, backdrop_path }) => (
                    <SwiperSlide key={id}>
                        <p className="title">{title}</p>
                        <img
                            src={
                                import.meta.env.VITE_IMAGES_URL +
                                "/w1280/" +
                                backdrop_path
                            }
                        />
                        <Link to={`/${linkTo}/${id}`}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="60"
                                height="56"
                                viewBox="0 0 60 56"
                                fill="none"
                            >
                                <g clipPath="url(#clip0_31_19)">
                                    <path
                                        d="M44.9944 27.9947L22.4944 41.9947V13.9948L44.9944 27.9947ZM29.9944 0C13.4481 0 0 12.5515 0 27.9948C0 43.438 13.4481 55.9895 29.9944 55.9895C46.5408 55.9895 59.9888 43.438 59.9888 27.9948C59.9888 12.5515 46.5408 0 29.9944 0ZM29.9944 3.48959C44.5141 3.48959 56.25 14.4431 56.25 27.9948C56.25 41.5464 44.5141 52.4999 29.9944 52.4999C15.4747 52.4999 3.73884 41.5464 3.73884 27.9948C3.73884 14.4431 15.4747 3.48959 29.9944 3.48959Z"
                                        fill="#FDB62E"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_31_19">
                                        <rect
                                            width="60"
                                            height="56"
                                            fill="white"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span>WATCH TRAILER</span>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Wrapper>
    );
}

export default memo(SecondCarousel);

const Wrapper = styled.div`
    width: 100%;
    margin: auto;
    .swiper {
        width: 100%;
        padding-top: 50px;
        padding-bottom: 50px;
    }

    .swiper-slide {
        background-position: center;
        background-size: cover;
        width: 300px;
        p {
            position: absolute;
            top: 50px;
            left: 50px;
            font-size: 30px;
            font-style: italic;
            font-weight: 600;
        }
        a {
            position: absolute;
            left: 22px;
            bottom: 22px;
            display: flex;
            align-items: center;
            text-decoration: none;
            color: #e4e4e4;
            span {
                font-size: 24px;
                font-style: normal;
                font-weight: 400;
                margin-left: 5px;
            }
            &:hover {
                color: #ff6b00;
            }
        }
        img {
            border-radius: 10px;
            display: block;
            width: 100%;
            object-fit: cover;
        }
    }
`;
