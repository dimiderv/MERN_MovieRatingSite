import MovieAdd from './MovieAdd';
import '../movie.css';
import Cookies from "universal-cookie";
const jwt = require("jsonwebtoken");
const cookies = new Cookies();
const data = require('../../data/movies.json').slice(0,20).filter((movie)=>{
  if(movie.thumbnail && movie.cast.length >0 && movie.thumbnail_height>360 && movie.thumbnail_width>240){
    return movie
  }
  return ''});;

const token = cookies.get("TOKEN");
const AddMovies = () => {
  async function addGoalHandler(movie) {
    // setIsLoading(true);

    try {
      const response = await fetch('http://localhost:80/addmovie', {
        method: 'POST',
        body: JSON.stringify({
          movieData: movie,
        }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const resData = await response.json();
      // console.log(resData.movies)
      // if (!response.ok) {
      //   alert(resData.message)
      //   throw new Error(resData.message || 'Adding the goal failed.');
      // }
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

//   const logout = () => {
//     // destroy the cookie
//     cookies.remove("TOKEN", { path: "/" });
//     // redirect user to the landing page
//     window.location.href = "/";
//   }

  if(cookies.get("TOKEN")){
    const decodedToken = jwt.verify(cookies.get("TOKEN"),"RANDOM-TOKEN");
    console.log(decodedToken.userEmail)
  }

  return(
      <div className="movie-container">
        <h2>Movies</h2>
        <ul className ="movie-list">
          {data.map(movie => (
              <MovieAdd movie={movie} key={movie.title} addGoalHandler={addGoalHandler}/>
          ))}
        </ul>
        {/* <Button type="submit" variant="danger" onClick={() => logout()}>
        Logout
      </Button>      */}
      </div>
  );
};

export default AddMovies;