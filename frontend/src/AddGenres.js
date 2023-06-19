import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import { useState,useEffect } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const data = require('./data/genres.json')

const token = cookies.get("TOKEN");
const AddGenres = ({ movie, addGoalHandler }) => {
//   const { title, year, thumbnail, cast, genres } = movie;
  const [active, setActive] = useState(false);
  const [loadedGoals, setLoadedGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost/genre',{
          headers: {Authorization: `Bearer ${token}`}
        });

        const resData = await response.json();

        if (!response.ok) {
          throw new Error(resData.message || 'Fetching the goals failed.');
        }
        console.log("This is the response data",resData.genres)
        setLoadedGoals(resData.genres);
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

  async function initGenre (data){

    for (var i=0; i<data.length;i++){
      const result = await addGoalHandler(data[i]);
    }
  }

  async function addGoalHandler(genre) {
    // setIsLoading(true);

    try {
      const response = await fetch('http://localhost:80/genre', {
        method: 'POST',
        body: JSON.stringify({
          name: genre,
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const resData = await response.json();
      // console.log(resData.movies)
      if (!response.ok) {
        alert(resData.message)
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

  function handleModal() {
    setActive(!active);
  }

  
  return isLoading ?(
    
    <div>
        <ul>
            {error}
        </ul>

    </div>
  ):!loadedGoals.length ?(<div>
    Hello mf 
    <Button onClick={()=> initGenre(data)}></Button>
  </div>): (
    <Card border='secondary'style={{ width: "18rem", margin: "10px" }}>
      <Card.Img
        variant="top"
        src={""}
        alt={'ds'}
        width={259}
        height={380}
      />
      <Card.Body>
        
        <Card.Title>{loadedGoals[5].name}</Card.Title>
        <ul>
            {loadedGoals.map((genre,i)=>{
              return <li key={i}> {genre.name}</li>
            })}
        </ul>
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
    </Card>
  );
};

export default AddGenres;
