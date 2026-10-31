// import React from 'react'
import { useSelector } from "react-redux"
import services from "../appwrite/major_config"
// import Container from "../components/container/Container"
// import blogauthservice from "../appwrite/auth"
import { useState } from "react"
import { useEffect } from "react"
import "./dashboard.css"
// import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { FcApproval } from "react-icons/fc";
// import { Query } from "appwrite"
import { FiLoader } from "react-icons/fi";
import { MdPublishedWithChanges } from "react-icons/md";
import { MdUnpublished } from "react-icons/md";
import { Link } from "react-router-dom"
// import { PiPathLight } from "react-icons/pi";
// import { FcOpenedFolder } from "react-icons/fc";
import { FcTreeStructure } from "react-icons/fc";
// import { FcCableRelease } from "react-icons/fc";
// import { FcSerialTasks } from "react-icons/fc";
import { GoFileSymlinkFile } from "react-icons/go";
import { VscEditSparkle } from "react-icons/vsc";
import { PiPlantLight } from "react-icons/pi";
import { PiFlowerTulipLight } from "react-icons/pi";
// import { PiFlowerLotusThin } from "react-icons/pi";
import { PiFlowerLotusLight } from "react-icons/pi";
import { PiFlowerLotusFill } from "react-icons/pi";
import { GiLotus } from "react-icons/gi";
import { GiLotusFlower } from "react-icons/gi";
// import { FcDataSheet } from "react-icons/fc";
import { FcBullish } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
// import { VscReport } from "react-icons/vsc";
import { FiAlertTriangle } from "react-icons/fi";
// import { PiSkull } from "react-icons/pi";
import { CgDanger } from "react-icons/cg";
// import { AiTwotoneSafetyCertificate } from "react-icons/ai";
import { AiOutlineSafety } from "react-icons/ai";

