// import React from 'react'
// import { myHostStation } from "./Hoster"
// import { hostStation } from "./Hoster"
import { hostStation } from "./host"
// import Hoster from "./Hoster"
import { useContext } from "react"
import { useSelector } from "react-redux"
const HosterUi = () => {

    const { open, modalConfig, openModal, closeModal } = useContext(hostStation)
    const user = useSelector((state)=> state.auth.userData)
    // console.log("datas: ", user.name)

    // console.log("what: ",open,modalConfig)

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
        backgroundColor: "#fff",
        padding: "24px",
        borderRadius: "12px",
        width: "90%",
        maxWidth: "400px",
        // boxShadow: "0 10px 25px rgba(166, 97, 97, 0.2)",
        boxShadow: "0 5px 10px #283618",
        textAlign: "center"
    }

    const cancelButton={
        padding: "10px 16px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        backgroundColor: "#283618",
        cursor: "pointer",
        fontWeight: "500",
        color:"white",
    }
    const confirmButton={
        padding: "8px 16px",
        borderRadius: "6px",
        border: "none",
        backgroundColor: "#780000",
        color: "#fff",
        cursor: "pointer",
        fontWeight: "500"
    }
    if (!open) return null;

  return (

    <div style={overlayBox} >
        <div style={messageBox} >
            {/* HosterUi */}
            <h3 style={{fontFamily:"Sansation, sans-serif", fontSize:"1.5rem"}} >{modalConfig.title ||"Delete" }</h3>
            <p style={{fontSize:"1.2rem"}} >{modalConfig.message || `${user.name} are you sure you want to delete this ?`}</p>

            <div style={{display:"flex", gap:"15px", justifyContent:"space-between", marginTop:"20px"}} >
                <button onClick={closeModal} style={cancelButton} type="button">Nevermind</button>
                <button
                onClick={()=>{
                    if(modalConfig.onConfirm){
                        modalConfig.onConfirm()
                        closeModal();
                    }
                }}
                
                style={confirmButton} type="button">Yes, delete it</button>

            </div>

        </div>

    </div>
   
  )
}

export default HosterUi