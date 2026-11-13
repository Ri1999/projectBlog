// import React from 'react'
import { Link } from "react-router-dom"
import { RiHome2Line } from "react-icons/ri";

const Notfound = () => {


  return (
    <div style={{
        display:"flex",
        width:"95%",
        height:"60vh",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        margin: "0 auto",
        maxWidth: "600px",
        // gap:"10px"
    }} >
        <span style={{

                backgroundColor: "#fff1f2",
                marginTop:"20px",
                color: "red",
                fontSize: "0.9rem",
                fontWeight: "700",
                padding: "20px 12px",
                borderRadius: "9px",
                letterSpacing: "0.06em",
                marginBottom: "14px",
                fontFamily: "Sansation, sans-serif"
            }}>
                ERROR • UNWRITTEN PAGE
            </span>
        <h1 style={{ fontSize: "4rem", marginBottom: "10px", color: "#ffccd5",fontFamily:"Fondamento, cursive" }}>404</h1>
        <h2 style={{ marginBottom: "15px", fontWeight: "600",fontFamily:"Fondamento, cursive", }}>Lost in the Chapters?</h2>
        <p style={{ maxWidth: "500px", marginBottom: "15px", color: "#a0a0a0",lineHeight: "1.65rem", }}>
                The page or story you are looking for doesn't exist, was moved, or maybe the wanderer typed a wrong address into the URL bar.
            </p>
            <Link style={{
                textDecoration:"none",
                // fontFamily:"Fondamento, cursive",
                // backgroundColor: "#1C3123",
                        color: "#044c07",
                        padding: "11px 24px",
                        borderRadius: "10px",
                        fontWeight: "600",
                        fontSize: "0.95rem",
                        fontFamily: "Sansation, sans-serif",
                        boxShadow:"0 5px 10px black",
                        marginBottom:"20px",

            }}  to="/" >H<RiHome2Line size={20} />ME
            
            </Link>
    </div>
  )
}

export default Notfound