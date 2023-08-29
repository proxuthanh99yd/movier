import { RatingIcon } from "../common";
import PropTypes from "prop-types";
import "./Hero.scss";
import { Link } from "react-router-dom";
const apiImages = "https://image.tmdb.org/t/p/original/";

function Hero({ movie, genres }) {
    const { id, title, overview, vote_average, vote_count, genre_ids } = movie;

    return (
        <section className="hero">
            <div className="over-lay"></div>
            <div className="hero-bg">
                <img src={apiImages + movie.backdrop_path} alt={title} />
            </div>
            <div className="hero-content">
                <p className="movie-tags">
                    {genres.map((genre) => {
                        const gen = genre_ids.map((genre_id) => {
                            if (genre_id === genre.id) {
                                return <span key={genre.id}>{genre.name}</span>;
                            }
                        });
                        return gen;
                    })}
                </p>
                <Link to={`/movies/${id}`} className="movie-title">
                    {title}
                </Link>
                <div className="movie-rating">
                    <RatingIcon quantity={vote_average} />
                    <span className="time">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="19"
                            viewBox="0 0 20 19"
                            fill="none"
                        >
                            <path
                                d="M10.0041 9.5C5.36733 9.5 1.60413 13.084 1.60413 17.5C1.62093 17.5 18.4041 17.5 18.4041 17.5C18.4041 13.084 14.6409 9.5 10.0041 9.5Z"
                                stroke="#FDFDFD"
                                strokeWidth="2"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M10.0041 9.5C12.3237 9.5 14.2041 7.70914 14.2041 5.5C14.2041 3.29086 12.3237 1.5 10.0041 1.5C7.68448 1.5 5.80408 3.29086 5.80408 5.5C5.80408 7.70914 7.68448 9.5 10.0041 9.5Z"
                                stroke="#FDFDFD"
                                strokeWidth="2"
                                strokeMiterlimit="10"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        {vote_count}
                    </span>
                </div>
                <div className="over-view">
                    <span className="title">Overview</span>
                    <p className="content">{overview}</p>
                </div>
                <div className="hero-bottom">
                    <div className="lear-more">Learn more</div>
                    <span className="movie-caption">
                        “ With your blade, bring an end to the nightmare. “
                    </span>
                </div>
            </div>
        </section>
    );
}

Hero.propTypes = {
    movie: PropTypes.object,
    genres: PropTypes.array,
};

export default Hero;
