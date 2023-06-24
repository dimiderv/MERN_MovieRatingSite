import { useEffect, useState,useContext } from 'react';
import Movie from './Movie';
import './movie.css';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import AuthContext from "../context/AuthProvider";
// const data = require('../data/movies.json').slice(0,20).filter((movie)=>{
//   if(movie.thumbnail && movie.cast.length >0 && movie.thumbnail_height>360 && movie.thumbnail_width>240){
//     return movie
//   }});;




const MovieContainer = () => {
  const { auth } = useContext(AuthContext);
  const [loadedGoals, setLoadedGoals] = useState([]);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  
  useEffect(function () {
    async function fetchData() {

      try {
        const response = await axiosPrivate.get('http://localhost/movies',{
          headers: {Authorization: `Bearer ${auth?.token}`}
        });
        const resData = response;
        setLoadedGoals(resData.data.movies);

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


  async function addGoalHandler(goalText) {
    // setIsLoading(true);

    try {
      const response = await fetch('http://localhost/goals', {
        method: 'POST',
        body: JSON.stringify({
          text: goalText,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const resData = await response.json();
      // console.log(resData.movies)
      if (!response.ok) {
        throw new Error(resData.message || 'Adding the goal failed.');
      }
      // console.log(resData)
      // setLoadedGoals(resData.movies.results.map((a)=>  
      // a.title));

    } catch (err) {
      console.log(err)
      // setError(
      //   err.message ||
      //     'Adding a goal failed - the server responsed with an error.'
      // );
    }
    // setIsLoading(false);
  }

  // const logout = () => {
  //   // destroy the cookie
  //   cookies.remove("TOKEN", { path: "/" });
  //   // redirect user to the landing page
  //   window.location.href = "/";
  // }



  return(
    <div className="movie-container">
      <h2>Movies</h2>      
      <ul className ="movie-list">
        {loadedGoals.map((movie,i) => (
          <Movie movie={movie} key={i} addGoalHandler={addGoalHandler}/>
        ))}
      </ul> 

      {false && error}
    </div>
  );
};

export default MovieContainer;