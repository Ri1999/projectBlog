// import React from 'react'
// import { useState } from "react"
// import { useForm } from "react-hook-form"
import {toast} from "react-toastify"
// import Input from "../../Input"
// import { Link } from "react-router-dom"
// import { FcSurvey } from "react-icons/fc";
import { FaCopy } from "react-icons/fa";
import "./info.css"

const ContactUs = () => {

    // const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const [loading, setLoading] = useState(false);

    const adminEmail = "patraarittik1999@gmail.com"

    const copyToClip = ()=>{
        navigator.clipboard.writeText(adminEmail)
        toast.success("Email copied to clipboard ")
    }

    

  return (
    <div className="container" >
        <h1>Don't be a Ghost Reader </h1>
        <div className="content">
            <p>Have questions, business inquiries, or need assistance? Reach out to us directly via email just click to copy below.</p>
            <button onClick={copyToClip} 

            style={{backgroundColor:"transparent", border:"none", width:"100%", height:"6px"}}
            
            
            type="button"><FaCopy color="green" size={25} /></button>
        </div>
    </div>
  )
}

export default ContactUs