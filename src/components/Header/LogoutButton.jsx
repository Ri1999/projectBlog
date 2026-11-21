// import React from 'react'
import blogauthservice from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import { useDispatch } from "react-redux"
// import { useState } from "react"
// import { GiPowerButton } from "react-icons/gi";
// import { SiInkdrop } from "react-icons/si";
import "./logoutButton.css"

const LogoutButton = () => {

    // const [isHovered, setIsHovered] = useState(false)

  //   const logoutButtonStyle ={
  // background: "transparent",
  // // backgroundColor: "#4b5f51",
  // color: isHovered?"#100f0f":"green", 
  // fontSize: "1.2rem",
  // fontWeight: 600,
  // cursor: "pointer",
  // // transition: "color 0.2s ease",
  // // padding:"4px 12px",

  // // fontFamily: "Fondamento, cursive",
  // fontFamily: "Sansation, sans-serif",
  // borderRadius: "12px" ,
  // border: "none",
  // // borderColor:isHovered? "gold":"black",
  // // transform: isHovered ?"translateY(-2px)":"none",
  // transition: isHovered? "transform 1s ease":"none",
  // paddingRight:"15px",

  // // dispaly:"flex",
  // // alignItems:"center",
  // // justifyContent:"center",
  // // color:"green",
  //   }

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
    className="logout-button"

    // onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}

    onClick={handleLogout} type="button">Unlnk</button>
  )
}

export default LogoutButton