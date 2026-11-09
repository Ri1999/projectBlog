import React, { useEffect } from 'react'
import { useState } from 'react'
import blogauthservice from '../../appwrite/auth';
import { toast } from 'react-toastify';
import { FiLoader } from 'react-icons/fi'
import {QRCodeSVG} from "qrcode.react"
import { FcLock } from "react-icons/fc";


const SendSupport = ({closeUniveModal,authorId, authorName}) => {

    const [upiId, setUpiId] = useState("");
    const [loading, setLoading] = useState(false);

    // console.log("did i find it: ", "|",closeUniveModal,"|",authorId)
    useEffect(()=>{

        const CreateQrandFetchUpi = async()=>{

            if(!authorId){
                return
            }
            setLoading(true)
            try{
                const response = await blogauthservice.getuserUpi(authorId)
                console.log("moni info@modal: ", response)
                if(response){
                    setUpiId(response)
                }

            }catch(err){
                toast.error(err.message || "Failed to fetch UPI info")
            }finally{
                setLoading(false)
            }
        }
        CreateQrandFetchUpi()

    },[authorId])

    const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(authorName)}&cu=INR`

    if(loading){
        return (
            <div style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                // height:"60vh",
                flexDirection:"column",
                color: "#024524",
            }} ><p><i>Connecting to the author's desk...</i></p><span className="spinning-animation" ><FiLoader color="green" size={40}/></span></div>
        )
    }


  return (
    <div  >
        {upiId? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"20px", fontFamily:"Sansation, sans-serif", padding:"30px" }} >
                {/* <h2>Support the Author</h2> */}

                <h4>P2P UPI Payment with 0% Platform Fees</h4>

                {/* <p style={{ fontSize: "1.05rem",}} >Show your appreciation for this story.</p> */}
                <div style={{ backgroundColor: "#3b8a46", padding: "8px 24px", borderRadius: "12px", border: "1px dashed #cbd5e1", margin: "4px 0" }}>
                        <span style={{ fontSize: "0.75rem", fontWeight: "bold", color: "#e6ebf3", display: "block", textTransform: "uppercase" }}>Enter Amount On Your Phone</span>
                        <span style={{ fontSize: "1.8rem", fontWeight: "800", color: "#1e293b" }}>₹ Free Choice</span>
                    </div>

                <QRCodeSVG color='green' value={upiUrl} size={160} level="H" />
                {/* <p style={{ marginTop: "10px", fontWeight: "bold" }}>{upiId}</p> */}

                {/* <p style={{ fontSize: "0.94rem", color: "#3b8a46" }}>Scan using Google Pay, PhonePe, or any UPI app • No Platform Fees</p> */}
                {/* <p style={{ fontSize: "0.94rem", color: "#3b8a46" }} >Scan using Google Pay, PhonePe, or any UPI app.</p> */}

                <p style={{ fontSize: "0.88rem", fontWeight: "600", color: "#3b8a46", margin: 0, lineHeight:"1.2rem", textAlign:"center" }}>
                        {/* Scan via Google Pay, PhonePe, Paytm or any UPI app <br /> */}
                        <span style={{ fontSize: "0.92rem", color: "#3b8a46", fontWeight: "bold" }}>Your amount goes <strong>100% directly to the author's bank account</strong>.</span>
                        
                    </p>
            </div>
        ):(
            <div style={{ textAlign: "center", padding: "10%", color: "#024524", lineHeight:"2rem" }} >
                <p>This author hasn't configured their UPI ID yet.</p>
            </div>
        )}
    </div>
  )
}

export default SendSupport