const Dashboard = () => {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const userData = useSelector((state)=> state.auth.userData)
    // const userData = useSelector((state)=> state.auth.userData)
    const LoggeduserId = useSelector((state)=> state.auth.userData?.$id)
    // const dispatch = useDispatch()
// user
    // const [userName, setUserName] = useState("")
    const isverified = userData?.emailVerification
    // console.log("userdata: ", userData)
    // console.log("usersdetails: ", userData, "|", LoggeduserId)

    useEffect(()=>{

        const UserInsights = async()=>{
            setLoading(true)
            try{
                const response = await services.getUserPosts(LoggeduserId)
                // console.log("api okey: ", response)
                toast.success("Insights fetched!")
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
            <h1><i>Gathering your stats & insights...</i></h1>
            <span className="animate-spin-custom" ><FiLoader color="green" size={40}/></span>
        </div>
    }

    console.log("docs: ", posts.documents)

    const publishedCount = posts.documents?.filter(post => post.status === "active").length || 0;

    const reportPostData = posts.documents?.reduce((acc, post)=>{

        // before it was post.report !== 0
        if(post.report !== 0 && post.reportReasons && post.reportReasons.length > 0){
            // acc.push(post.title)
            // console.log("what reduce: ", post.title, "|", typeof(post.title))
            // acc.push(post.title)
            
            acc.push({
                title:post.title,
                reasons: post.reportReasons,
            })
            
        }
        // console.log("what is acc now: ", acc)
        return acc
    },[])

    console.log("test report titles: ", reportPostData)

    // console.log("did i get it: ", publishedCount)

    const likeData = posts.documents?.reduce((total, number)=>{
        return total + (number.like ?? 0)
    },0)
    const reportData = posts.documents?.reduce((total, number)=>{
        return total + (number.report ?? 0)
    },0)

    // const postLikes = likeData
    // console.log("testing: ", likeData)

    const getReportrank = (Count)=>{
        if( Count === 0){
            return {title:"Flawless",icon:<AiOutlineSafety color="#00b4d8" size={28} /> ,reportMessage:"Readers trust your voice—keep the ink flowing cleanly."}
        }
        if( Count >=1 ){
            return {title:"Report Addressed", icon:<CgDanger color="red" size={28} /> ,reportMessage:"Every drop of ink deserves a fair trial. If you believe these reports are misguided or unfair, you can challenge the stance. Once verified with proper proof, the flags will be completely wiped from your desk."}
        }
    }

    const reportRank = getReportrank(reportData)

    const getRank=(Count)=>{

        if(Count === 0){
            // return "Scoutinker" PiPlantLight
            return {title:"Ink Scout",icon:<PiPlantLight color="#0e740c" size={30} />,}

        }
        if(Count >=1 && Count <=4){
            return {title:"Ink Initiate",icon:<PiFlowerTulipLight color="green" size={30} />,}
        }
        if(Count >= 5 && Count <= 12){
            // return "Novinker"
            return {title:"Ink Novice",icon:<PiFlowerLotusLight color="green" size={30} />,}

        }
        if(Count >=13 && Count <=24){
            // return "Inkeliter"
            return {title:"Ink Artisan",icon:<PiFlowerLotusFill color="green" size={30} />,}

        }
        if(Count >= 25 && Count <=50){

            // return "Vetrinker"
            return {title:"Ink Veteran",icon:<GiLotus color="green" size={25} />,}
        }
        if(Count >=50){
            // return "Masterinker"
            return {title:"Ink Master",icon:<GiLotusFlower color="#e9285f" size={25} />,}
        }
    }

    const rank = (getRank(publishedCount))

    // console.log("what: ", rank.title)


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
                <h3 style={{textAlign:"center", fontSize:"2.1rem"}} >Ink-sights</h3>
                <p><b>{posts.total}</b> creation</p>

                {posts.documents?.length === 0 ? (
                    <div className="encourage"  >
                        <h4>No ink spilled yet</h4>
                        <p>Your writer's workspace is all set up. Draft a quick thought or publish your first piece now.</p>
                        <Link className="no-written" to="/spill-ink">spill Ink... <VscEditSparkle color="#da9005" size={26} /></Link>
                    </div>
                ):(
                    <div className="inksight-details" >
                    {posts.documents?.map((data)=>(
                    <div key={data.$id} className="display-inkfootPrint" style={{listStyle:"none", fontSize:"1.3rem",}}  >
                       
                        <li><b>{data.title}</b></li>
                        <li><b>state{data.status==="active"?<MdPublishedWithChanges color="green" />:<MdUnpublished color="#a3b18a" />}</b></li>
                        <li><b>{calculateWords(data.content)}</b> words spilled</li>
                        <li ><Link className="dashboard-slug" to={`/my-ink/${data.slug}`} ><GoFileSymlinkFile color="#da9005" size={25} />/inkPath</Link></li>
                        <li><button onClick={()=>handleShareStory(data.slug)} type="button"><FcTreeStructure size={25} /></button></li>
                    </div>
                )) }
                    </div>
                )}

                

            </div>
            <div className="right-side-Ink-pressions">
                <h3 style={{textAlign:"center", fontSize:"2.1rem"}}  >Ink-pressions <FcBullish/></h3>
                <p>You are a <b>{rank?.title}</b>{rank?.icon}</p>
                <h2>{likeData} <FcLike size={25} /> </h2>
                <h2>{reportData} <FiAlertTriangle color="#d90429" size={25} /></h2>
                <div className="ink-pression-report-ui" >
                <h3>Ink Integrity: {reportRank?.title} {reportRank?.icon}</h3>
                <p>{reportRank?.reportMessage}</p>
                {reportPostData && reportPostData.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left", width: "100%", backgroundColor: "#fff", padding: "15px", borderRadius: "8px", border: "1px solid #ffb703" }}>
            <h4 style={{ color: "#d90429", marginBottom: "10px", display: "flex", alignItems: "center", gap: "6px" }}>
                <FiAlertTriangle />Stories Review:
            </h4>
            {reportPostData.map((item, index) => {
                // Agar multiple reports hain ek story par, toh loop chala sakte hain
                return (
                    <div key={index} style={{ marginBottom: "12px", borderBottom: "1px solid #eee", paddingBottom: "8px" }}>
                        <p style={{ fontWeight: "bold", fontSize: "1rem", color: "#2b2b2b" }}>Reported Story: {item.title}.</p>
                        <p
                        style={{ fontWeight: "bold", fontSize: "1rem", color: "#2b2b2b" }}
                        >{item.reasons}.</p>
                        
                    </div>
                );
            })}
        </div>
    )}
                
                </div>

            </div>
        </div>

    </div>
  )
}

export default Dashboard