import React, { useEffect } from 'react'
import {ToastContainer,toast,Bounce} from 'react-toastify'
let toastId = null; 
const InfoMessage = ({showToast,msg,type}) => {
  
    const notify=()=>{
      if (!toast.isActive(toastId)){
        toastId =toast[type](msg, {
                position: "bottom-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
    }
  }
    useEffect(()=>{
        if(showToast)
        {
            notify()
        }
    })
  return (
    <ToastContainer/>
  )
}

export default InfoMessage