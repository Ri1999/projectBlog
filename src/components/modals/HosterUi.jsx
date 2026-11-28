// import React from 'react'
// import { myHostStation } from "./Hoster"
// import { hostStation } from "./Hoster"
import { hostStation } from "./host"
// import Hoster from "./Hoster"
import { useContext } from "react"
import { useSelector } from "react-redux"
// import { useSearchParams } from "react-router-dom"
// import services from "../../appwrite/major_config"
// import { useState } from "react"
import "./delete.css"
const HosterUi = () => {

    const { open, triggerDelete , openModal, closeModal, manualClose } = useContext(hostStation)
    const user = useSelector((state)=> state.auth.userData)
    // console.log("datas: ", user.name)

    // console.log("what: ",open,modalConfig)
    // const [searchParams, setSearchParams] = useSearchParams();
    // const StoryPage = window.location.pathname.includes("/my-ink/");

    // const [loading, setLoading] = useState(false)



    const overlayBox ={
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999 
    }
    const messageBox={
        backgroundColor: "#f5f4f3",
        padding: "24px",
        borderRadius: "6px",
        width: "90%",
        maxWidth: "400px",
        // boxShadow: "0 10px 25px rgba(166, 97, 97, 0.2)",
        // boxShadow: "0 5px 10px #283618",
        boxShadow: "0 4px 12px #3a2702",
        textAlign: "center",
        // border:"1px solid rgb(228, 210, 112)",
    }

    // const cancelButton={
    //     padding: "10px 16px",
    //     borderRadius: "6px",
    //     border: "1px solid #283618",
    //     backgroundColor: "#283618",
    //     cursor: "pointer",
    //     fontWeight: "500",
    //     color:"white",
    //     fontFamily:"Sansation, sans-serif",
    //     fontSize:"1rem",
    // }
    // const confirmButton={
    //     padding: "8px 16px",
    //     borderRadius: "6px",
    //     border: "none",
    //     backgroundColor: "#780000",
    //     color: "#fff",
    //     cursor: "pointer",
    //     fontWeight: "500",
    //     fontFamily:"Sansation, sans-serif",
    //     fontSize:"1rem",
    // }
    const stopBubble =(e)=>{
        e.stopPropagation(); 
    }

    // const findMe =()=>{
    //     console.log("i am clicked!")
    // }

    if (!open) return null;

  return (

    <div onClick={closeModal} style={overlayBox} >
        <div className="delete-message-box" onClick={stopBubble} style={messageBox} >
            {/* HosterUi */}
            
            <p className="delete-message-box-subtext" >{`Do you want to erase these words?`}</p>

            <div

            className="message-button-area"
            
            // style={{display:"flex", gap:"15px", justifyContent:"space-between", marginTop:"20px"}}
            
            >
                <button onClick={()=>{
                    // closeModal()
                    // findMe()
                    if(triggerDelete){
                        triggerDelete()
                    }
                    closeModal();

                }}
                className="deleteButton"
                type="button">Erase Forever</button>

                <button onClick={manualClose}
                className="cancelButton"
                
                type="button">Nevermind</button>

            </div>
            <p className="user-delete-message" >⚠️ <b style={{color:"#b54935"}} >Warning:</b> Once deleted, this content cannot be recovered from our databases.</p>

        </div>

    </div>
   
  )
}

export default HosterUi