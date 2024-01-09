// ToastContext.js
import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toastMessages, setToastMessages] = useState([]);

    const showToast =  async (promise, movie,errorMessage="This is an error") => {
        try {
            const response = await promise;
            const successMessage = await response.json(); // Assuming the success message is in the JSON response
            // const successMessage = "Stack "+ Math.random();
            setToastMessages((prevMessages) => [...prevMessages, movie]);
        } catch (error) {
            setToastMessages((prevMessages) => [...prevMessages, errorMessage]);
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
