// import React from 'react'
import "./info.css"
// import { FcAbout } from "react-icons/fc";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="container" >
      <div 
                style={{ 
                display: "inline-block", 
                backgroundColor: "#fdfdfd", 
                color: "#035e21", 
                fontSize: "0.75rem", 
                fontWeight: "700", 
                padding: "20px 12px", 
                borderRadius: "12px", 
                marginBottom: "8px",
                letterSpacing: "0.04em",
                textAlign:"center",
                fontFamily:"Sansation, sans-serif",
            }}
            >OUR STORY & MISSION
            </div>
        <h1 style={{fontSize:"1.7rem"}} >A Digital Canvas Built for Writers & Creators</h1>
        <div className="content">
            <p style={{color: "#1d3557",}} ><strong>Charukavya</strong> is an interactive story-publishing platform designed for modern storytellers, poets, and avid readers. Our mission is to provide a fast, secure, and clutter-free home where creativity flows effortlessly.</p>
            <p style={{color: "#1d3557",}} >We started Charukavya with a simple belief: great stories deserve a peaceful stage, and writers deserve direct appreciation without platform cuts. Whether you're sharing a short poem, a serialized thriller, or co-writing in our upcoming Collab Mode, you are part of a growing community that values pure expression.</p>
        </div>
        <Link
                    to="/contact-us"
                    style={{
                        backgroundColor: "#ffffff",
                        color: "#1d3557",
                        border: "1px solid #cbd5e1",
                        padding: "11px 22px",
                        borderRadius: "10px",
                        fontWeight: "600",
                        fontSize: "0.92rem",
                        textDecoration: "none",
                        fontFamily: "Sansation, sans-serif",
                        textAlign:"center",
                    }}
                >
                    Get in Touch
                </Link>

    </div>
  )
}

export default AboutUs