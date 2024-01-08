import React, {useState} from "react";
import {Card, Button, Row, Toast, Col} from "react-bootstrap";
import MyModal from "./MyModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faHeart, faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import ToastMessage from "./ToastMessage";
export default function Product(props) {
    // className="card" style={{ width: "18rem", margin: "10px"}}
    const [active, setActive] = useState(false);
    const [heartClicked, setHeartClicked] = useState(false);
    const [starClicked, setStarClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false)
    const [show, setShow] = useState(false)
        const [test, setTest] = useState([])
    function handleModal() {
        setActive(!active);
    }

    return active ? (
        <MyModal show={active} onHide={handleModal} movie={props.movie}/>
    ) : (
        // bg={'Dark'} style={{ width: "18rem", margin: "10px",background:'black'}}
        <div>
            {/*I have to fix this error, message looks fine for now, the idea is looking good*/}
            <ToastMessage setShow={setShow} show={show} test={test}/>
            <Card>
                <Card.Img
                    variant="top"
                    src={props.thumbnail}
                    alt={props.title}
                    width={259}
                    height={380}
                    title={props.title}
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
                                title={"Click for more information"}
                            >More
                            </Button>
                        </div>
                        <div className={"col-0"}></div>

                        <div className={"col-auto"}>

                            <FontAwesomeIcon icon={faHeart}
                                             className={!heartClicked ? 'favHeart m-2' : 'favHeartLike m-2'}
                                             onClick={() => {

                                                 setTimeout(()=>{
                                                     fetch('https://jsonplaceholder.typicode.com/todos/1')
                                                         .then(response => response.json())
                                                         .then(json => {
                                                             console.log(json);
                                                             setTest(json);
                                                             setShow(true)
                                                         })
                                                 },1000)

                                                 setHeartClicked(!heartClicked)
                                             }} size="xl"/>

                            <FontAwesomeIcon icon={faStar} className={!starClicked ? 'star m-2' : 'starClicked m-2'}
                                             onClick={() => setStarClicked(!starClicked)} size="xl" title={"Star"}/>
                            <FontAwesomeIcon icon={faThumbsDown}
                                             className={!dislikeClicked ? 'dislike m-2' : 'dislikeClicked m-2'}
                                             onClick={() => setDislikeClicked(!dislikeClicked)} size="xl"
                                             title={"Dislike"}/>
                        </div>
                    </Row>


                </Card.Body>

            </Card>
        </div>
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
* If I want to put them in the footer
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