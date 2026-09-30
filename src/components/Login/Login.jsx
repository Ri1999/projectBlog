// import React from 'react'
import "./login.css"
import { Link, useNavigate } from "react-router-dom"
import { login as authLoginSlice } from "../../store/authSlice"
import { useDispatch } from "react-redux"
import blogauthservice from "../../appwrite/auth"
import Input from "../Input"
import { useForm} from "react-hook-form"
import { useState } from "react"
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
// import { FcReadingEbook } from "react-icons/fc";
import { FcReading } from "react-icons/fc";
import {toast} from "react-toastify"

const Login = () => {

    // read from - https://react-hook-form.com/get-started
    // register --> this binds input element + hook togather
    // handleSubmit --> as we know, also automatically handle, e.preventDefault()
    // formState: { errors } --> show errors if input fields are empty

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register, handleSubmit, formState: { errors }} = useForm()

    // const [error, setError] = useState("") // why set empty string i dont know, 
    // but i used to set it as boolean : false
    const [loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false)

    // const [isHovered, setIsHovered] = useState(false)

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


    const loginHandle = async (data)=>{
        // setError("")
        setLoading(true)
        try{
            const session = await blogauthservice.login(data)
            if(session){
                // userData taken from get current user so another await getCurrentUser method

                // Send object with 'userData' key to match authSlice pattern

                const userData = await blogauthservice.getCurrentUser()
                if(userData){

                    // extra guard again using appwrite
                    if(!userData.emailVerification){
                        toast.error("Please verify your email before logging in! Check your inbox")
                        await blogauthservice.logout()
                        return
                    }

                    dispatch(authLoginSlice({userData}))
                    // after change state , after sucesssful login send user to his dashboard
                    navigate("/")
                }

            }

        }catch(err){
            // setError(err.message || "Failed to login. Check credentials.")
            toast.error(err.message || "Failed to login. Check credentials.")
        }finally{
            setLoading(false)
        }
    }

    const handleAuthLogin = async(provider)=>{
        // setError("")
        setLoading(true)
        try{
            await blogauthservice.loginWithOAuth(provider)
            
        }catch(err){
            // setError(err.message || `${provider} login failed` )
            toast.error(err.message || `${provider} login failed`)
        }finally{
            setLoading(false)
        }
    }


  return (
    <div className= "login-container" >
        <h2><FcReading size={50} />Login</h2>
        {/* {error && <p className="error-text" >{error}hello</p> } */}
        <form onSubmit={handleSubmit(loginHandle)} className="login-content" >

            <Input type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email",{required: "Email is required",
                pattern:{
                    value: emailRegex,
                    message: "Please enter a valid email address"
                }
            })}
            
            />

            <div style={{ position: "relative" }} >
            <Input type={showPassword? "text":"password"}
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password", {required: "Password is required"})}
    
            />

            <button
            style={{position: "absolute", top:"35%", cursor:"pointer", backgroundColor:"transparent",height:"1px",border:"none", borderRadius:"50px",
                transform:"translateY(-50%)",
                display: "flex", alignItems: "center",
                justifyContent:"flex-end",
                width:"auto",
                right:"5px",
             }}
            onClick={()=> setShowPassword((prev)=> !prev)}
            type="button">{showPassword ? < MdRemoveRedEye color="red" /> : <IoEyeOffSharp color="green" /> }</button>
            
            </div>





            <button type="submit"
            disabled={loading}>{loading? "Logging In...":"Login"}</button>

            <p style={{fontWeight:"600"}} >- Or choose alternative path -</p>
            <div className="oauth-content" >
                {/* google */}
            <button disabled={loading} onClick={function(){
                handleAuthLogin("google")
            }} style={{backgroundColor:"transparent", border:"2px solid grey", padding:"4px"  }} type="button"><FcGoogle size={35} /></button>

            {/* github */}
            <button 
        type="button" 
        onClick={function(){
            handleAuthLogin("github")
        }}
        style={{ background: "transparent", border: "2px solid grey", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}
    >
        <FaGithub size={32} color="#24292E" />
    </button>

    {/* apple id */}
    <button 
        type="button" 
        onClick={function(){
            handleAuthLogin("apple")
        }}
        style={{ background: "transparent", border: "2px solid grey", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}
    >
        <FaApple size={35} color="#000" />
    </button>

    {/* linkedin */}

    <button 
        type="button" 
        onClick={function(){
            handleAuthLogin("linkedin")
        }}
        style={{ background: "transparent", border: "2px solid grey", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}
    >
        <FaLinkedin color="#1040aff7" size={35} />
    </button>








            </div>
            
        </form>
        <p className="signup-link-text" > Don't have an account? <Link to="/signup">Signup</Link></p>
        <Link to="/forget-password" className="reset-password-text" >Forget Password?</Link>

    </div>
  )
}

export default Login