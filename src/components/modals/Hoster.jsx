// import React, { useContext } from 'react'
// import { createContext } from 'react'
// import { useContext } from 'react'
import HosterUi from './HosterUi'
import { hostStation } from './host'
import { useState } from 'react'

const Hoster = ({children}) => {

    const [open, setOpen] = useState(false)

    const [modalConfig, setModalConfig] = useState({
        title: "",
        message: "",
        onConfirm: null
    })

    const openModal=({ title, message, onConfirm })=>{
        setModalConfig({ title, message, onConfirm })
        setOpen(true)
    } 
    const closeModal=({ title, message, onConfirm })=>{
        // setModalConfig()
        setOpen(false)
        // after close reset configs
        setModalConfig({ title:"", message:"", onConfirm:null })
    }


  return (
    // <div>Hoster</div>
    <>
    <hostStation.Provider value={{open, modalConfig, openModal, closeModal}} >
        {children}
        <HosterUi/>
    </hostStation.Provider>
    </>
  )
}

export default Hoster
