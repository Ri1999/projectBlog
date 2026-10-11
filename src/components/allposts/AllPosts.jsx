// import React from 'react'
import services from "../../appwrite/major_config"
import parse from "html-react-parser" // TinyCME render 
import {toast} from "react-toastify"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Query } from "appwrite"
const AllPosts = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [readindPost, setReadindPost] = useState(null)

    const LoggeduserId = useSelector((state)=> state.auth.userData.$id)
    // const createdAt = useSelector((state)=> state.auth.userData.$createdAt)
    // console.log("test: ", LoggeduserId)
    // console.log("alldata: ", createdAt )

    useEffect(()=>{
        const myAllPosts = async ()=>{
            setLoading(true)
            try{
                const response = await services.allPost([Query.equal("userId", LoggeduserId),
                    Query.orderDesc("$createdAt")
                ])
                toast.success("api call okey")
                if(response){
                    console.log("apidata: ", response.documents)
                    setPosts(response.documents) // not [0] we need all 
                }
                
            }catch(err){
                toast.error(err.message || "Failed to fetch")
            }finally{
                setLoading(false)
            }
        }
        myAllPosts()

    },[LoggeduserId])

console.log("is correct: ", posts)
  return (
    <div>AllPosts</div>
  )
}

export default AllPosts