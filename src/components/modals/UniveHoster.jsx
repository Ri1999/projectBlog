import  { useEffect } from 'react'
import { universalHostStation } from './host'
import { useState } from 'react'
import BaseModal from './BaseModal'
const UniveHoster = ({children}) => {

    const [univeModal, setUniveModal] = useState(null)

    const openUniveModal = (Component, props={})=>{ // capital C is needed, must
        setUniveModal({Component, props})

        // it becomes: univeModal({ Component:<ReportModal/> props: })
        //                                   (without < /> brackets ),

        window.history.pushState({univeOpen: true},"")
    }

    const closeUniveModal = ()=>{
        setUniveModal(null)
    }

    useEffect(()=>{
        
        const handleBrowserState=()=>{
            // closeUniveModal()
            if(univeModal){
                closeUniveModal()
            }
        }
        window.addEventListener("popstate", handleBrowserState)
        return ()=>{
            window.removeEventListener("popstate", handleBrowserState);
        }

    },[univeModal])

    const manualCloseUniveModal =()=>{
        if(univeModal){
            window.history.back()
        }
        closeUniveModal()
    }

    const DynamicComponent = univeModal?.Component;
    // it gives us <ReportModal/> or <ExampleModal/>


  return (
    // <div>UniveHoster</div>
    <>
    <universalHostStation.Provider value={{univeModal,openUniveModal, closeUniveModal, manualCloseUniveModal}} >
        {children}
        {univeModal && DynamicComponent && (
            <BaseModal>
            {/* this is basically <ReportModal {...univeModal.props} closeUniveModal={closeUniveModal} /> */}
            <DynamicComponent {...univeModal.props} closeUniveModal={closeUniveModal} />
            
            </BaseModal>
        )}
    </universalHostStation.Provider>
    </>
  )
}

export default UniveHoster