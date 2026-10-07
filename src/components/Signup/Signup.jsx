// import React from 'react'
import "./signup.css"
import { FcHome } from "react-icons/fc";
import { useNavigate } from "react-router-dom"
// import { login as authLoginSlice } from "../../store/authSlice"
// import { useDispatch } from "react-redux"
import blogauthservice from "../../appwrite/auth"
import Input from "../Input"
import { useForm} from "react-hook-form"
import { useState } from "react"
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOffSharp } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaApple } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import {toast} from "react-toastify"

// for disposable email 
import disposableDomains from 'disposable-email-domains'; 
import { Link } from "react-router-dom";

const Signup = () => {

    // const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register, handleSubmit, formState: { errors} } = useForm()
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    // sign up flow

// signup.jsx mai blogauthservice.createAccount(data) ->blogauthservice.sendEmailVerification(`${window.location.origin}/verify-email`)->blogauthservice.signupConfirmVerification({userId, secret}) in my verifyemail.jsx ->"/login"



    const createNewUser= async (data)=>{

        setLoading(true)
        try{
            const signupReq = await blogauthservice.createAccount(data)

            if(signupReq){
                // verify email after signup
                await blogauthservice.sendEmailVerification(`${window.location.origin}/verify-email`)
                // tempory session cleaings
                await blogauthservice.logout()
                toast.success("Account created successfully! Please check your email to verify before logging in")
                // send user to /login
                navigate("/login")

               }
            
        }catch(err){
            toast.error(err.message|| "Signup failed! Please try again.")
        }finally{
            setLoading(false)
        }
    }

    const nameRegex = /^[a-zA-Z0-9_ -]+$/

    const signupEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // what about the tempmail services? where is that guard?
    // Blocked disposable email domains list
    const disposableSet = new Set(disposableDomains);
    // also need customs array
    const tempemail = [
        "bitproy.com",
        "olipii.com",
        "ozsip.com",
        "yzcalo.com",
        "Inovic.com",
        "ruutukf.com",
        "gmeenramy.com",
        "olipii.com",
        "ooynib.com",
        // 
        "guerrillamail.com",
  "guerrillamail.net",
  "guerrillamail.org",
  "guerrillamail.biz",
  "guerrillamail.de",
  "guerrillamail.info",
  "guerrillamailblock.com",
  "sharklasers.com",
  "grr.la",
  "pokemail.net",
  "spam4.me",
  // Mailinator
  "mailinator.com",
  // YOPmail
  "yopmail.com",
  "yopmail.fr",
  "yopmail.net",

  // TrashMail
  "trashmail.com",
  "trashmail.de",
  "trash-mail.com",

  // Other disposable services
  "throwawaymail.com",
  "getnada.com",
  "dispostable.com",
  "fakeinbox.com"

    ]



    const handleAuthSignup = async(provider)=>{
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
    <div className="signup-container" >
        <h2><FcHome size={50} />Signup</h2>
        <form onSubmit={handleSubmit(createNewUser)} className="signup-content" >
            
            {/* oauth methods */}
            <div className="signupoauth-content" >
                {/* google */}
            <button disabled={loading} onClick={function(){
                handleAuthSignup("google")
            }} style={{backgroundColor:"#83acef", border:"none", padding:"4px", }} type="button"><FcGoogle  size={38} /></button>

            {/* github */}
            <button 
        type="button" 
        onClick={function(){
            handleAuthSignup("github")
        }}
        style={{ background: "#dbe4ee", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}
    >
        <FaGithub size={32} color="#24292E" />
    </button>

    {/* apple id */}
    <button 
        type="button" 
        onClick={function(){
            handleAuthSignup("apple")
        }}
        style={{ background: "#dbe4ee", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}
    >
        <FaApple size={35} color="#000" />
    </button>

    {/* linkedin */}

    <button 
        type="button" 
        onClick={function(){
            handleAuthSignup("linkedin")
        }}
        style={{ background: "white", border: "none", padding: "8px 14px", borderRadius: "8px", cursor: "pointer" }}
    >
        <FaLinkedin color="#1040aff7" size={35} />
    </button>

            </div>
            <p style={{textAlign:"center", fontWeight:"600"}} >- Alternatively create an account via -</p>
            {/* name */}

            <Input
            type="text"
            placeholder="Type your pen name"
            error={errors.name?.message}
            {...register("name",{
                required:"Anonymous? Drop your name so we know each other",
                minLength:{
                    value:3,
                    message:"Name must be at least 3 characters"
                },
                pattern:{
                    value:nameRegex,
                    message:"Pls enter your name correctly"
                }
            })}
            
            
            />

            {/* signup email */}

            <Input type="email"
            placeholder="Type your email"
            error={errors.email?.message}
            {...register("email",{required: "At least give us an email address",
                pattern:{
                    value: signupEmailRegex,
                    message: "We need a valid email address"
                },
                validate:{
                    notempEmail:(email)=>{

                        // logic:
                        // emaill means "rittik@tempmail.com"
                        // .split("@") means ["rittik", "tempmail.com"] while @ is treat invisible
                        // [1]? means [0] index has "rittik" and [1] index has "tempmail.com" 

                        // has () use for Hash Table Lookup (0(1))
                        // includes use Linear Search (0(N))

                        // since disposable-email-domains library have 3,000+ domains, so better uses .has() while my custom tempemail is small array so better use .includes()

                        const domain = email.split("@")[1]?.toLowerCase();
                        if(disposableSet.has(domain) || tempemail.includes(domain) ){
                            return "Disposable/Temporary emails are not allowed buddy"
                        }
                        return true
                    }
                }
                
            })}
            
            />

            <div style={{ position: "relative" }} >
            <Input type={showPassword? "text":"password"}
            placeholder="Type your password"
            error={errors.password?.message}
            {...register("password", {required: "Give us a password",
                minLength:{
                    value:8,
                    message:"your must be at least 8 characters"
                },
                pattern:{
                    value:!passwordRegex,
                    message:"Give us a masterpiece: at least 8 characters, 1 uppercase letter, 1 number, and 1 special character (@$!%*?&)"
                }
            })}
    
            />

            <button
            style={{position: "absolute", top:"10%", cursor:"pointer", backgroundColor:"transparent",height:"1px",border:"none", borderRadius:"50px",
                transform:"translateY(-50%)",
                // display: "flex", alignItems: "center",
                // justifyContent:"flex-end",
                width:"auto",
                right:"5px",
             }}
            onClick={()=> setShowPassword((prev)=> !prev)}
            type="button">{showPassword ? < MdRemoveRedEye color="red" /> : <IoEyeOffSharp color="green" /> }</button>
            
            </div>
            <button type="submit"
            disabled={loading}>{loading? "Signing...":"Signup"}</button>


        </form>

        <p className="signup-text" >Already a member? <Link to="/login" >Login</Link></p>
        <p className="signup-text" >By creating an account, you agree to the <Link to="/privacy-policy" >Privacy Policy</Link> and <Link to="/terms" >Terms & Conditions</Link></p>

        



    </div>
  )
}

export default Signup