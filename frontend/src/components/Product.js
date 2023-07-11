import React from "react";
import { Card,Button,Row } from "react-bootstrap";
import { useState } from "react";
import MyModal from "./templates/MyModal";
export default function Product(props) {
    // className="card" style={{ width: "18rem", margin: "10px"}}
    const [active, setActive] = useState(false);
  
    function handleModal() {
      setActive(!active);
    }
  
    return active ? (
      <MyModal show={active} onHide={handleModal} movie={props.movie} />
    ) : (
      // bg={'Dark'} style={{ width: "18rem", margin: "10px",background:'black'}}
<Card  >
    <Card.Img
      variant="top"
      src={props.thumbnail}
      alt={props.title}
      width={259}
      height={380}
    />
    {/* <Card.Body>
      <Card.Title>{title}</Card.Title>

      <Button style={{justifyContent:'left'}}variant="primary" type='submit' value="Send" onClick={()=>addGoalHandler(title)}>Post</Button>
        <Button className='ml-auto'style={{justifyContent:'right'}}variant="primary" type='submit' value="Send" onClick={()=>addGoalHandler(title)}>More</Button>
    </Card.Body> */}
    <Card.Footer bg='Dark'>
      <Row>
        <Button
          className="lml-auto"
          variant="primary"
          type="submit"
          value="Send"
          onClick={() => alert("HI")}
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

}
