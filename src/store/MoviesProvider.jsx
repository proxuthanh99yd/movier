import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { fetchApi } from "../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const MoviesContext = createContext();

MoviesProvider.propTypes = {
    children: PropTypes.node,
};

export function MoviesProvider({ children }) {
    const [input, setInput] = useState(() => ({
        sort: "popularity.desc",
        genres: "",
        date: "",
    }));
    const [forcePage, setForcePage] = useState(null);
    const { data: movies, isLoading: loadingMovies } = useQuery({
        queryKey: [`movies`],
        queryFn: async () => {
            const moviesRes = await fetchApi(
                `/movie/popular?language=en&page=1`
            );
            return moviesRes.data;
        },
    });
    const { data: trend, isLoading: loadingTrend } = useQuery({
        queryKey: [`movies-trending`],
        queryFn: async () => {
            const moviesTrend = await fetchApi(
                `/trending/movie/day?language=en-US`
            );
            return moviesTrend.data.results;
        },
    });
    // Access the client
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: async ({ sort, genres, date, page = 1 }) => {
            let queryFilter = "";
            if (sort) {
                queryFilter += `&sort_by=${sort}`;
            }
            if (genres) {
                queryFilter += `&with_genres=${genres}`;
            }
            if (date) {
                queryFilter += `&primary_release_year=${date}`;
            }
            if (page) {
                queryFilter += `&page=${page}`;
            }
            const moviesRes = await fetchApi(
                `/discover/movie?language=en${queryFilter}`
            );
            return moviesRes.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["movies"], data);
        },
    });

    const handleFilter = () => {
        mutation.mutate(input);
        setForcePage(0);
    };
    const handlePageClick = (page) => {
        setForcePage(page.selected);
        mutation.mutate({ ...input, page: page.selected + 1 });
    };
    return (
        <MoviesContext.Provider
            value={{
                loadingMovies,
                loadingTrend,
                trend,
                movies,
                forcePage,
                handlePageClick,
                input,
                setInput,
                handleFilter,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
}

export const useMovies = () => useContext(MoviesContext);
