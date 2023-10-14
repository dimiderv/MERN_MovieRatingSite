import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import Modal from "react-bootstrap/Modal";
// const genres = require('./data/genres.json')
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import Movie from "./Movie";
import MyModal from "./templates/MyModal";
import MyCarousel from "./templates/MyCarousel";
import SearchContext from "../context/SearchProvider";

const Favorites = ({ movie, addGoalHandler }) => {
  //   const { title, year, thumbnail, cast, genres } = movie;
  // const {auth} = useAuth();
  // const token=cookies.get("TOKEN")
  //  const { auth } = useContext(AuthContext);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [active, setActive] = useState(false);
  const [loadedGoals, setLoadedGoals] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([])
  const {search,setSearch} = useContext(SearchContext);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  // const from = location.state?.from?.pathname || "/login";
  const from = '/login'
  useEffect(function () {
    const controller = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/favorites", {
          signal: controller.signal,
        });

        const resData = response;

        isMounted && setLoadedGoals(resData.data);
      } catch (err) {
        console.log(err);
        // setError(
        //   err.message ||
        //     "Fetching goals failed - the server responsed with an error."
        // );
        navigate(from, { state: { from: location }, replace: true });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);


// Clears the filter option, when it first renders. Deletes previous inputs from other pages. 
  useEffect(()=>{
    setSearch('')
  },[])
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

  function handleModal() {
    setActive(!active);
  }

  return  !loadedGoals.length ? (
    <div>Nothing happened</div>
  ) : (
    <div className="movie-container">
      <h2>Favorites</h2> 
           
      <ul className ="movie-list p-2">
        {filteredMovies.map((movie,i) => (
          <Movie movie={movie} key={i} addGoalHandler={()=>{}}/>
        ))}
      </ul> 
        {/* <MyCarousel /> */}
    </div>
  );
};

export default Favorites;

{/* <Card style={{ width: "18rem", margin: "10px" }}>
<Card.Img variant="top" src={""} alt={"ds"} width={259} height={380} />
<Card.Body>
  <Card.Title>{loadedGoals[0].year}</Card.Title>
  <Card.Title>{loadedGoals[1].extract}</Card.Title>
</Card.Body>
<Card.Footer>
  <Row>
    <Button
      className="lml-auto"
      variant="primary"
      type="submit"
      value="Send"
      onClick={() => addGoalHandler("title")}
    >
      Post
    </Button>
    <Button
      className="ml-auto"
      variant="primary"
      type="submit"
      value="Send"
      onClick={handleModal}
    >
      More
    </Button>
  </Row>
</Card.Footer>
</Card> */}