import FilterMovies from "../templates/FilterMovies";
import TryCard from "../templates/TryCard";
import SearchContext from "../../context/SearchProvider";
import { useEffect,useState,useContext } from "react";
import Product from "../templates/Product";
// import {useToast} from "../../context/ToastContext";
// import { useNavigate,useLocation } from "react-router-dom";
// import useAxiosPrivate from "../../hooks/useAxiosPrivate";
// import AuthContext from "../../context/AuthProvider";
// import ToastMessage from "../templates/ToastMessage";
// import ToastMsgContainer from "../ToastMsgContainer";
// import {useSelector} from "react-redux";
// import {selectCurrentToken, selectCurrentUser} from "../../features/auth/authSlice";
// import useLogout from "../../hooks/useLogout";

const Home = () => {
  // const { toastMessages } = useToast();
  // const navigate = useNavigate();
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


  // const { auth } = useContext(AuthContext);
  // const axiosPrivate = useAxiosPrivate();
  // const token = useSelector(selectCurrentToken)
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/login";
  // const username = useSelector(selectCurrentUser)


  // useEffect(function () {
  //   async function fetchData() {
  //
  //     try {
  //       const response = await axiosPrivate.get('http://localhost/movies',{
  //         headers: {Authorization: `Bearer ${token}`}
  //       });
  //       const resData = response;
  //       // setLoadedGoals(resData.data.movies);
  //       // setSearch(resData.data.movies);
  //
  //     } catch (err) {
  //       // setError(
  //       //   err.message ||
  //       //     'Fetching goals failed - the server responsed with an error.'
  //       // );
  //       navigate(from, { state: { from: location }, replace: true });
  //     }
  //
  //   }
  //
  //   fetchData();
  //   console.log(auth)
  // }, [auth, axiosPrivate]);
  
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

            {/*<p style={{color:'white'}}>{username}{token}</p>*/}
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
          </section>
      );
};

export default Home;
