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

const Login = () => {

    // read from - https://react-hook-form.com/get-started
    // register --> this binds input element + hook togather
    // handleSubmit --> as we know, also automatically handle, e.preventDefault()
    // formState: { errors } --> show errors if input fields are empty

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {register, handleSubmit, formState: { errors }} = useForm()

    const [error, setError] = useState("") // why set empty string i dont know, but i used to set it as boolean : false
    const [loading, setLoading] = useState(false)

    const [showPassword, setShowPassword] = useState(false)


    const loginHandle = async (data)=>{
        setError("")
        setLoading(true)
        try{
            const session = await blogauthservice.login(data)
            if(session){
                // userData taken from get current user so another await getCurrentUser method

                // Send object with 'userData' key to match authSlice pattern

                const userData = await blogauthservice.getCurrentUser()
                if(userData){
                    dispatch(authLoginSlice({userData}))
                    // after change state
                    navigate("/")
                }

            }

        }catch(err){
            setError(err.message || "Failed to login. Check credentials.")
        }finally{
            setLoading(false)
        }
    }

    const handleAuthLogin = async(provider)=>{
        setError("")
        setLoading(true)
        try{
            await blogauthservice.loginWithOAuth(provider)
            
        }catch(err){
            setError(err.message || `${provider} login failed` )
        }finally{
            setLoading(false)
        }
    }


  return (
    <div className= "login-container" >
        <h2>Welcome</h2>
        {error && <p className="error-text" >{error}</p> }
        <form onSubmit={handleSubmit(loginHandle)} className="login-content" >

            <Input type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email",{required: "Email is required"})}
            
            />

            <div style={{ position: "relative" }} >
            <Input type={showPassword? "text":"password"}
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password", {required: "Password is required"})}
    
            />

            <button
            style={{position: "absolute", top:"15%", cursor:"pointer", backgroundColor:"transparent",height:"1px",border:"none", borderRadius:"50px",
                transform:"traslateY(-50%)",
                display: "flex", alignItems: "center",
                justifyContent:"flex-end",
             }}
            onClick={()=> setShowPassword((prev)=> !prev)}
            type="button">{showPassword ? < MdRemoveRedEye color="red" /> : <IoEyeOffSharp color="green" /> }</button>
            
            </div>





            <button type="submit"
            disabled={loading}>{loading? "Logging In...":"Login"}</button>

            <p>OR</p>
            <div className="oauth-content" >
                {/* google */}
            <button disabled={loading} onClick={function(){
                handleAuthLogin("google")
            }} style={{backgroundColor:"transparent", border:"2px solid #9fd5bb", padding:"4px"  }} type="button"><FcGoogle size={35} /></button>

            {/* github */}
            <button 
        type="button" 
        onClick={function(){
            handleAuthLogin("github")
        }}
        style={{ background: "transparent", border: "2px solid #a1adb8", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}
    >
        <FaGithub size={32} color="#24292E" />
    </button>

    {/* apple id */}
    <button 
        type="button" 
        onClick={function(){
            handleAuthLogin("apple")
        }}
        style={{ background: "transparent", border: "2px solid #a6a6a6", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}
    >
        <FaApple size={35} color="#000" />
    </button>






            </div>
            
        </form>
        <p className="signup-link-text" > Don't have an account? <Link to="/signup">Signup</Link></p>
        <Link to="/forget-password" className="reset-password-text" >Forget Password?</Link>

    </div>
  )
}

export default Login