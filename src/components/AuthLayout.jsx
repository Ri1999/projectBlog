// import React from 'react'
import { useState } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const AuthLayout = ({children, authentication}) => {

    // level 1: guard by header nav item stop dispay
    // level 3: maybe appwrite give us something
    // level 2: ?? need a wrap layer
    const navigate = useNavigate()

    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(()=>{

        // false(default prop) && false(default value)
        
        if(authentication  && authStatus !== true)
            navigate("/login")

        // user already login then send her to home

                // true(default prop) true(logging user)
                
        else if(!authentication && authStatus === true){
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