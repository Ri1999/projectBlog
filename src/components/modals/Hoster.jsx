// import React, { useContext } from 'react'
// import { createContext } from 'react'
// import { useContext } from 'react'
import HosterUi from './HosterUi'
import { hostStation } from './host'
import { useState } from 'react'

const Hoster = ({children}) => {

    const [open, setOpen] = useState(false)

    const [triggerDelete, setTriggerDelete] = useState(null)

    const openModal=(deleteFunction)=>{
        // setModalConfig(true)
        setTriggerDelete(()=> deleteFunction) // deleteStory fucntion as param
        setOpen(true)
    } 
    const closeModal=()=>{
        // setModalConfig()
        setOpen(false)
        // after close reset configs
        // setModalConfig(false)
        setTriggerDelete(null)
    }


  return (
    // <div>Hoster</div>
    <>
    <hostStation.Provider value={{open, triggerDelete , openModal, closeModal}} >
        {children}
        <HosterUi/>
    </hostStation.Provider>
    </>
  )
}

export default Hoster
