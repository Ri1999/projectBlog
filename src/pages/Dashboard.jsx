// import React from 'react'
import { useSelector } from "react-redux"
import services from "../appwrite/major_config"
// import Container from "../components/container/Container"
import blogauthservice from "../appwrite/auth"
import { useState } from "react"
import { useEffect } from "react"
import "./dashboard.css"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
const Dashboard = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const userData = useSelector((state)=> state.auth.userData)
    const dispatch = useDispatch()
// user
    const [userName, setUserName] = useState("")
    const isOAuthUser = userData?.emailVerification && !userData?.passwordUpdate;


    useEffect(()=>{
        const userDashboard = async ()=>{
            setLoading(true)
            try{
                if(userData?.$id){
                    const post =  await services.getUserPosts(userData.$id)
                    if(post){
                        setPosts(post)
                    }
                }
            }catch(err){
                console.error("userDashboard: ", err)
            }finally{
                setLoading(false)
            }
        }
        userDashboard()

    },[userData])

    console.log("userdata: ", userData)


  return (
    <div className="dashboard-container" >
        <h1>Welcome, {userData?.name}</h1>
        <p>Email: <b>{userData?.email}</b></p>
        
        <div className="dashboard-content">
            <div className="officail-left-side">
                <h2>Identity</h2>
                <button type="button">Change Dispaly name</button>
                {isOAuthUser? (
                    <div style={{textAlign:"left", margin:"5px"}} >You signed in with OAuth, password management is handled directly by your provider.</div>
                ):(
                    <>
                    </>
                )}

            </div>
            <div className="inkwall-metrics-right-side">
                <h2>Ink Metrics</h2>
            </div>
        </div>

    </div>
  )
}

export default Dashboard