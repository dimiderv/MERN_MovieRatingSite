import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
// const genres = require('./data/genres.json')
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

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
          alt=""
          src={thumbnail}
          style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
        />
        <h4>Genres: {genres}</h4>
        <p>
          {year} {extract}
        </p>
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
  // const {auth} = useAuth();
  // const token=cookies.get("TOKEN")
  //  const { auth } = useContext(AuthContext);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
  const [active, setActive] = useState(false);
  const [loadedGoals, setLoadedGoals] = useState([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(function () {
    const controller = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get("/movies", {
          signal: controller.signal,
        });

        const resData = response;

        isMounted && setLoadedGoals(resData.data.movies);
      } catch (err) {
        console.log(err);
        // setError(
        //   err.message ||
        //     "Fetching goals failed - the server responsed with an error."
        // );
        navigate("/login", { state: { from: location }, replace: true });
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, location, navigate]);

  function handleModal() {
    setActive(!active);
  }

  return active ? (
    <MyVerticallyCenteredModal
      show={active}
      onHide={handleModal}
      //   movie={movie}
    />
  ) : !loadedGoals.length ? (
    <div>Nothing happened</div>
  ) : (
    <Card style={{ width: "18rem", margin: "10px" }}>
      <Card.Img variant="top" src={""} alt={"ds"} width={259} height={380} />
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
