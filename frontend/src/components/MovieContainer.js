import { useEffect, useState } from 'react';
import Movie from './Movie';
import './movie.css';
import Cookies from "universal-cookie";
const jwt = require("jsonwebtoken");
  const cookies = new Cookies();
// const data = require('../data/movies.json').slice(0,20).filter((movie)=>{
//   if(movie.thumbnail && movie.cast.length >0 && movie.thumbnail_height>360 && movie.thumbnail_width>240){
//     return movie
//   }});;

const token = cookies.get("TOKEN");
const MovieContainer = () => {
  const [active, setActive] = useState(false);
  const [loadedGoals, setLoadedGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  // console.log(active,isLoading,error)
  // setActive(active)
  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost/movies',{
          headers: {Authorization: `Bearer ${token}`}
        });

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Fetching the goals failed.');
        }
        console.log(resData.movies)
        setLoadedGoals(resData.movies);
      } catch (err) {
        setError(
          err.message ||
            'Fetching goals failed - the server responsed with an error.'
        );
      }
      setIsLoading(false);
    }

    fetchData();
  }, []);


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

if(cookies.get("TOKEN")){
  const decodedToken = jwt.verify(cookies.get("TOKEN"),"RANDOM-TOKEN");
console.log(decodedToken.userEmail)
}

  return(
    <div className="movie-container">
      <h2>Movies</h2>
      <ul className ="movie-list">
        {loadedGoals.map((movie,i) => (
          <Movie movie={movie} key={i} addGoalHandler={addGoalHandler}/>
        ))}
      </ul> 
      {/* <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>      */}
    </div>
  );
};

export default MovieContainer;