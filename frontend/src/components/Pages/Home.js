import { useEffect, useState, useContext, useMemo } from "react";
import Product from "../templates/Product";
import { useSelector } from "react-redux";
import { selectSearchString } from "../../features/search/searchSlice";
import TryCard from "../templates/TryCard";
import FilterMovies from "../templates/FilterMovies";

const Home = () => {
    const search = useSelector(selectSearchString);
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);

    // Fetch movies data and preprocess it
    useEffect(() => {
        const fetchData = async () => {
            try {
                const moviesData = require("../../data/movies.json")
                    .slice(1200, 1250)
                    .filter((movie) => (
                        movie.thumbnail &&
                        movie.cast.length > 0 &&
                        movie.thumbnail_height > 360 &&
                        movie.thumbnail_width > 240
                    ));
                setMovies(moviesData);
            } catch (error) {
                console.error("Error fetching movies data:", error);
            }
        };
        fetchData();
    }, []);

    // Update filteredMovies when search query changes
    useEffect(() => {
        if (!search) {
            setFilteredMovies([]);
            return;
        }

        const filteredData = movies.filter((movie) =>
            movie.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredMovies(filteredData);
    }, [search, movies]);

    // Memoize filteredMovies to prevent unnecessary recalculations
    const memoizedFilteredMovies = useMemo(() => filteredMovies, [filteredMovies]);

    return search ? (
        <div className="movie-container">
            <ul className="movie-list p-2">
                {memoizedFilteredMovies.map((movie, i) => (
                    <Product
                        title={movie.title}
                        thumbnail={movie.thumbnail}
                        price={"9.99$"}
                        extract={movie.extract}
                        key={movie.title}
                        movie={{
                            title: movie.title,
                            thumbnail: movie.thumbnail,
                            cast: movie.cast,
                            extract: movie.extract,
                            genre: movie.genres,
                            year: movie.year
                        }}
                    />
                ))}
            </ul>
        </div>
    ) : (
        <section>
            <div className="justify-content-center ">
                <TryCard headline="Newest" indexStart={1237} indexEnd={1247} />
            </div>
            <div className="justify-content-center ">
                <FilterMovies headline="Comedies" indexStart={270} indexEnd={300} genreFilter={"Comedy"} />
            </div>
            <div className="justify-content-center ">
                <TryCard headline="For you" indexStart={700} indexEnd={710} />
            </div>
            <div className="justify-content-center ">
                <TryCard headline="Most Popular" indexStart={200} indexEnd={210} />
            </div>
        </section>
    );
};

export default Home;
