import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import { useState,useEffect } from "react";




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
        const response = await fetch('http://localhost/genre');

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
