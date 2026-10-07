// import React from 'react'
import { useSelector } from "react-redux"
import services from "../appwrite/major_config"
import Container from "../components/container/Container"
import blogauthservice from "../appwrite/auth"
import { useState } from "react"
import { useEffect } from "react"
import "./dashboard.css"
const Dashboard = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const userData = useSelector((state)=> state.auth.userData)

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
        <h1></h1> 

    </div>
  )
}

export default Dashboard