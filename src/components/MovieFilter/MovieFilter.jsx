// import React from "react";
import PropTypes from "prop-types";

import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
import { fetchApi } from "../../axios";

MovieFilter.propTypes = {
    handleFilter: PropTypes.func,
    input: PropTypes.object,
    setInput: PropTypes.func,
};

function MovieFilter({ handleFilter, input, setInput }) {
    const { data, isLoading } = useQuery({
        queryKey: ["filter-with-genres"],
        queryFn: async () => {
            const res = await fetchApi("/genre/movie/list?language=en");
            return res.data.genres;
        },
    });
    const handleChange = (e) => {
        setInput((curr) => ({
            ...curr,
            [e.target.name]: e.target.value,
        }));
    };
    if (isLoading) {
        return <p>Loading...</p>;
    }
    const onFilter = (e) => {
        e.preventDefault();
        handleFilter();
    };
    return (
        <Wrapper>
            <div className="filter-container">
                <form onSubmit={onFilter}>
                    <select
                        value={input.sort}
                        onChange={handleChange}
                        name="sort"
                    >
                        <option value="popularity.desc">
                            Popularity Descending
                        </option>
                        <option value="popularity.asc">
                            Popularity Ascending
                        </option>
                        <option value="vote_average.desc">
                            Rating Descending
                        </option>
                        <option value="vote_average.asc">
                            Rating Ascending
                        </option>
                        <option value="primary_release_date.desc">
                            Release Date Descending
                        </option>
                        <option value="primary_release_date.asc">
                            Release Date Ascending
                        </option>
                    </select>
                    <select
                        value={input.genres}
                        onChange={handleChange}
                        name="genres"
                    >
                        <option value="">-- Genres --</option>

                        {data &&
                            data.map(({ id, name }) => (
                                <option value={id} key={id}>
                                    {name}
                                </option>
                            ))}
                    </select>
                    <select
                        value={input.date}
                        onChange={handleChange}
                        name="date"
                    >
                        <option value="">-- Release Date --</option>
                        {Array.from({ length: 25 }).map((_, i) => (
                            <option key={i} value={2023 - i}>
                                {2023 - i}
                            </option>
                        ))}
                    </select>
                    <button type="submit">Filter</button>
                </form>
            </div>
        </Wrapper>
    );
}

export default MovieFilter;
const Wrapper = styled.div`
    width: 1116px;
    max-width: calc(100vw - 40px);
    margin: 40px auto;
    border-radius: 10px;
    .filter-container {
        form {
            display: flex;
            justify-content: space-between;
            gap: 30px;
            select {
                color: #fff;
                background: #4d4d4d;
                flex: 1;
            }
            button {
                color: #fff;
                background: #4d4d4d;
                padding: 8px 24px;
            }
        }
    }
`;
