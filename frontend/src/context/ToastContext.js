// ToastContext.js
import { createContext, useContext, useState } from 'react';

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
    const [toastMessages, setToastMessages] = useState([]);

    const showToast =  async (promise, movie,errorMessage) => {
        console.log(promise)
        try {
            const response = await promise;
            const successMessage =  response; // Assuming the success message is in the JSON response
            // console.log(successMessage.data)
            // const successMessage = "Stack "+ Math.random();
            setToastMessages((prevMessages) => [...prevMessages, successMessage.data.message]);
        } catch (error) {
            // console.log(error.response.data.message)
            setToastMessages((prevMessages) => [...prevMessages, error.response.data.message]);
        }
    };

    const hideToast = (index) => {
        setToastMessages((prevMessages) => prevMessages.filter((_, i) => i !== index));
    };

    return (
        <ToastContext.Provider value={{ toastMessages, showToast, hideToast }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
