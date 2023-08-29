import { ToastContainer } from "react-toastify";
import {
    MovieDetail,
    ErrorPage,
    HomePage,
    Login,
    Movies,
    Register,
    TVShowDetail,
    TVShows,
} from "./pages";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components";
import { HomeProvider, MoviesProvider, TVShowsProvider } from "./store";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={
                            <HomeProvider>
                                <HomePage />
                            </HomeProvider>
                        }
                    />
                    <Route
                        path="movies"
                        element={
                            <MoviesProvider>
                                <Movies />
                            </MoviesProvider>
                        }
                    />
                    <Route path="movies/:id" element={<MovieDetail />} />
                    <Route
                        path="tv-shows"
                        element={
                            <TVShowsProvider>
                                <TVShows />
                            </TVShowsProvider>
                        }
                    />
                    <Route path="tv-shows/:id" element={<TVShowDetail />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>

            <ToastContainer />
        </>
    );
}

export default App;
