import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Row } from "react-bootstrap";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";


function MyVerticallyCenteredModal(props) {
  const { title, year, thumbnail, cast, genre, extract } = props.movie;
  let genres='';
  for(var i=0; i<genre.length;i++){
    if(i+1===genre.length){
      genres+=genre[i].name+'.'
    }else{
      genres+= genre[i].name+', '
    }
  }
  return (
    <Modal
      animation={false}
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
        <p>{year} {extract}</p>
        <p>{cast}</p>
        <p></p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const Movie = ({ movie, addGoalHandler }) => {
  const { title, thumbnail,  } = movie;
  const [active, setActive] = useState(false);

  function handleModal() {
    setActive(!active);
  }

  return active ? (
    <MyVerticallyCenteredModal
      show={active}
      onHide={handleModal}
      movie={movie}
    />
  ) : (
    <Card className="cards" style={{ width: "18rem", margin: "10px" }}>
      <Card.Img
        variant="top"
        src={thumbnail}
        alt={title}
        width={259}
        height={380}
      />
      {/* <Card.Body>
        <Card.Title>{title}</Card.Title>

        <Button style={{justifyContent:'left'}}variant="primary" type='submit' value="Send" onClick={()=>addGoalHandler(title)}>Post</Button>
          <Button className='ml-auto'style={{justifyContent:'right'}}variant="primary" type='submit' value="Send" onClick={()=>addGoalHandler(title)}>More</Button>
      </Card.Body> */}
      <Card.Footer>
        <Row>
          <Button
            className="lml-auto"
            variant="primary"
            type="submit"
            value="Send"
            onClick={() => addGoalHandler(title)}
          >
            Favorites
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

export default Movie;
