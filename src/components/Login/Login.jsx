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
            style={{position: "absolute", right:"14px", top:"-4px", cursor:"pointer", width:"1px", backgroundColor:"transparent",height:"1px",border:"none", borderRadius:"50px" }}
            onClick={()=> setShowPassword((prev)=> !prev)}
            type="button">{showPassword ? < MdRemoveRedEye color="red" /> : <IoEyeOffSharp color="green" /> }</button>
            
            </div>





            <button type="submit"
            disabled={loading}>{loading? "Logging In...":"Login"}</button>
            
        </form>
        <p className="signup-link-text" > Don't have an account? <Link to="/signup">Signup</Link></p>
        <Link to="/forget-password" className="reset-password-text" >Forget Password?</Link>

    </div>
  )
}

export default Login