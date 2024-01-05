import React from "react"
import Social from "./Social";
import {Row} from "react-bootstrap";

const Footer = () =>

    <Row className="justify-content-md-center">
        <footer className="page-footer font-small blue pt-4">
            <Social/>
        </footer>
    </Row>

export default Footer