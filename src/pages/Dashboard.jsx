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
import { FcApproval } from "react-icons/fc";
// import { Query } from "appwrite"
import { FiLoader } from "react-icons/fi";
import { MdPublishedWithChanges } from "react-icons/md";
import { MdUnpublished } from "react-icons/md";
import { Link } from "react-router-dom"
import { PiPathLight } from "react-icons/pi";
const Dashboard = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const userData = useSelector((state)=> state.auth.userData)
    // const userData = useSelector((state)=> state.auth.userData)
    const LoggeduserId = useSelector((state)=> state.auth.userData?.$id)
    const dispatch = useDispatch()
// user
    const [userName, setUserName] = useState("")
    const isverified = userData?.emailVerification
    // console.log("userdata: ", userData)
    // console.log("usersdetails: ", userData, "|", LoggeduserId)

    useEffect(()=>{

        const UserInsights = async()=>{
            setLoading(true)
            try{
                const response = await services.getUserPosts(LoggeduserId)
                console.log("api okey: ", response)
                toast.success("UserInsights fetdced!")
                if(response){
                    setPosts(response)
                }
            

            }catch(err){
                toast.error(err.message || "Failed to fetch UserInsights!")
            }finally{
                setLoading(false)
            }
        }
        if(userData){
            UserInsights()
        }

    },[LoggeduserId])

    if (loading || !posts) {
        return <div className="readpost-loading">
            <h1><i>Gathering your thoughts...</i></h1>
            <span className="animate-spin-custom" ><FiLoader color="green" size={40}/></span>
        </div>
    }

    console.log("docs: ", posts.documents)

    const calculateWords = (tinyMCEhtml)=>{
        
        if(!tinyMCEhtml){
            return "10"
        }
        const cleanText = tinyMCEhtml.replace(/<[^>]*>?/gm, '')
        const wordCount = cleanText.trim().split(/\s+/).length;
        // const time = Math.ceil(wordCount / 80);
        // console.log("timeout: ", time)
        // if(time>1){
        //     return `${time} mins read`
        // }
        // return `${time} min read`
        return wordCount
    }

    const handleShareStory=(slug)=>{
        const shareUrl =`${window.location.origin}/my-ink/${slug}`
        navigator.clipboard.writeText(shareUrl);
        toast.success("Story link secured. Ready to share!")

    }




  return (
    <div className="dashboard-container" >
        <h1>Welcome, {userData?.name}{isverified && <FcApproval/>}</h1>
        <p>Email: <b>{userData?.email}</b></p>
        
        <div className="dashboard-content">
            <div className="left-side">
                <h3 style={{textAlign:"center", fontSize:"2.1rem"}} >My Ink Footprint</h3>
                <p><b>{posts.total}</b> Creation Inked</p>
                {posts.documents?.map((data)=>(
                    <div style={{listStyle:"none", fontSize:"1.3rem",}}  >
                       
                        <li><b>{data.title}</b></li>
                        <li>State<b>{data.status==="active"?<MdPublishedWithChanges color="green" />:<MdUnpublished color="#a3b18a" />}</b></li>
                        <li><b>{calculateWords(data.content)}</b> Words Spilled</li>
                        <li ><Link className="dashboard-slug" to={`/my-ink/${data.slug}`} >Inkpath<PiPathLight/></Link></li>
                    </div>
                )) }
            </div>
        </div>

    </div>
  )
}

export default Dashboard