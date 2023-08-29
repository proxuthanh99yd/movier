import { styled } from "styled-components";
import { Cards, Filter, SecondCarousel } from "../../components";
import ReactPaginate from "react-paginate";
import { useMovies } from "../../store";

export default function Movies() {
    const {
        loadingMovies,
        loadingTrend,
        trend,
        movies,
        forcePage,
        handlePageClick,
        input,
        setInput,
        handleFilter,
    } = useMovies();

    if (loadingMovies || loadingTrend) {
        return (
            <Wrapper>
                <div className="loading-carousel">
                    <div className="loading"></div>
                </div>
                <div className="loading-filter">
                    <p>Loading</p>
                </div>
                <div className="movie-list">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div className="loading-image" key={i}>
                            <div className="loading"></div>
                        </div>
                    ))}
                </div>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <SecondCarousel linkTo={"movies"} data={trend} />
            <Filter
                input={input}
                setInput={setInput}
                handleFilter={handleFilter}
                linkGenre={"/genre/movie/list?language=en"}
            />
            <div className="movie-list">
                <Cards data={movies.results} linkTo={"movies"} />
            </div>
            <div className="paginate">
                <ReactPaginate
                    forcePage={forcePage}
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={
                        movies.total_pages > 500 ? 500 : movies.total_pages
                    }
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    color: #fff;
    .loading-filter {
        color: #ff6b00;
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 1116px;
        height: 50px;
        max-width: calc(100vw - 40px);
        margin: auto;
        margin-top: 40px;
    }
    .loading-carousel {
        background: #000;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 370px;
    }
    .movie-list {
        width: 1116px;
        max-width: calc(100vw - 40px);
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        gap: 72px;
        margin-bottom: 40px;

        .loading-image {
            margin-top: 40px;
            border-radius: 10px;
            background: #000;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 210px;
            height: 370px;
        }
    }
    .paginate {
        width: 1116px;
        max-width: calc(100vw - 40px);
        margin: auto;
        margin-bottom: 40px;

        ul[role="navigation"] {
            display: flex;
            justify-content: center;
            gap: 20px;
            li {
                cursor: pointer;
                font-weight: 600;
                &.disabled {
                    color: #555;
                }
                &.selected {
                    color: #ff6b00;
                }
            }
        }
    }
`;
