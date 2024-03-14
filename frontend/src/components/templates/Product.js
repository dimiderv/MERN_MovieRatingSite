import React, {useState} from "react";
import {Card, Button, Row,} from "react-bootstrap";
import MyModal from "./MyModal";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar, faHeart, faThumbsDown} from "@fortawesome/free-solid-svg-icons";
import {useToast} from "../../context/ToastContext";
import { useGetUserFavoritesMutation} from "../../features/auth/authApiSlice";

export default function Product(props) {
    // className="card" style={{ width: "18rem", margin: "10px"}}
    const [active, setActive] = useState(false);
    const [heartClicked, setHeartClicked] = useState(false);
    const [starClicked, setStarClicked] = useState(false);
    const [dislikeClicked, setDislikeClicked] = useState(false)
    const [getUserFavorites] = useGetUserFavoritesMutation()
    const {showToast} = useToast();
    function handleModal() {
        setActive(!active);
    }
    const addToFavorites = async () => {
        const apiCall = getUserFavorites({ 'title': props.movie.title }).unwrap()
        showToast(apiCall, `Added ${props.movie.title} to favorites`,'');
    };


    return active ? (
        <MyModal show={active} onHide={handleModal} movie={props.movie}/>
    ) : (
        <div>
            <Card>
                <Card.Img
                    variant="top"
                    src={props.thumbnail}
                    alt={props.title}
                    width={259}
                    height={380}
                    title={props.title}
                />

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
                                                 addToFavorites()
                                                 // setTimeout(()=>{
                                                 //     fetch('https://jsonplaceholder.typicode.com/todos/1')
                                                 //         .then(response => response.json())
                                                 //         .then(json => {
                                                 //             console.log(json);
                                                 //             setTest(json);
                                                 //             setShow(true)
                                                 //         })
                                                 // },1000)

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