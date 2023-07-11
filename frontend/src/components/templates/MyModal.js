
import { Modal,Button } from "react-bootstrap";

function MyModal(props) {
    const { title, year, thumbnail, cast, genre, extract } = props.movie;
    let genres='';
    console.log(props.movie.genre)
    if(genre[0].name){
      for(var i=0; i<genre.length;i++){
        if(i+1===genre.length){
          genres+=genre[i]?.name+'.'
        }else{
          genres+= genre[i]?.name+', '
        }
      }
    }else{
      for(var i=0; i<genre.length;i++){
        if(i+1===genre.length){
          genres+=genre[i]+'.'
        }else{
          genres+= genre[i]+', '
        }
      }
    }

    return (
      <Modal
        animation={false}
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ background: "rgba(0, 0, 0, 0.5)" ,color: "white"}}
        className="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title
            style={{
              textAlign: "center",
              marginLeft: "auto%",
              marginRight: "auto",
              color: "white"
              
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
  
  export default MyModal