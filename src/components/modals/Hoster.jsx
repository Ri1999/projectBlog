// import React, { useContext } from 'react'
// import { createContext } from 'react'
// import { useContext } from 'react'
import HosterUi from './HosterUi'
import { hostStation } from './host'
import { useState } from 'react'
import { useEffect } from 'react'

const Hoster = ({children}) => {

    const [open, setOpen] = useState(false)

    const [triggerDelete, setTriggerDelete] = useState(null)

    const openModal=(deleteFunction)=>{
        // setModalConfig(true)
        setTriggerDelete(()=> deleteFunction) // deleteStory fucntion as param
        setOpen(true)

        // dummy entry
        // syntax - window.history.pushState(state, title, url)
        window.history.pushState({boxOpen: true},"")
        // console.log(window.history.state)
    } 
    const closeModal=()=>{
        setOpen(false)
        setTriggerDelete(null)
    }

    // what if user interact with browser's back button? modal suppose to be close right?
    // step1: push dummy entry in browser history
    // step2: use useEffect to listen back button and close modal
    // step3: when user manually clicked "Nevermind" step back once browser history

    useEffect(()=>{
        const handleBrowserState =(event)=>{

            // console.log("is pressed ", event.state);
            if(open){
                closeModal()
            }
        }
        // handleBrowserState()
        // syntax - window.addEventListener("popstate", fn) , 
        window.addEventListener("popstate", handleBrowserState);

        return ()=>{
            window.removeEventListener("popstate", handleBrowserState);
        }
    },[open])

    const manualClose =()=>{
        if(open){
            window.history.back();
        }
        closeModal()
    }


  return (
    // <div>Hoster</div>
    <>
    <hostStation.Provider value={{open, triggerDelete , openModal, closeModal, manualClose}} >
        {children}
        <HosterUi/>
    </hostStation.Provider>
    </>
  )
}

export default Hoster
