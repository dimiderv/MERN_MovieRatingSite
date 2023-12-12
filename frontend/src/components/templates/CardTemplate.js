import { Card, Button } from "react-bootstrap"
import { Link } from "react-router-dom";
export default function CardTemplate  (props){



    return(
        <Card>     
            <Card.Header>{props.title} </Card.Header>
            <Card.Body>
                <Card.Text>
                    {props.bodyText}
                </Card.Text>
                <Link to={props.link}>{props.title}</Link>
            </Card.Body>
        </Card> 

    )   
}
