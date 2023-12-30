import React from "react";
import {Card, Button, Row} from "react-bootstrap";
import {useState} from "react";
import MyModal from "./templates/MyModal";
import * as Icon from "react-bootstrap-icons";
import {faTwitter} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faHeart, faThumbsDown} from "@fortawesome/free-solid-svg-icons";

export default function Product(props) {
    // className="card" style={{ width: "18rem", margin: "10px"}}
    const [active, setActive] = useState(false);
    const [style, setStyle] = useState(false)

    function handleModal() {
        setActive(!active);
    }

    return active ? (
        <MyModal show={active} onHide={handleModal} movie={props.movie}/>
    ) : (
        // bg={'Dark'} style={{ width: "18rem", margin: "10px",background:'black'}}
        <Card>
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
            <Card.Body className={"favBody "}>


                <Row>
                    <div className={"col-auto"}>
                        <Button
                            size="sm"
                            variant="primary"
                            type="submit"
                            value="Send"
                            onClick={() => setActive(!active)}
                            // className={"align-items-start"}
                        >More
                        </Button>
                    </div>
                    <div className={"col-0"}></div>

                    <div className={"col-auto"}>

                        <FontAwesomeIcon icon={faHeart} className={!style ? 'favHeart m-2' : 'favHeartLike m-2'}
                                         onClick={() => setStyle(!style)} size="xl" title={"Add to Favorites"}/>

                        <FontAwesomeIcon icon={faStar} className={!style ? 'star m-2' : 'starClicked m-2'}
                                         onClick={() => setStyle(!style)} size="xl" title={"Star"}/>
                        <FontAwesomeIcon icon={faThumbsDown} className={!style ? 'dislike m-2' : 'dislikeClicked m-2'}
                                         onClick={() => setStyle(!style)} size="xl"/>
                    </div>
                </Row>


            </Card.Body>

        </Card>
    );

}


/* If I want to put it on the image
*
*             <div style={{ position: 'relative' }}>
                <Card.Img
                    variant="top"
                    src={props.thumbnail}
                    alt={props.title}
                    width={259}
                    height={380}
                />

                <FontAwesomeIcon
                    icon={faHeart}
                    className={!style ? 'favButton' : 'favB'}
                    onClick={() => setStyle(!style)}
                    size="xl"
                />
            </div>
* */

/*
* If i want to put them in the footer
*     <Card.Footer className={"favBody "} bg='Dark'>
      <Row>
          <div className={"col-auto"}>
                <Button
                size="sm"
                variant="primary"
                type="submit"
                value="Send"
                onClick={() => setActive(!active)}
                // className={"align-items-start"}
            >More
            </Button>
          </div>
          <div className={"col-0"}></div>

          <div className={"col-auto"}>

            <FontAwesomeIcon icon={faHeart} className={!style? 'favButton m-2':'favB m-2'} onClick={()=>setStyle(!style)} size="xl" />
            <FontAwesomeIcon icon={faStar} className={!style? 'favButton m-2':'favB m-2'} onClick={()=>setStyle(!style)} size="xl" />
              <FontAwesomeIcon icon={faStar} className={!style? 'favButton m-2':'favB m-2'} onClick={()=>setStyle(!style)} size="xl" />
          </div>
      </Row>
    </Card.Footer>
    *
    * */