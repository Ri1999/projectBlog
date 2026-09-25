// import React from 'react'
import "./login.css"
import { Link, useNavigate } from "react-router-dom"
import { login as authLoginSlice } from "../../store/authSlice"
import { useDispatch } from "react-redux"
import blogauthservice from "../../appwrite/auth"
import Input from "../Input"
import { useForm} from "react-hook-form"
import { useState } from "react"

const Login = () => {

    // read from - https://react-hook-form.com/get-started
    // register --> this binds input element + hook togather
    // handleSubmit --> as we know, also automatically handle, e.preventDefault()
    // formState: { errors } --> show errors if input fields are empty

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("") // why set empty string i dont know, but i used to set it as boolean : false
    const [loading, setLoading] = useState(false)

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
        <form className="login-content" >

            <Input type="email"
            placeholder="Enter your email"
            {...register("email",{required: true})}
            
            />

            <Input type="password"
            placeholder="Enter your password"
            {...register("password", {required: true})}
    
            />

            <button type="submit"
            disabled={loading}>{loading? "Logging In...":"Login"}</button>
            
        </form>
        <p className="signup-link-text" > Don't have an account? <Link to="/signup">Login</Link></p>
        <Link className="reset-password-text" >Reset Password</Link>

    </div>
  )
}

export default Login