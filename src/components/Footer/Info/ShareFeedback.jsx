// import React from 'react'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
// import { useState } from 'react';
import { RxEnvelopeClosed } from "react-icons/rx";
// import SelectComponent from '../../SelectComponent'
// import { FaRegStar } from "react-icons/fa6";
// import { RxClipboardCopy } from "react-icons/rx";

import "./info.css" // major css is here

const ShareFeedback = () => {

    // const [copied, setCopied] = useState(false)

    const feedbackEmail = "charukavya.support@gmail.com"

    const copyEmailId = ()=>{
        navigator.clipboard.writeText(feedbackEmail)
        // setCopied(true)
        toast.success("Email copied to clipboard 📋")
        // setCopied(false)
    }

    

    // user ratings

    // const [ratings, setRatings] = useState(0)
    // const [hoverRating, setHoverRating] = useState(0)

    // const onSubmit = (data) => {

    //     // if (ratings === 0) {
    //     //     toast.error("Please select a star rating! ⭐");
    //     //     return;
    //     // }

    //     console.log("Form Data:", data);
    //     toast.success("Thank you for your valuable feedback! ❤️");
    //     reset();
    // };

    



  return (
    <div className='container'>
            {/* Top Trust Badge */}
            <div style={{ 
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
            }}>DIRECT COMMUNITY DESK
            </div>

            <h1 style={{ fontSize: "1.8rem", color: "#010612", margin: "0 0 10px 0" }}>
                Help Us Shape Charukavya
            </h1>
            
            <p style={{ fontSize: "1.1rem", color: "#1d3557", lineHeight: "1.6", margin: "0 0 24px 0" }}>
                Your insights help us build a better home for writers and readers. Report a bug, suggest a feature, or simply share your thoughts.
            </p>

            {/* Visible Email + Copy Box (High Trust UI) */}
            <div style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "space-between", 
                // backgroundColor: "#f8fafc", 
                // border: "1px solid #cbd5e1", 
                borderRadius: "12px", 
                // padding: "10px 14px",
                marginBottom: "16px",
                gap: "10px"
            }}> <span style={{
                fontFamily:"Fondamento, cursive",
                fontSize:"1rem"
            }} >charukavya.support@gmail.com</span> <button 
                    onClick={copyEmailId}
                    style={{
                        alignSelf:"flex-end",
                        width:"10%"
                    }} 
                    type="button">
                        COPY
                </button>
            </div>

            
            <a 
                href={`mailto:${feedbackEmail}?subject=Feedback%20for%20Charukavya`}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    width: "100%",
                    padding: "12px",
                    backgroundColor: "#16a34a",
                    color: "#ffffff",
                    textDecoration: "none",
                    borderRadius: "10px",
                    fontWeight: "600",
                    fontSize: "0.95rem",
                    boxSizing: "border-box",
                    marginBottom: "18px",
                    fontFamily:"Sansation, sans-serif",
                }}
            >
                <RxEnvelopeClosed size={20} />
                Write to Us Directly
            </a>

            {/* Human Assurance Footer */}
            <p style={{ fontSize: "0.8rem", color: "#1d3557", margin: 0,fontFamily:"Sansation, sans-serif", }}>
                🛡️ Every message is read personally by the Charukavya team • Usually replies within <b>24 hrs</b>.
            </p>
        </div>
    );
  

    
}

export default ShareFeedback