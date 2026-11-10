// import React from 'react'
import Input from "../Input"
import { useState } from "react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Query } from "appwrite"
import services from "../../appwrite/major_config"
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
// import PostCard from "../PostCard"
// import { FcLibrary } from "react-icons/fc";
import FeedCard from "../feedCard/FeedCard"
import "./feed.css"

const Feed = () => {

    const [loading, setLoading] = useState(false)
    const [feedData, setFeedData] = useState(null)

    const userData = useSelector((state)=> state.auth.userData)

    console.log("userData: ", userData)
    

    const {register, handleSubmit, watch, formState: { errors, isSubmitting }} = useForm()

    const searchTerm = watch("feedSearch", "") || "";

    useEffect(()=>{
        const feedApi = async()=>{
            setLoading(true)
            try{
                const response = await services.allPost([Query.equal("status", "active")])
                if(response){
                    console.log("feed data: ", response)
                    setFeedData(response.documents)
                }
            }catch(err){
                toast.error(err.message || "Failed to fetch")
            }finally{
                setLoading(false)
            }
        }
        if(userData){
            feedApi()
        }

    },[userData])

    if(loading|| !userData){
        return (
            <div style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                height:"60vh",
                flexDirection:"column",
            }} ><h1 style={{color:"#e5b2a3",fontFamily:"Fondamento, cursive",}} ><i>gathering the latest tales. . .</i></h1><span className="spinning-animation" ><FiLoader color="#e90e0e" size={40}/></span></div>
        )
    }

    // if(feedData.total==0){
    //     return <div
    //     style={{
    //             display:"flex",
    //             alignItems:"center",
    //             justifyContent:"center",
    //             height:"60vh",
    //             flexDirection:"column",}}
    //     >
    //         <h1>Charukavya is freshly set and ready for its very first tale. Be the pioneer writer to drop the first ink here!</h1>
    //         <p>Write the First Story ✨</p>
    //     </div>
    // }

    const filterFeedData = feedData?.filter((post)=>{
        const query = searchTerm.toLowerCase();
        const titleMatch = post.title?.toLowerCase().includes(query);
        const authorMatch = post.userName?.toLowerCase().includes(query);
        const ratingMatch = post.contentRating?.toLowerCase().includes(query);
        const tagMatch = post.tags?.toLowerCase().includes(query) || false

        // tags data tags: "horror, fantasy, famous, gore, adult"

        return titleMatch || authorMatch || ratingMatch || tagMatch;

    })


  return (
    <div className="feed-container" >
        {/* <h1 style={{fontFamily: "Fondamento, cursive", textAlign:"right"}} >The ink library</h1> */}
        <div className="search-feed-content">
             {/* <span><FcLibrary size={42} /></span> */}
             <h1>tales</h1>
            <form className="feed-search-bar" onSubmit={(e) => e.preventDefault()} >
                <Input
                // label="test"
                placeholder="Type to search stories, authors (e.g., horror, fantasy, sfw, nsfw )"
                error={errors.feedSearch?.message}
                {...register("feedSearch",{
                    pattern:{
                        value: /^[a-zA-Z0-9\s.,!?-]*$/,
                        message: "Invalid search pattern. Try typing a title or author or tag" 
                    },
                    required: false,
                    maxLength:{
                        value:20,
                        message:"Search query is too long (max 20 characters)"
                    }
                })}
                
                
                />
            </form>

        </div>
        <div className="display-feed-content">
            {feedData?.length === 0 ? (
        // Case 1: Database me ek bhi post nahi hai (Pioneer State)
        <div style={{ textAlign: "center", padding: "10%", color: "#344e41", }}>
            <h1 style={{ fontWeight: "600", fontSize: "1.4rem", marginBottom: "1rem" , fontFamily: "Fondamento, cursive",}}>
                Charukavya is freshly set and ready for its very first tale. Be the pioneer writer to drop the first ink here!
            </h1>
            <p style={{ fontSize: "1.1rem",fontFamily: "Fondamento, cursive", }}>Be the one who writes the first story. ✨</p>
        </div>
    ) : filterFeedData?.length === 0 ? (
        // Case 2: Database me posts hain, par search match nahi hua
        <p style={{ textAlign: "center", padding: "10%", color: "#344e41", fontFamily: "Fondamento, cursive", fontWeight: "600", fontSize: "1.4rem" }}>
            We couldn't find any stories matching that 😞
        </p>
    ) : (
        // Case 3: Normal feed or search results grid
        <div className="feed-grid-view">
            {filterFeedData?.map((post) => (
                <FeedCard key={post.$id} {...post} />
            ))}
        </div>
    )}
            
        </div>

    </div>
  )
}

export default Feed