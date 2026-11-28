import  { useEffect } from 'react'
import { useState } from 'react'
import blogauthservice from '../../appwrite/auth';
import { toast } from 'react-toastify';
import { FiLoader } from 'react-icons/fi'
import {QRCodeSVG} from "qrcode.react"
// import { FcLock } from "react-icons/fc";
// import { FaGooglePay } from "react-icons/fa";
// import { SiPaytm } from "react-icons/si";
import "./upi.css"
import { FaPen } from "react-icons/fa6";



const SendSupport = ({authorId, authorName}) => {

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
                // console.log("moni info@modal: ", response)
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
            <div 

            className='upi-loading'
            
            // style={{
            //     display:"flex",
            //     alignItems:"center",
            //     justifyContent:"center",
            //     // height:"60vh",
            //     flexDirection:"column",
            //     color: "#024524",
            // }} 
            
            ><h1><i>Connecting to the author's desk. . .</i></h1><span className="animate-spin-custom" ><FaPen color="#344e41" 
            className='upi-loader'
            /></span></div>
        )
    }


  return (
    <div  >
        {upiId? (
            <div 
            
            // style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"20px", fontFamily:"Sansation, sans-serif", padding:"30px" }}


            className='upi-id-message-box'
            
            >
                {/* <h2>Support the Author</h2> */}

                <h4>P2P UPI Payment with 0% Platform Fees</h4>

                {/* <p style={{ fontSize: "1.05rem",}} >Show your appreciation for this story.</p> */}
                <div 
                style={{ backgroundColor: "#3d6b4c", padding: "8px 20px", borderRadius: "4px", border: "1px dashed #cbd5e1", margin: "4px 0" }}
                >
                        <span className='amount-message'  style={{ fontWeight: "bold", color: "#e6ebf3", display: "block", textTransform: "uppercase" }}>Enter Amount On Your Phone</span>
                        <span
                        className='amount-choice-message'
                        
                        style={{ fontWeight: "800", color: "#faf8f5" }}
                        
                        >₹ Free Choice</span>
                    </div>

                <QRCodeSVG color='green' value={upiUrl}
                className='the-qr-code'
                level="H" />
                {/* <p style={{ marginTop: "10px", fontWeight: "bold" }}>{upiId}</p> */}

                {/* <p style={{ fontSize: "0.94rem", color: "#3b8a46" }}>Scan using Google Pay, PhonePe, or any UPI app • No Platform Fees</p> */}
                {/* <p style={{ fontSize: "0.94rem", color: "#3b8a46" }} >Scan using Google Pay, PhonePe, or any UPI app.</p> */}

                {/* <p style={{ fontSize: "0.88rem", fontWeight: "600", color: "#3b8a46", margin: 0, lineHeight:"1.2rem", textAlign:"center" }}>
                        {/* Scan via Google Pay, PhonePe, Paytm or any UPI app <br /> */}
                       
                    {/* Google Pay, PhonePe, Paytm all accepted here    
                    </p> */} 

                    {/* <FaGooglePay size={30} /> <SiPaytm size={30} /> */}

                    <div style={{ backgroundColor: "#ffffff", padding: "8px 24px", borderRadius: "4px", border: "1px dashed #000000", margin: "4px 0" }}>
                        <span
                        className='final-support-message'
                        
                        style={{fontWeight: "bold",display: "block", textTransform: "uppercase" }}>Scan QR code and send your support</span>
                    </div>
                    {/* <p>Author {authorName}</p> */}


            </div>
        ):(
            <div
            className='no-upi-message'
            >
                <p>This author hasn't configured their UPI ID yet.</p>
            </div>
        )}
    </div>
  )
}

export default SendSupport