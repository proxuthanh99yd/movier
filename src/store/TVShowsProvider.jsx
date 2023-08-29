import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";
import { fetchApi } from "../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const TVShowsContext = createContext();

TVShowsProvider.propTypes = {
    children: PropTypes.node,
};

export function TVShowsProvider({ children }) {
    const [input, setInput] = useState(() => ({
        sort: "popularity.desc",
        genres: "",
        date: "",
    }));
    const [forcePage, setForcePage] = useState(null);
    const { data: tvShows, isLoading: loadingTvShows } = useQuery({
        queryKey: [`tvShows`],
        queryFn: async () => {
            const tvShowsRes = await fetchApi(`/tv/popular?language=en&page=1`);
            return tvShowsRes.data;
        },
    });
    const { data: trend, isLoading: loadingTrend } = useQuery({
        queryKey: [`tvShows-trending`],
        queryFn: async () => {
            const tvShowsTrend = await fetchApi(
                `/trending/tv/day?language=en-US`
            );
            return tvShowsTrend.data.results;
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
            const tvShowsRes = await fetchApi(
                `/discover/tv?language=en${queryFilter}`
            );
            return tvShowsRes.data;
        },
        onSuccess: (data) => {
            queryClient.setQueryData(["tvShows"], data);
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
        <TVShowsContext.Provider
            value={{
                loadingTvShows,
                loadingTrend,
                trend,
                tvShows,
                forcePage,
                handlePageClick,
                input,
                setInput,
                handleFilter,
            }}
        >
            {children}
        </TVShowsContext.Provider>
    );
}

export const useTVShows = () => useContext(TVShowsContext);
