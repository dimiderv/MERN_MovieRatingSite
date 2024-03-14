import React from 'react';
import { Col, Row, Toast} from "react-bootstrap";
import {useToast} from "../../context/ToastContext";
const ToastMessage = ({show,setShow,test, index}) => {

    //doesnt delete the index. Something isn't triggering the effect.
    const {hideToast  } = useToast();

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         hideToast(index);
    //     }, 2000); // Adjust the duration as needed
    //     console.log("heheh")
    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, []);


    // useEffect(() => {
    //     let timer;
    //     if (show) {
    //         timer = setTimeout(() => {
    //             setShow(false);
    //         }, 1000); // Adjust the duration as needed
    //     }
    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, [show, setShow]);
    // ReactDOM.createPortal(
    return (
        <div
            // style={{
            //     position: 'fixed',
            //     bottom: '0',
            //     right: '0',
            //     padding: '1rem', // Adjust padding as needed
            //     zIndex: 9999, // Make sure it's above other elements
            // }}
        >
            {/*// Was in Toast component show={show}*/}
            <Row>
                <Col xs={12}>
                    <Toast onClose={() => hideToast(index)}  animation={false} autohide >
                        <Toast.Header>


                            <strong className="mr-auto">Bootstrap</strong>
                            <small>{index}</small>

                        </Toast.Header>
                        <Toast.Body>{test.title}</Toast.Body>
                    </Toast>
                </Col>
                {/*<Col xs={6}>*/}
                {/*    /!*<Button onClick={() => setShow(true)}>Show Toast</Button>*!/*/}
                {/*</Col>*/}
            </Row>
        </div>)
    // ,document.body);
};

export default ToastMessage;