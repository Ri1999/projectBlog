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
import { FcExpired } from "react-icons/fc";

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
            flexDirection:"column",
            gap:"10px",
            width:"100%",
            minWidth:"520px",
            height:"400px",
            alignItems:"center",
            fontSize:"1.2rem",
            fontFamily: "Sansation, sans-serif",
            color:"#f10f0f",

        }} >Password reset links don't last forever. This one is either expired or has already been used. Head back and request a fresh link. <FcExpired size={50} /> </div>
    }


    const handleResetPassword = async(data)=>{
        setLoading(true)
        try{
            await blogauthservice.confirmRecovery(userId, secret, data.password, data.confirmPassword)
            toast.success("Password updated! Sending you to login...")
            navigate('/login');
        }catch(err){
            toast.error(err.message || "Failed to set password")
        }finally{
            setLoading(false)
        }
    }




  return (
    <div className="resetpassword-container" >
        <h2>Forge a new Password</h2>
        <p>Make it strong, make it memorable, and keep it safe this time.</p>
        <form onSubmit={handleSubmit(handleResetPassword)} className="resetpassword-content">

            <div style={{ position: "relative" }} >
            <Input
            type={showPassword ? "text" : "password"}
            placeholder="New Password"
            error={errors.password?.message}
            {...register("password", {required: "New password is required",
                minLength:{
                    value:8,
                    message: "Password must be at least 8 characters"
                },
                pattern:{
                    value:passwordRegex,
                    message:" Give us a masterpiece: at least 8 characters, 1 uppercase letter, 1 number, and 1 special character (@$!%*?&)"
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
            placeholder="Repeat it once more"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword",{
                required: "Please confirm your password",
                validate: (value)=> value === getValues("password") || "Nice try, but those two passwords don't match!"
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