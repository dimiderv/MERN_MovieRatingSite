import React, {useEffect, useState} from 'react';
import {Button, Col, Row, Toast} from "react-bootstrap";

const ToastMessage = ({show,setShow,test}) => {
    useEffect(() => {
        let timer;
        if (show) {
            timer = setTimeout(() => {
                setShow(false);
            }, 3000); // Adjust the duration as needed
        }
        return () => {
            clearTimeout(timer);
        };
    }, [show, setShow]);
    return (
        <div
            style={{
                position: 'fixed',
                bottom: '0',
                right: '0',
                padding: '1rem', // Adjust padding as needed
                zIndex: 9999, // Make sure it's above other elements
            }}
        >
            <Row>
                <Col xs={12}>
                    <Toast onClose={() => setShow(false)} show={show} animation={false}>
                        <Toast.Header>


                            <strong className="mr-auto">Bootstrap</strong>
                            <small>11 mins ago</small>

                        </Toast.Header>
                        <Toast.Body>{test.title}</Toast.Body>
                    </Toast>
                </Col>
                {/*<Col xs={6}>*/}
                {/*    /!*<Button onClick={() => setShow(true)}>Show Toast</Button>*!/*/}
                {/*</Col>*/}
            </Row>
        </div>
    );
};

export default ToastMessage;