import {useState, useEffect, useContext, useMemo} from "react";
import SearchContext from "../../context/SearchProvider";
import Product from "../templates/Product";
import { useGetFavoritesQuery } from "../../features/auth/authApiSlice";
import {useSelector} from "react-redux";
import {selectSearchString} from "../../features/search/searchSlice";

const Favorites = () => {

    const reduxSearch = useSelector(selectSearchString);
    const { data, isError, isLoading, isSuccess, error } = useGetFavoritesQuery();

    const filteredMovies = useMemo(() => {
        if (!isSuccess || !data) {
            return []; // Return an empty array if data fetching failed or data is not available
        }

        if (reduxSearch.trim() === '') {
            return data; // Return all movies if search is empty
        }

        const filteredData = data.filter(movie =>
            movie.title.toLowerCase().includes(reduxSearch.toLowerCase())
        );
        return filteredData;
    }, [data, isSuccess, reduxSearch]);

    let content;
    if (isLoading) {
        content = <div>Loading...</div>;
    } else if (isSuccess) {
        content = (
            <div className="movie-container">
                <h2>Favorites</h2>
                <ul className="movie-list p-2">
                    {filteredMovies.map((movie, i) => (
                        <Product
                            title={movie.title}
                            thumbnail={movie.thumbnail}
                            price={"9.99$"}
                            extract={movie.extract}
                            key={i}
                            movie={{
                                title: movie.title,
                                thumbnail: movie.thumbnail,
                                cast: movie.cast,
                                extract: movie.extract,
                                genre: movie.genre,
                                year: movie.year
                            }}
                        />
                    ))}
                    {filteredMovies.length === 0 && <p>No movies</p>}
                </ul>
            </div>
        );
    } else if (isError) {
        content = <p>{JSON.stringify(error)}</p>;
    }

    return content;
};

export default Favorites;


// useEffect(() => {
//     if (isSuccess && data) {
//         if (search.trim() !== '') {
//             const filteredData = data.filter(movie =>
//                 movie.title.toLowerCase().includes(search.toLowerCase())
//             );
//             setFilteredMovies(filteredData);
//         } else {
//             setFilteredMovies(data);
//         }
//     }
// }, [search, isSuccess, data]);