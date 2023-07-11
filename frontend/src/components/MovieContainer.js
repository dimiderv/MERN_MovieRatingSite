import { useEffect, useState,useContext } from 'react';
import Movie from './Movie';
import './movie.css';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import AuthContext from "../context/AuthProvider";
import SearchContext from '../context/SearchProvider';
// const data = require('../data/movies.json').slice(0,20).filter((movie)=>{
//   if(movie.thumbnail && movie.cast.length >0 && movie.thumbnail_height>360 && movie.thumbnail_width>240){
//     return movie
//   }});;
import GridExample from './GridExample';
import TryCard from './TryCard';
import MostPopular from './MostPopular';


const MovieContainer = () => {
  const { auth } = useContext(AuthContext);
  const [loadedGoals, setLoadedGoals] = useState([]);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const {search,setSearch} = useContext(SearchContext);
  const [filteredMovies, setFilteredMovies] = useState([])
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
      }
      
    }

    fetchData();
    console.log(auth)
  }, [auth, axiosPrivate]);

  useEffect(()=>{

    setFilteredMovies(loadedGoals.filter((movie) =>{
      if(search==""){
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

  

  return(
    <div className="movie-container justify-content-center">

      <h2>Movies</h2>  
      {/* <GridExample/>     */}
      <ul className ="movie-list p-2">
        {filteredMovies.map((movie,i) => (
          <Movie movie={movie} key={i} addGoalHandler={addGoalHandler}/>
        ))}
      </ul> 

      {false && error}
    </div>
  );
};

export default MovieContainer;