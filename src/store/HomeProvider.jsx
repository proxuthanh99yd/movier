import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { fetchApi } from "../axios";
import { useQuery } from "@tanstack/react-query";
const HomeContext = createContext();

HomeProvider.propTypes = {
    children: PropTypes.node,
};

export function HomeProvider({ children }) {
    const { data, isLoading } = useQuery({
        queryKey: ["home-movies"],
        queryFn: async () => {
            const { data: movies } = await fetchApi(
                "/trending/movie/day?language=en-US"
            );
            const { data: tv } = await fetchApi(
                "/trending/tv/day?language=en-US"
            );
            const { data: genres } = await fetchApi(
                "/genre/movie/list?language=en"
            );
            const response = {
                movies: movies.results,
                tv: tv.results,
                genres: genres.genres,
            };
            return response;
        },
    });
    return (
        <HomeContext.Provider
            value={{
                data,
                isLoading,
            }}
        >
            {children}
        </HomeContext.Provider>
    );
}

export const useHome = () => useContext(HomeContext);
