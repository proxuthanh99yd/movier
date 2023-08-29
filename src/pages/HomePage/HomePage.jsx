import { Carousel, HeroCarousel, Loading } from "../../components";
import { useHome } from "../../store";

function HomePage() {
    const { isLoading, data } = useHome();
    if (isLoading) {
        return <Loading />;
    }

    const { movies, tv, genres } = data || {};
    return (
        <>
            <div className="over-lay"></div>
            <HeroCarousel data={movies} genres={genres} />
            <Carousel data={movies} title={"Movies"} link="movies" />
            <Carousel data={tv} title={"TV Shows"} link="tv-shows" />
        </>
    );
}

export default HomePage;
