// import React from 'react'
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import services from "../../appwrite/major_config"
// import { Query } from "appwrite"
import { toast } from "react-toastify"
import parse from "html-react-parser" // TinyCME render 
import "./readpost.css"
// import { FcClock } from "react-icons/fc";
// import { FcSynchronize } from "react-icons/fc";
// import { TbLoaderQuarter } from "react-icons/tb";
import { useNavigate } from "react-router-dom"
// import { BsEyeglasses } from "react-icons/bs";
// import { RxBlendingMode } from "react-icons/rx";
import { FiBookOpen } from "react-icons/fi";
// import { FcPrevious } from "react-icons/fc";
import { IoIosArrowBack } from "react-icons/io";
import { ImBin } from "react-icons/im";
import { FaPen } from "react-icons/fa6";
// import { VscReport } from "react-icons/vsc";
import { LuFlagTriangleRight } from "react-icons/lu";
// import { IoPartlySunnyOutline } from "react-icons/io5";
// import { FcLike } from "react-icons/fc";
// import { AiOutlineLike } from "react-icons/ai";
// import { BiSolidDislike } from "react-icons/bi";
import { FiAlertTriangle } from "react-icons/fi";
import { FcApproval } from "react-icons/fc";
import { hostStation } from "../modals/host"
import { useContext } from "react"
import { FiLoader } from "react-icons/fi";
// import { FaBookOpen } from "react-icons/fa";
// import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { FcLike } from "react-icons/fc";
import { FcDislike } from "react-icons/fc";

// import { VscColorMode } from "react-icons/vsc";
// import { TiWeatherPartlySunny } from "react-icons/ti";
// import { MdWbSunny } from "react-icons/md";
// import { BsMoonStars } from "react-icons/bs";
// report :
import SelectComponent from "../SelectComponent"

