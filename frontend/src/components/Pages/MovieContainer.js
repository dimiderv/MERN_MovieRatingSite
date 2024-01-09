import { useEffect, useState,useContext } from 'react';
import Movie from '../notNeeded/Movie';
import '../movie.css';
import { useNavigate,useLocation } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import AuthContext from "../../context/AuthProvider";
import SearchContext from '../../context/SearchProvider';
import Product from "../templates/Product";
import ToastMessage from "../templates/ToastMessage";
// const data = require('../data/movies.json').slice(0,20).filter((movie)=>{
//   if(movie.thumbnail && movie.cast.length >0 && movie.thumbnail_height>360 && movie.thumbnail_width>240){
//     return movie
//   }});;
import {useToast} from "../../context/ToastContext";

const MovieContainer = () => {
  const { auth } = useContext(AuthContext);
  const [loadedGoals, setLoadedGoals] = useState([]);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const {search,setSearch} = useContext(SearchContext);
  const [filteredMovies, setFilteredMovies] = useState([])

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";
  const {toastMessages} = useToast()
  useEffect(function () {
    async function fetchData() {

      try {
        const response = await axiosPrivate.get('http://localhost/movies',{
          headers: {Authorization: `Bearer ${auth?.token}`}
        });
        const resData = response;
        setLoadedGoals(resData.data.movies);
        // setSearch(resData.data.movies);

      } catch (err) {
        setError(
          err.message ||
            'Fetching goals failed - the server responsed with an error.'
        );
        navigate(from, { state: { from: location }, replace: true });
      }

    }

     fetchData().then(); // promise is ignored. Might be wrong

  }, [auth, axiosPrivate]);

// Clears the filter option, when it first renders. Deletes previous inputs from other pages.
  useEffect(()=>{
    setSearch('')
  },[])

  useEffect(()=>{

    setFilteredMovies(loadedGoals.filter((movie) =>{
      if(search===""){
        return movie
      }else if (movie.title.toLowerCase().includes(search.toLowerCase())){
        return movie
      }

    }
    ))
  },[search,loadedGoals])

  async function addGoalHandler(movieTitle) {
    // setIsLoading(true);

    try {
      const response = await axiosPrivate.post('http://localhost/favorites',
        JSON.stringify({ 'title':movieTitle },
      {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
      }
  ))
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  // const logout = () => {
  //   // destroy the cookie
  //   cookies.remove("TOKEN", { path: "/" });
  //   // redirect user to the landing page
  //   window.location.href = "/";
  // }


  return (
      <div className="movie-container justify-content-center">

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
        <div style={{
          position: 'fixed',
          bottom: '0',
          right: '0',
          padding: '1rem', // Adjust padding as needed
          zIndex: 9999, // Make sure it's above other elements
        }}>
          {toastMessages.map((message, index) => (
              <ToastMessage key={index} index={index} test={{title: message}}/>
          ))}
        </div>
        {false && error}
      </div>

  );
};

export default MovieContainer;