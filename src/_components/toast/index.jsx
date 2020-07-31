import React from "react";
import {toast} from "react-toastify";
import './toast.css';
import ToastErrors from "./components/ToastErrors";
import ToastSuccess from "./components/ToastSuccess";
toast.configure();

export const errors = (message) => {
  toast.error(<ToastErrors message={message} />, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose:5000,
    progressStyle:{
      backgroundColor:'#ff6d4a'
    },
    closeOnClick:false,
    closeButton:true
  });
};

export const success = (text) => {
  toast.success(<ToastSuccess text={text} />, {
    position: toast.POSITION.BOTTOM_LEFT,
    autoClose:5000,
    progressStyle:{
      backgroundColor:'#a6e50f'
    },
    closeOnClick:false,
    closeButton:true
  });
};