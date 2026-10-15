// import React from 'react'
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const AuthLayout = ({children, authentication=true}) => {

    // level 1: guard by header nav item stop dispay
    // level 3: maybe appwrite give us something
    // level 2: ?? need a wrap layer
    const navigate = useNavigate()

    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(()=>{

        // setLoader(true)

       
        // since if block need inside values both true to run, Since i configure default authStatus is false i can run it inside if block so i make it !false or in this case !authStatus.

        const ProtectRoute = authentication
        const GuestRoute = !authentication

        // if a user notlogin and still try to access /your-ink, and /inkwell, those protected routes she fall back into /login

        if(ProtectRoute  && !authStatus)
            navigate("/login")

        // if a already logged user try to access non protected routes like /singup, /login she fall back into home


        else if(GuestRoute && authStatus){
            navigate("/")
        }

        setLoader(false)
        
    },[authStatus, navigate, authentication])

  return (
    <div>
        {loader? <h2 style={{textAlign:"center", fontFamily:"Sansation, sans-serif"}} >Loading...</h2>:<>{children}</> }
    </div>
  )
}

export default AuthLayout