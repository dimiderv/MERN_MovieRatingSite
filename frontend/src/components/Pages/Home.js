import { useNavigate,useLocation } from "react-router-dom";
import FilterMovies from "../templates/FilterMovies";
import TryCard from "../templates/TryCard";
import useLogout from "../../hooks/useLogout";
import SearchContext from "../../context/SearchProvider";
import { useEffect,useState,useContext } from "react";
import Product from "../templates/Product";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AuthContext from "../../context/AuthProvider";
import ToastMessage from "../templates/ToastMessage";
import {useToast} from "../../context/ToastContext";
import ToastMsgContainer from "../ToastMsgContainer";
const Home = () => {
  const { toastMessages } = useToast();
  const navigate = useNavigate();
  const logout = useLogout();
  const {search,setSearch} = useContext(SearchContext);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const movies = require("../../data/movies.json")
  .slice(1200, 1250)
  .filter((movie) => {
    if (
      movie.thumbnail &&
      movie.cast.length > 0 &&
      movie.thumbnail_height > 360 &&
      movie.thumbnail_width > 240 
    ) {
      return movie;
    }
    return "";
  });
  const { auth } = useContext(AuthContext);
  // const signOut = async () => {
  //   // if used in more components, this should be in context
  //   // axios to /logout endpoint
  //   await logout();
  //   navigate("/linkpage");
  // };
  const axiosPrivate = useAxiosPrivate();


  const location = useLocation();
  const from = location.state?.from?.pathname || "/login";
  useEffect(function () {
    async function fetchData() {

      try {
        const response = await axiosPrivate.get('http://localhost/movies',{
          headers: {Authorization: `Bearer ${auth?.token}`}
        });
        const resData = response;
        // setLoadedGoals(resData.data.movies);
        // setSearch(resData.data.movies);

      } catch (err) {
        // setError(
        //   err.message ||
        //     'Fetching goals failed - the server responsed with an error.'
        // );
        navigate(from, { state: { from: location }, replace: true });
      }
      
    }

    fetchData();
    // console.log(auth)
  }, [auth, axiosPrivate]);
  
  // Clears the filter option, when it first renders. Deletes previous inputs from other pages. 
  useEffect(()=>{
    setSearch('')
  },[])
  useEffect(()=>{
    
    setFilteredMovies(movies.filter((movie)=>{
      if(search===""){
        return movie
      }else if(movie.title.toLowerCase().includes(search.toLowerCase())){
        return movie
      }

    }
    ))
  },[search])
  

  return search ?
  (
    
    <div className="movie-container">
      {/* <h2>Search results</h2>  */}
           
      <ul className ="movie-list p-2">
        {filteredMovies.map((movie,i) => (
              <Product
              title={movie.title}
              thumbnail={movie.thumbnail}
              price={"9.99$"}
              extract={movie.extract}
              key={movie.title}
              movie ={{
                title : movie.title,
                thumbnail:movie.thumbnail,
                cast: movie.cast,
                extract: movie.extract,
                genre: movie.genres, 
                year: movie.year
              }}
            />
        ))}
      </ul> 
        {/* <MyCarousel /> */}
    </div>
    
  )
  :(
          <section>


            <div className="justify-content-center ">
              <TryCard headline="Newest" indexStart={1237} indexEnd={1247}/>

            </div>
            <div className="justify-content-center ">
              <FilterMovies
                  headline="Comedies"
                  indexStart={270}
                  indexEnd={300}
                  genreFilter={"Comedy"}
              />
            </div>
            <div className="justify-content-center ">
              <TryCard headline="For you" indexStart={700} indexEnd={710}/>
            </div>
            <div className="justify-content-center ">
              <TryCard headline="Most Popular" indexStart={200} indexEnd={210}/>
            </div>

            {/* <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/auth">Go to the Movies page</Link>
      <br />
      <a href="/favorites">Press here to check if thats the mistake</a>
      <Link to="/favorites">Go to the Favorites</Link>
      <br />
      <Link to="/addmovies">Go to the AddMovies</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={signOut}>Sign Out</button>
      </div> */}
          </section>
      );
};

export default Home;
