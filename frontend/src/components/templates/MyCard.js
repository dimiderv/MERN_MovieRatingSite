import { Card,Row,Button } from 'react-bootstrap'


function MyCard({addGoalHandler,handleModal,thumbnail,title}) {
  return (
    <Card  className="card" style={{ width: "18rem", margin: "10px"}}>
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
    <Card.Footer bg='Dark'>
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
  )
}

export default MyCard