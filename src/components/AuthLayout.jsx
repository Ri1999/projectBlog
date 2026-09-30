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

        // context : i add authentication=true to all paths --> "/add-post","dashboard","/settings","/delete-post","/etc"

        //case: user without login try access 
        // authentication=true, !authStatus=true --> send to login

        if(authentication  && !authStatus)
            navigate("/login")

        // context : i add authentication=false to path --> "/"
        
        // so for making both true to run condition need !authentication=true and a loggin user authStatus always true, so both true condition run
        else if(!authentication && authStatus){
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