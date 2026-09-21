// import React from 'react'
import blogauthservice from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import { useDispatch } from "react-redux"
import { useState } from "react"

const LogoutButton = () => {

    const [isHovered, setIsHovered] = useState(false)

    const logoutButtonStyle ={
//   background: "transparent",
  backgroundColor:isHovered ? "#1C3123" : "white",
  border: "none",
  color: isHovered ? "#F4EAE1" : "#1C3123", 
  fontSize: "1.2rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "color 0.2s ease",
  padding: "4px 12px",
  fontFamily: "Fondamento, cursive",
  borderRadius: "20px",
    }

    const dispatch = useDispatch()

    const handleLogout = async ()=>{

        try{
            await blogauthservice.logout() // Appwrite backend session delete 
            // then update store
            dispatch(logout())   

        }catch(err){
            console.error("handleLogoutError: ", err.message)
        }
        
    }


  return (
    // <div>LogoutButton</div>
    <button

    onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}

     style={logoutButtonStyle} onClick={handleLogout} type="button">logout</button>
  )
}

export default LogoutButton