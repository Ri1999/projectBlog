// import React from 'react'
import { useState } from "react"
import { useForm } from "react-hook-form"
// import { useNavigate } from "react-router-dom"
import { Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Input from "../Input"
import blogauthservice from "../../appwrite/auth"
import {toast} from "react-toastify"
import "./forgetpassword.css"

const ForgotPassword = () => {

    // check state
    const isAuthenticated = useSelector((state)=> state.auth.status)

    // const navigate = useNavigate()

    const { register, handleSubmit,formState: { errors } } = useForm()

    const [loading, setLoading] = useState(false)
    // const [error, setError] = useState("")
    // think of using toast container

    if(isAuthenticated){
        return <Navigate to="/" replace />
    }

    const handleForgetPassword = async(data)=>{
        setLoading(true)
        try{
            const redirectedURL = `${window.location.origin}/reset-password`;
            await blogauthservice.passwordRecovery(data.email, redirectedURL);
            toast.success("Reset link sent ! pls check email")
        }catch(err){
            toast.error(err.message || "Failed to send reset link.")
        }finally{
            setLoading(false)
        }
    }


  return (

    <div className="forgetpass-container" >
        <h2>Forget Pawword</h2>
        <form onSubmit={handleSubmit(handleForgetPassword)} className="forgetpass-content" >
            <Input
            type="email"
            placeholder="Enter registered email"
            error= {errors.email?.message}
            {...register("email", {required: "Email is required"})}
            
            
            />
            <button type="submit" disabled={loading} >
                {loading? "Sending":"Send Reset Link"}
            </button>

        </form>
    </div>
    
  )
}

export default ForgotPassword