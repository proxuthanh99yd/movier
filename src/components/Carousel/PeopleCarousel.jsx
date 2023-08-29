import PropTypes from "prop-types";
import { Card } from "../common";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { styled } from "styled-components";

function PeopleCarousel({ data }) {
    return (
        <Wrapper>
            <p className="title">Famous people</p>
            <div className="people">
                <Swiper
                    slidesPerView={7.5}
                    spaceBetween={30}
                    freeMode={true}
                    modules={[FreeMode]}
                    className="my-swiper"
                >
                    {data.map((person) => {
                        if (person.profile_path) {
                            return (
                                <SwiperSlide className="swiper" key={person.id}>
                                    <Card person={person} />
                                </SwiperSlide>
                            );
                        }
                    })}
                </Swiper>
            </div>
        </Wrapper>
    );
}

PeopleCarousel.propTypes = {
    data: PropTypes.array,
};

export default PeopleCarousel;

const Wrapper = styled.div`
    width: 1136px;
    max-width: calc(100vw - 40px);
    margin: auto;
    padding-left: 38px;
    margin-top: 50px;
    .title {
        color: #fdfdfd;
        font-family: Roboto;
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
        position: relative;
        &::after {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 48px;
            height: 1.5px;
            background: #ff6b00;
        }
    }
    .people {
        margin-top: 36px;
    }
`;
