// import React from 'react'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import services from "../../appwrite/major_config"
import { Query } from "appwrite"
import { toast } from "react-toastify"
import parse from "html-react-parser" // TinyCME render 
import "./readpost.css"
// import { FcClock } from "react-icons/fc";
import { FcSynchronize } from "react-icons/fc";
import { useNavigate } from "react-router-dom"
// import { FcPrevious } from "react-icons/fc";
import { IoIosArrowBack } from "react-icons/io";
const ReadPost = () => {

    const {slug} = useParams()
    // const {featuredImage} = useParams()
    // const {documentId} = useParams()
    const navigate = useNavigate()
    const backTopost = ()=>{
        navigate("/my-ink")
    }
    
    const LoggeduserId = useSelector((state)=> state.auth.userData.$id)
    const user = useSelector((state)=> state.auth.userData)

    const [openPost, setOpenPost] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("Post ID from URL:", slug);
    console.log("details:", user);
    // console.log("docid:", documentId);

    useEffect(()=>{
        const readPost = async()=>{
            setLoading(true)
            try{
                const fetchData = await services.getPost(slug)
                if(fetchData){
                    // toast.success("api successful")
                    console.log("api data: ", fetchData)
                    setOpenPost(fetchData)
                }else{
                    toast.error("Story not found");
                }
            }catch(err){
                toast.error(err.message || "Failed to load story");
            }finally{
                setLoading(false);
            }
        }
        if(slug){
            readPost()
        }



    },[slug])

    const calculateReadTime = (tinyMCEhtml)=>{
        
        if(!tinyMCEhtml){
            return "1 min read"
        }
        const cleanText = tinyMCEhtml.replace(/<[^>]*>?/gm, '')
        const wordCount = cleanText.trim().split(/\s+/).length;
        const time = Math.ceil(wordCount / 80);
        // console.log("timeout: ", time)
        if(time>1){
            return `${time} mins read`
        }
        return `${time} min read`
    }

    if (loading) {
        return <div className="readpost-loading">
            <h1>Opening...</h1>
            <span><FcSynchronize color="green" size={40}/></span>
        </div>
    }



  return (
    <div className="story-page-wrapper" >
    {/* <img src= alt="" /> */}
    <div className="story-header" >
        <img height="100%" width="100%" src={services.getFileView(openPost.featuredImage)} alt="" /> 

        <div className="story-banner-overlay">
            <h1>{openPost.title}</h1>
            <p>By: {user.name}</p>

            <div className="story-banner-details" >
                <span>{calculateReadTime(openPost.content)}</span>
                <button onClick={()=>backTopost()} type="button"><IoIosArrowBack size={35} /></button>
            
            </div>
            
        </div>
        


    </div>

    <div className="story-body" >
        {/* <button type="button">back</button> */}
        <article>
            <p>{parse(openPost.content)}</p>
        </article>

    </div>
    
    
    
    </div>
  )
}

export default ReadPost