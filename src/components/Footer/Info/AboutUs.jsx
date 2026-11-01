// import React from 'react'
import "./info.css"
import { FcAbout } from "react-icons/fc";
const AboutUs = () => {
  return (
    <div className="container" >
        <h1>Hi, <FcAbout size={40} /></h1>
        <div className="content">
            <p>Welcome to our platform! We are dedicated to providing the Digital Canvas for Writers, and Creators.</p>
        <p>Charukavya is an interactive story-publishing platform built for modern storytellers, poets, and avid readers. Our mission is to build a high-performance, secure, and user-friendly space 
        where ideas can be shared effortlessly.</p>
        </div>

    </div>
  )
}

export default AboutUs