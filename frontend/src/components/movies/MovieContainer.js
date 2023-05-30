import { useEffect, useState } from 'react';

import Movie from './Movie';
import './movies.css';
import { movies } from '../../data/movies';
const data = require('../../data/movies-2010s.json').slice(0,100).filter((movie)=>{
  if(movie.thumbnail){
    return movie
  }});;


const MovieContainer = ({addGoalHandler}) => {



  // const [loadedGoals, setLoadedGoals] = useState([]);

  // useEffect(function () {
  //   async function fetchData() {
  

  //     try {
  //       const response = await fetch('http://localhost/goals');

  //       const resData = await response.json();

  //       if (!response.ok) {
  //         throw new Error(resData.message || 'Fetching the goals failed.');
  //       }

  //       setLoadedGoals(resData.goals.results);
  //     } catch (err) {
  //       console.log(err.message)
  //       // setError(
  //       //   err.message ||
  //       //     'Fetching goals failed - the server responsed with an error.'
  //       // );
  //     }

  //   }

  //   fetchData();
  // }, []);

  return(
    <div className="movie-container">
      <h2>Movies</h2>
      <ul className ="movie-list">
        {data.map(movie => (
          <Movie movie={movie} key={movie.title} addGoalHandler={addGoalHandler}/>
        ))}
      </ul>      
    </div>
  );
};

export default MovieContainer;