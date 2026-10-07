// import React from 'react'
import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import blogauthservice from "../../appwrite/auth"
import { FcExpired } from "react-icons/fc";
import { FcClock } from "react-icons/fc";
const VerifyEmail = () => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const userId = searchParams.get("userId") 
    const secret = searchParams.get("secret")
    const [loading, setLoading] = useState(false)

    const verifyStyle={
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
    }

    useEffect(()=>{

        const VerifyEmail = async()=>{

            setLoading(true)
            try{
                const response = await blogauthservice.signupConfirmVerification({userId, secret})
                if(response){
                    toast.success("Email verified successfully! Please login.")
                    navigate("/login")
                }
            }catch(err){
                toast.error(err.message || "Verification failed or link expired!")
                navigate("/login")
            }finally{
                setLoading(false)
            }

        }

        // TODO: 1
        VerifyEmail()




    },[userId, secret, navigate])


  return (
    < >
        {loading? 
        <div style={verifyStyle} ><h2 style={{color:"green"}} >Verifying your email, please wait...</h2><FcClock size={50} /></div>
        : 
        <div
        style={verifyStyle}
        ><h2>Link expired</h2><FcExpired size={50} /></div>  }
    </>
  )
}

export default VerifyEmail