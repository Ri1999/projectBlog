// import React from 'react'
import blogauthservice from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import { useDispatch } from "react-redux"
import { useState } from "react"

const LogoutButton = () => {

    const [isHovered, setIsHovered] = useState(false)

    const logoutButtonStyle ={
//   background: "transparent",
  backgroundColor: "black",
  color: "white", 
  fontSize: "1.2rem",
  fontWeight: 600,
  cursor: "pointer",
  // transition: "color 0.2s ease",
  padding:"4px 14px",

  // fontFamily: "Fondamento, cursive",
  fontFamily: "Sansation, sans-serif",
  borderRadius: "18px" ,
  border: "1px solid #1C3123",
  // borderColor:isHovered? "gold":"black",
  // transform: isHovered ?"translateY(-2px)":"none",
  transition: isHovered? "transform 1s ease":"none",
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

     style={logoutButtonStyle} onClick={handleLogout} type="button">Logout</button>
  )
}

export default LogoutButton