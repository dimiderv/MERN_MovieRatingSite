import {useMemo} from 'react';
import '../movie.css';
import Product from "../templates/Product";
// const data = require('../data/movies.json').slice(0,20).filter((movie)=>{
//   if(movie.thumbnail && movie.cast.length >0 && movie.thumbnail_height>360 && movie.thumbnail_width>240){
//     return movie
//   }});;
import {useToast} from "../../context/ToastContext";
import ToastMsgContainer from "../ToastMsgContainer";
import {useSelector} from "react-redux";
import {selectCurrentToken} from "../../features/auth/authSlice";
import {selectSearchString} from "../../features/search/searchSlice";
import {useGetMoviesQuery} from "../../features/auth/authApiSlice";
import Loading from "../Loading";

const MovieContainer = () => {

  const reduxSearch = useSelector(selectSearchString);
  const {data, isError, isLoading, isSuccess, error} = useGetMoviesQuery();

  const filteredMovies = useMemo(() => {
    if (!isSuccess || !data || !data.movies) {
      return []; // Return an empty array if data fetching failed or data is not available
    }

    if (reduxSearch.trim() === '') {
      return data.movies; // Return all movies if search is empty
    }



    return data.movies.filter(
        movie => movie.title
            .toLowerCase()
            .includes(reduxSearch.toLowerCase())
    );
  }, [data, isSuccess, reduxSearch]);



  let content;
  if (isLoading) {
    content = <div className="movie-container justify-content-center">
      <div className="movie-list mt-6">
        <Loading/>
      </div>
    </div>

      } else if (isSuccess) {
        content = <div className="movie-container justify-content-center">

      <h2>Movies</h2>
      {/* <GridExample/>     */}
      <ul className="movie-list p-2">
        {filteredMovies.map((movie, i) => (
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
                  genre: movie.genre,
                  year: movie.year
                }}
            />
        ))}
      </ul>
    </div>
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;

};

export default MovieContainer;