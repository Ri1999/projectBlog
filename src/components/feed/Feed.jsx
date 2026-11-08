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
import PostCard from "../PostCard"
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

    if(loading || !feedData || !userData){
        return (
            <div style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                height:"60vh",
                flexDirection:"column",
            }} ><h1><i>Setting up the library...</i></h1><span className="spinning-animation" ><FiLoader color="green" size={40}/></span></div>
        )
    }

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
        <div className="search-feed-content">
            <form >
                <Input
                // label="test"
                placeholder="Search stories, authors, or tag (sfw, nsfw)"
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
            {filterFeedData?.length === 0 ? (
                <p style={{textAlign:"center", padding: "10%", color:"#012a35", fontFamily:"Fondamento, cursive", fontWeight:"600", fontSize:"1.4rem" }} >We couldn't find any stories matching that 😞</p>
            ): <div className="feed-grid-view" >
                {filterFeedData?.map((post)=>(
                    <PostCard key={post.$id} {...post} />
                ))}
            </div> }
        </div>

    </div>
  )
}

export default Feed