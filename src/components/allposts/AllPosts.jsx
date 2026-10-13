// import React from 'react'
import services from "../../appwrite/major_config"
import parse from "html-react-parser" // TinyCME render 
import {toast} from "react-toastify"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { Query } from "appwrite"
import PostCard from "../PostCard"
import "./allposts.css"
const AllPosts = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [readindPost, setReadindPost] = useState(null)

    const LoggeduserId = useSelector((state)=> state.auth.userData.$id)
    // const createdAt = useSelector((state)=> state.auth.userData.$createdAt)
    // console.log("test: ", LoggeduserId)
    // console.log("alldata: ", createdAt )
    const userData = useSelector((state)=> state.auth.userData)
    console.log("user info: ", userData)

    // time of creation

    function timeOfCreation(apidatatime){

        const storydate = new Date(apidatatime)
        const currentdate = new Date()

        // find difference
        const diffInMiliseconds = currentdate - storydate;
        // change into in seconds
        const diffInSeconds = Math.floor(diffInMiliseconds / 1000);

        // easy condition
        if(diffInSeconds < 60){
            return "Just now"
        }
        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if(diffInMinutes < 60){
            return `${diffInMinutes}m ago`
        }
        const diffInHours = Math.floor(diffInMinutes / 60);
        if(diffInHours < 24){
            return `${diffInHours}h ago`
        }
        const diffInDays = Math.floor(diffInHours / 24);
        if(diffInDays === 1){
            return "Yesterday"
        }else{
            return storydate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }


    }
    




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
    <div className="story-outer-container" >
        <h1>Your Stories</h1>
        {/* grid container */}
        <div className="grid-container" >
            {posts.map((post)=>(
                <div key={post.$id} className="story-card-wrapper" >
                    <PostCard {...post} />
                    <p>created: {timeOfCreation(post.$createdAt)}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default AllPosts