/* eslint-disable react-refresh/only-export-components */
import { styled } from "styled-components";
import PropTypes from "prop-types";
import { memo } from "react";
import { Link } from "react-router-dom";

Cards.propTypes = {
    data: PropTypes.array,
    link: PropTypes.string,
};
function Cards({ data, linkTo }) {
    return data.map(({ id, poster_path, title, name, vote_average }) => (
        <Wrapper key={id}>
            <Link to={`/${linkTo}/${id}`}>
                <div className="image-wrapper">
                    <img
                        src={
                            import.meta.env.VITE_IMAGES_URL +
                            "/w342/" +
                            poster_path
                        }
                        alt=""
                        className="image"
                    />
                </div>
                <p>{title || name}</p>
                <span>{vote_average}</span>
            </Link>
        </Wrapper>
    ));
}
export default memo(Cards);

const Wrapper = styled.div`
    max-width: 210px;
    position: relative;
    &:hover img {
        scale: 1.1;
    }
    &:hover p {
        color: #fd5502;
    }
    .image-wrapper {
        overflow: hidden;
        border-radius: 10px;
        img {
            width: 100%;
            object-fit: cover;
            transition: scale 0.3s ease;
        }
    }

    p {
        margin-top: 10px;
        color: #e4e4e4;
        font-size: 21px;
        font-style: normal;
        font-weight: 400;
        line-height: 22px;
    }
    span {
        text-align: center;
        line-height: 25px;
        position: absolute;
        width: 40px;
        height: 25px;
        border-radius: 20px;
        background: #fd5502;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    a {
        text-decoration: none;
        color: #e4e4e4;
    }
`;
