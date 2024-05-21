import React from 'react';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const notify = (type:String, message:String) => {

    type === 'success' && toast.success(message, {
        position: "top-center",
        autoClose: 5000
    });

    type === 'error' && toast.error(message, {
        position: "top-center",
        autoClose: 5000
    });

    type === 'warn' && toast.warn(message, {
        position: "top-center",
        autoClose: 5000
    });
};

export default notify;