import { Card } from "react-bootstrap"
import { Link } from "react-router-dom";
import React from "react";
export default function CardTemplate  (props){
    const header = {
        background: "white",
        fontSize:"1.2rem",
        color:"red"
    }


    return(
        <Card>     
            <Card.Header  style={header}>{props.title} </Card.Header>
            <Card.Img
                variant="top"
                src={props.thumbnail}
                alt={props.title}
                width='100%'
                height={200}
            />
            <Card.Body>
                <Card.Text>
                    {props.bodyText}
                </Card.Text>
                <Link to={props.link}>{props.title}</Link>
            </Card.Body>
        </Card> 

    )   
}
