// import React from 'react'
// import { useState } from "react"
// import { useForm } from "react-hook-form"
import {toast} from "react-toastify"
// import Input from "../../Input"
// import { Link } from "react-router-dom"
// import { FcSurvey } from "react-icons/fc";
// import { FaCopy } from "react-icons/fa";
// import { RxClipboardCopy , RxCheck, RxPaperPlane} from "react-icons/rx";

import "./info.css"

const ContactUs = () => {

    // const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const [loading, setLoading] = useState(false);

    const adminEmail = "charukavya.support@gmail.com"

    const copyToClip = ()=>{
        navigator.clipboard.writeText(adminEmail)
        toast.success("Email copied to clipboard 📋")
    }

    

  return (
    <div className="container" >
            {/* Live Support Status Indicator */}
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
            >CHARUKAVYA HELP DESK
            </div>

            <h1 style={{ fontSize: "1.8rem", color: "#0f172a", margin: "0 0 10px 0" }}>
                Don't be a Ghost Reader
            </h1>

            <div className="content">
                <p style={{ fontSize: "1.1rem", color: "#1d3557", lineHeight: "1.6", margin: "0 0 20px 0" }}>
                    Have questions, account queries, or collaboration ideas? Reach out to our team directly—we love hearing from our community.
                </p>

                {/* Topic Pills (Makes the platform look organized & legit) */}
                <div style={{ 
                    display: "flex", 
                    flexWrap: "wrap", 
                    gap: "8px", 
                    marginBottom: "22px" 
                }}>
                    {["Account & UPI Help", "Copyright & Content", "Collaborations", "General Queries"].map((topic) => (
                        <span key={topic} style={{
                            fontSize: "1rem",
                            backgroundColor: "#f0fdf4",
                            color: "#15803d",
                            border: "1px solid #bbf7d0",
                            padding: "10px 10px",
                            borderRadius: "10px",
                            fontWeight: "600",
                            fontFamily:"Sansation, sans-serif",
                        }}>
                            {topic}
                        </span>
                    ))}
                </div>

                {/* Official Contact Card */}
                <div style={{
                    backgroundColor: "#ffffff",
                    // border: "1px solid #047223",
                    borderRadius: "14px",
                    padding: "16px",
                    marginBottom: "18px"
                }}>
                    <span style={{ 
                        display: "block", 
                        fontSize: "0.72rem", 
                        fontWeight: "700", 
                        textTransform: "uppercase", 
                        color: "#64748b", 
                        letterSpacing: "0.05em",
                        marginBottom: "6px",
                        fontFamily:"Sansation, sans-serif",
                    }}>
                        Official Support Email
                    </span>

                    <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between", 
                        gap: "10px",
                        flexWrap: "wrap"
                    }}>
                        <a 
                            href={`mailto:${adminEmail}?subject=Inquiry%20-%20Charukavya`}
                            style={{ 
                                // fontFamily: "monospace",
                                fontFamily:"Fondamento, cursive", 
                                fontSize: "1rem", 
                                // fontWeight: "520", 
                                color: "#0f172a", 
                                textDecoration: "none"
                            }}
                        >
                            {adminEmail}
                        </a>

                        <div style={{ display: "flex", gap: "8px" }}>
                            {/* Copy Button */}
                            <button 
                                onClick={copyToClip} 
                                type="button"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    // backgroundColor: copied ? "#16a34a" : "#ffffff",
                                    // color: copied ? "#ffffff" : "#334155",
                                    border: "1px solid #cbd5e1",
                                    borderRadius: "8px",
                                    padding: "6px 12px",
                                    fontSize: "0.82rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.2s"
                                }}
                            >
                                {/* {copied ? <RxCheck size={16} /> : <RxClipboardCopy size={16} color="#16a34a" />} */}
                                {/* {copied ? "Copied" : "Copy"} */}
                                COPY
                            </button>

                            {/* Quick Send Button */}
                            {/* <a 
                                href={`mailto:${adminEmail}?subject=Inquiry%20-%20Charukavya`}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    // gap: "5px",
                                    backgroundColor: "#0f172a",
                                    color: "#ffffff",
                                    borderRadius: "8px",
                                    // padding: "6px 12px",
                                    fontSize: "0.82rem",
                                    fontWeight: "600",
                                    textDecoration: "none"
                                }}
                            >email to
                            </a> */}
                        </div>
                    </div>
                </div>

                {/* Transparency & Trust Note */}
                <p style={{ fontSize: "0.82rem", color: "#1d3557", margin: 0, lineHeight: "1.5" }}>
                    🔒 <strong>No automated bots:</strong> Your email goes directly to the Charukavya team. We typically respond within <strong>24–48 hours</strong>.
                </p>
            </div>
        </div>
  )
}

export default ContactUs