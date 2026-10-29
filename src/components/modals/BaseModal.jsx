// import React from 'react'
// import { hostStation } from './host'
// import { useSelector } from 'react-redux'
import { universalHostStation } from './host'
import { useContext } from 'react'
const BaseModal = ({children}) => {

    // const user = useSelector((state)=> state.auth.userData)

    const {univeModal, closeUniveModal,} = useContext(universalHostStation)
    // if(!)
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
        padding: "34px",
        borderRadius: "10px",
        width: "90%",
        maxWidth: "400px",
        // boxShadow: "0 10px 25px rgba(166, 97, 97, 0.2)",
        boxShadow: "0 5px 10px #283618",
        textAlign: "center",
        border:"1px solid rgb(228, 210, 112)",
    }
     const stopBubble =(e)=>{
        e.stopPropagation(); 
    }
    
    if(!univeModal){
        return null
    }

  return (
    <div className='univeUiContainer' onClick={closeUniveModal} style={overlayBox} >
        <div className='univeMessageBox' onClick={stopBubble} style={messageBox} >
            {children}
        </div>
    </div>
  )
}

export default BaseModal