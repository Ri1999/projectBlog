// import React from 'react'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import services from "../../appwrite/major_config"
import { Query } from "appwrite"
import { toast } from "react-toastify"
import parse from "html-react-parser" // TinyCME render 
const ReadPost = () => {

    const {slug} = useParams()
    // const {documentId} = useParams()
    
    const LoggeduserId = useSelector((state)=> state.auth.userData.$id)

    const [readPost, setReadPost] = useState(null);
    const [loading, setLoading] = useState(true);

    console.log("Post ID from URL:", slug);
    // console.log("docid:", documentId);

    useEffect(()=>{
        const readPost = async()=>{
            setLoading(true)
            try{
                const fetchData = await services.getPost(slug)
                if(fetchData){
                    // toast.success("api successful")
                    console.log("api data: ", fetchData)
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
        const time = Math.ceil(wordCount / 200);
        return `${time} min read`
    }





  return (
    <div>ReadPost {slug}</div>
  )
}

export default ReadPost