// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'

import { useEffect, useState } from 'react'
import './App.css'
import {useDispatch} from 'react-redux'
import blogauthservice from './appwrite/auth'
import { login, logout } from './store/authSlice';
import { Header, Footer } from './components';

function App() {

  // console.log(process.env.REACT_APP_APPWRITE_URL) // this not gonna work cause it works for create react setup, not npm react @vite setup

  // console.log(import.meta.env.VITE_APPWRITE_URL)

  // loading state if user login then show him Ui, otherwise show him differnt ui

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{
    // ask user if login or not?
    // since dont use try catch inside useEffect, use .then old method, but i like written try catch so i use async

    const checkUserStatus = async ()=>{

      setLoading(true)
      try{

        const userData = await blogauthservice.getCurrentUser()

        console.log("test : ", userData)
        if(userData){
          dispatch(login({userData})) // 
          // Send object with 'userData' key to match authSlice pattern

        }else{
          dispatch(logout())
        }

      }catch(err){
        console.error("checkUserStatus: ", err)
        dispatch(logout())
      }finally{
        setLoading(false)
      }


    }
    checkUserStatus()



  },[dispatch]) // just in case error free

  

  return !loading ? (
    <>
    <div className='app_container flexy' >
      <Header/>
      <Footer/>
    </div>
    
    </>
  )
  :
  (
    <>
    <div className='loading-screen flexy'>
      <h2>Loading...</h2>
    </div>
    
    </>
  )
}

export default App