import { FiCoffee } from "react-icons/fi";
const ReadPost = () => {

    const {openModal} = useContext(hostStation)
    const [theme, setTheme] = useState(false)

    const toogleTheme=()=>{
        setTheme(!theme)
    }

    // console.log("what is theme: ", theme)

// console.log("test props: ", openModal)

    const {slug} = useParams()
    // const {status} = useParams()
    // const {status} = useParams()
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

    // console.log("Post ID from URL:", slug);
    // console.log("details:", user);
    // console.log("docid:", status);

    useEffect(()=>{
        const readPost = async()=>{
            setLoading(true)
            try{
                const fetchData = await services.getPost(slug)
                if(fetchData){
                    // toast.success("api successful")
                    console.log("apidata@readpost: ", fetchData)
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
    
    const checkStatus =(value)=>{
        if(value==="active"){
            return true
        }else{
            return false
        }
    }
    

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

    if (loading || !openPost) {
        return <div className="readpost-loading">
            <h1><i>Gathering the words...</i></h1>
            <span className="animate-spin-custom" ><FiLoader color="green" size={40}/></span>
        </div>
    }

    const owner = LoggeduserId === openPost.userId
    const fileID = openPost.$id 
    const greentick = user.emailVerification

    // console.log("works: ", owner)
    // console.log("works for fireld: ", fileID)
    // console.log("tick: ", greentick)
    const statusOfStory = checkStatus(openPost.status)
    // console.log("my prog: ", statusOfStory)

    const deleteStory = async()=>{
        setLoading(true)
        try{
            await services.deletePost(fileID)
            // it returns a empty object 
            toast.success("Removed from Inkflow!")
            navigate("/my-ink")
            
        }catch(err){
            toast.error(err.message ||"Failed to delete!")
        }finally{
            setLoading(false)
        }
    }

    const handleEdit = () => {
    navigate(`/spill-ink/${openPost.slug}`)
    // /spill-ink/:slug
}

//  like and dislike logic writes

const handleLike = async()=>{

    const disLikefromApi = openPost.dislikedBy ?? []
    const likefromApi = openPost.likedBy ?? []

// console.log("test dislike : ", disLikefromApi)

// console.log("test like : ", likefromApi)


    // true false data
    const isUserLike = likefromApi.includes(LoggeduserId)
    const isUserDislike = disLikefromApi.includes(LoggeduserId)

 
    let updateLikeArray = [...likefromApi]
    let updateDislikeArray = [...disLikefromApi]

    if(isUserLike){
        // save data where loggeduserId not present
        updateLikeArray = updateLikeArray.filter((id)=> id!== LoggeduserId)

    }else{
        // new so push her id
        updateLikeArray.push(LoggeduserId)
        // she like that so she cant be dislike 
        if(isUserDislike){

            
            updateDislikeArray = updateDislikeArray.filter((id)=> id!== LoggeduserId)
        }
    }
    // quick ui update firstly via data --> notce anomaly
    // const newUpdatePostState ={
    //     ...openPost,
    //     likedBy: updateLikeArray,
    //     dislikeBy: updateDislikeArray,
    //     like: updateLikeArray.length,
    //     dislike: updateDislikeArray.length,
    // }
    // setOpenPost(newUpdatePostState)

    // now backend update
    // setLoading(true)
    try{
        const response = await services.updatePostStats(openPost.$id,{
            // ...openPost,
            likedBy: updateLikeArray,
        dislikedBy: updateDislikeArray,
        like: updateLikeArray.length,
        dislike: updateDislikeArray.length,

        })
        // go fot the Pessimistic approach --> no anomaly
        if(response){
            setOpenPost(response)
            // toast.success("Reaction successfully!")
        }

    }catch(err){
        toast.error(err.message || "failed to update reaction!")
    }finally{
        // setLoading(false)
    }

}

// const like = openPost.like
// console.log("my likes: ", like)

// const handleLike =()=>{

    
    const handleDislike = async ()=>{

        // take array data for both
        const apiDislike = openPost?.dislikedBy ?? []
        const apiLike = openPost?.likedBy ?? []

        // check both dislike and like bu user
        // const isDisliked = openPost.dislikedBy.includes(LoggeduserId)
        // const isliked = openPost.likedBy.includes(LoggeduserId)

        // safety purposes

        const isDisliked = apiDislike.includes(LoggeduserId)
        const isliked = apiLike.includes(LoggeduserId)

        let updateDislikeArray = [...apiDislike] 
        let updateLikeArray = [...apiLike]

        if(isDisliked){
            // if alredy dislike, then click gonna remove dislike
            updateDislikeArray = updateDislikeArray.filter((id)=> id!== LoggeduserId)
            

        }else{
            // fresh dislike so simply push
            updateDislikeArray.push(LoggeduserId)
            // she cant dislike like same time of remove her from like too, if she like
            if(isliked){
                updateLikeArray = updateLikeArray.filter((id)=> id!== LoggeduserId)
            }
        }

        // at first quick ui update --> test 1 : notice anomaly
        // const newUpdatePostState = {
        //     ...openPost,
        //     dislike: updateDislikeArray.length,
        //     dislikedBy: updateDislikeArray,
        //     like: updateLikeArray.length,
        //     likedBy: updateLikeArray,
        // }
        // setOpenPost(newUpdatePostState)


        // now the backend update
        // setLoading(true)
        try{
            const response = await services.updatePostStats(openPost.$id,{
                dislike: updateDislikeArray.length,
            dislikedBy: updateDislikeArray,
            like: updateLikeArray.length,
            likedBy: updateLikeArray,
            })

            // what happend if i save after backend , // go fot the Pessimistic approach --> no anomaly

            // if(response){
            //     toast.success("dislike api ok!")
            // }
            if(response){

                setOpenPost(response)
                // toast.success("dislike api ok!")
            }

        }catch(err){
            toast.error(err.message || "failed to update reaction!")
        }finally{
            // setLoading(false)
        }

    }

    // const userDislikePost = openPost?.dislikedBy.includes(LoggeduserId)
    // const userLikePost = openPost?.likedBy.includes(LoggeduserId)



    // handle report

    const handleReport = async()=>{
        const reportArrayfromApi = openPost?.reportBy ?? []

        const isReported = reportArrayfromApi.includes(LoggeduserId)

        let updateReportArray = [...reportArrayfromApi]

        // if reported then we gonna remove it
        if(isReported){
            updateReportArray = updateReportArray.filter((id)=> id!== LoggeduserId)
        }else{
            updateReportArray.push(LoggeduserId)
        }
        try{
            const reportResponse = await services.updatePostStats(openPost.$id,{
                report: updateReportArray.length,
                reportBy: updateReportArray,
            })
            if(reportResponse){
                setOpenPost(reportResponse)
                toast.success("report reaction ok!")
            }
        }catch(err){
            toast.error(err.message || "failed to update report")
        }
    }



  return (
    <div className="story-page-wrapper" >
    {/* <img src= alt="" /> */}
    <div className="story-header" >
        <img height="100%" width="100%" src={services.getFileView(openPost.featuredImage)} alt="" /> 

        <div className="story-banner-overlay">
            <h1>{openPost.title}</h1>
            <p>Written by: {user.name}{greentick && <FcApproval/>}</p>

            <div className="story-banner-details" >
                <span>{calculateReadTime(openPost.content)} <b>{statusOfStory? "Published":"Draft"}</b></span>

{/* onClick={()=>deleteStory()} */}
            {owner && <button className="delete-button" onClick={()=>{
                openModal(deleteStory)
                // size={25} 
            }} type="button"><ImBin className="delete-icon" /></button>}

            {/* <button type="button"><FaPen size={20} /></button> */}

            {owner && <button onClick={()=>handleEdit()} type="button"><FaPen className="edit-icon" /></button>}

            {/* like button */}

            <button className="like-button" disabled={loading} onClick={handleLike} type="button">< BiSolidLike className="like-icon"  /></button>

            {/* dislike */}

            <button className="dislike-button" disabled={loading} onClick={handleDislike} type="button">< BiDislike className="dislike-icon"
            /></button>

            {/* report  - condition is !owner*/}

            <button className="report-button" onClick={handleReport} type="button"><FiAlertTriangle className="report-icon" /></button>


                <button onClick={()=>backTopost()} type="button"><IoIosArrowBack className="back-arrow-icon" /></button>

            
            </div>
            
        </div>
        


    </div>

    <div style={{backgroundColor:theme?"#cbcac8":"#F8F9FA"}} className="story-body" >
        <p><FcLike size={18} /> {openPost?.like ?? 0} <FcDislike size={18} /> {openPost?.dislike ?? 0} 

            <span><button onClick={()=>toogleTheme()} type="button">mode {theme?<FiBookOpen color="#6b0504" size={28} />:<FiCoffee color="#6b0504" size={28} />}</button></span>
            <>
            <FiAlertTriangle size={18} color="#da9005" /> {openPost?.report ?? 0}</>
        </p>
        {/* <p></p> */}
    
        
        {/* <button type="button">back</button> */}
        <article style={{fontFamily:"inherit !important", fontSize:"inherit !important", color:theme?"#2d2216":"#34404b"}} >
            {parse(openPost.content)}
        </article>

    </div>
    
    
    
    </div>
  )
}

export default ReadPost