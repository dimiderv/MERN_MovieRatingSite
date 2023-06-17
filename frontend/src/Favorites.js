import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import { useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// const genres = require('./data/genres.json')

function MyVerticallyCenteredModal(props) {
  const { title, year, thumbnail, cast, genres, extract } = props.movie;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            textAlign: "center",
            marginLeft: "auto%",
            marginRight: "auto",
          }}
          id="contained-modal-title-vcenter"
        >
          {title}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
      >
        <img
          alt=''
          src={thumbnail}
          style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        />
        <h4>Genres: {genres}</h4>
        <p>{year} {extract}</p>
        <p>{cast}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Favorites = ({ movie, addGoalHandler }) => {
//   const { title, year, thumbnail, cast, genres } = movie;
  const [active, setActive] = useState(false);
  const [loadedGoals, setLoadedGoals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  //console.log(isLoading,error)
  useEffect(function () {
    async function fetchData() {
      setIsLoading(true);

      try {
        const response = await fetch('http://localhost/movies');

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


  function handleModal() {
    setActive(!active);
  }

  return active ? (
    <MyVerticallyCenteredModal
      show={active}
      onHide={handleModal}
    //   movie={movie}
    />
  ) :! loadedGoals.length?(
    <div>
        Nothing happened
    </div>
  ): (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img
        variant="top"
        src={""}
        alt={'ds'}
        width={259}
        height={380}
      />
      <Card.Body>

        <Card.Title>{loadedGoals[0].year}</Card.Title>
        <Card.Title>{loadedGoals[0].extract}</Card.Title>
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

export default Favorites;
