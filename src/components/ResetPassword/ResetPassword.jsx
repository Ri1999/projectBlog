// import React from 'react'
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useSearchParams } from "react-router-dom"
import { Navigate } from "react-router-dom"
// import { useSelector } from "react-redux"
import {toast} from "react-toastify"
import Input from "../Input"
import blogauthservice from "../../appwrite/auth"
import { useState } from "react"
import "./resetpassword.css"
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";

const ResetPassword = () => {
     // check state
    const isAuthenticated = useSelector((state)=> state.auth.status)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // how to use searchparams? --> it uses to read valuse from browser URL
    // since appwrite send reset email link as http://localhost:5173/reset-password?userId=65a123&secret=abc987

    const [searchParams] = useSearchParams();
    const userId = searchParams.get("userId")
    const secret = searchParams.get("secret")
    const {register,handleSubmit, getValues, formState: { errors } } = useForm()
    if(isAuthenticated === true){
        return <Navigate to="/" replace />
    }

    if(!userId || !secret){
        return <div style={{
            display:"flex",
            justifyContent:"center",
            width:"100%",
            minWidth:"520px",
            height:"400px",
            alignItems:"center",
            fontSize:"1.2rem",
            fontFamily: "Sansation, sans-serif",
            color:"#8b1010",

        }} >Invalid or expired password reset link.</div>
    }


    const handleResetPassword = async(data)=>{
        setLoading(true)
        try{
            await blogauthservice.confirmRecovery(userId, secret, data.password, data.confirmPassword)
            toast.success("Password updated! Please login.")
            navigate('/login');
        }catch(err){
            toast.error(err.message || "Failed to reset password")
        }finally{
            setLoading(false)
        }
    }




  return (
    <div className="resetpassword-container" >
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit(handleResetPassword)} className="resetpassword-content">

            <div style={{ position: "relative" }} >
            <Input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new password"
            error={errors.password?.message}
            {...register("password", {required: "New password is required",
                minLength:{
                    value:8,
                    message: "Password must be at least 8 characters"
                },
                pattern:{
                    value:passwordRegex,
                    message:"Password must contain at least 8 characters, 1 uppercase letter, 1 number, and 1 special character (@$!%*?&)"
                }

            })}/>
            

            <button
            style={{position: "absolute", right:"14px", top:"-6px", cursor:"pointer", width:"1px", backgroundColor:"white",height:"1px" }}
            onClick={()=> setShowPassword((prev)=> !prev)}
            type="button">{showPassword ? < MdRemoveRedEye color="red" /> : <IoEyeOffSharp color="green" /> }</button>
            </div>




            <div style={{ position: "relative" }} >
            <Input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword",{
                required: "Please confirm your password",
                validate: (value)=> value=== getValues("password") || "Passwords do not match!"
            })}

            />

            <button
            style={{position: "absolute", right:"14px", top:"-6px", cursor:"pointer", width:"1px", backgroundColor:"white",height:"1px" }}
            onClick={()=> setShowPassword((prev)=> !prev)}
            type="button">{showPassword ? < MdRemoveRedEye color="red" /> : <IoEyeOffSharp color="green" /> }</button>
            


            </div>
        <button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Set New Password"}
        </button>

        </form>
    </div>
  )
}

export default ResetPassword