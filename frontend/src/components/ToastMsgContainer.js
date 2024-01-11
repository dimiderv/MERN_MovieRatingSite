import React, {useEffect, useState} from 'react';
import {useToast} from "../context/ToastContext";
import ToastMessage from "./templates/ToastMessage";

const ToastMsgContainer = () => {
    const {toastMessages, hideToast} = useToast();
    const [toastContainer, setToastContainer] = useState([]);



    useEffect(() => {
        setToastContainer(toastMessages);

        // Automatically remove the first toast after 3000 milliseconds (3 seconds)
        if (toastMessages.length > 0) {
            const timer = setTimeout(() => {
                hideToast(0);
            }, 2000);

            // Clean up the timer when the component unmounts or when toastMessages change
            return () => clearTimeout(timer);
        }
    }, [toastMessages, hideToast]);


    return (
        <div style={{
            position: 'fixed',
            bottom: '0',
            right: '0',
            padding: '1rem', // Adjust padding as needed
            zIndex: 9999, // Make sure it's above other elements
        }}>
            {toastContainer.map((message, index) => (
                <ToastMessage key={index} index={index} test={{title: message}}/>
            ))}
        </div>
    );
};

export default ToastMsgContainer;