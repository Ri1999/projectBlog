// import React from 'react'
import { useEffect, useState } from "react"
import services from "../../appwrite/major_config"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FiLoader } from "react-icons/fi";
import { RxReader } from "react-icons/rx";
import { SiReadthedocs } from "react-icons/si";
import { PiReadCvLogoThin } from "react-icons/pi";
import { SiWikibooks } from "react-icons/si";
import { toast } from "react-toastify"
import { AiOutlineRollback } from "react-icons/ai";
import "./authprofile.css"
import { PiPlantLight } from "react-icons/pi";
import { PiFlowerTulipLight } from "react-icons/pi";
import { PiFlowerLotusLight } from "react-icons/pi";
import { PiFlowerLotusFill } from "react-icons/pi";
import { GiLotus } from "react-icons/gi";
import { GiLotusFlower } from "react-icons/gi";
import { RiPenNibLine } from "react-icons/ri";
import { FcLike } from "react-icons/fc";
// import { GoFileSymlinkFile } from "react-icons/go";
// import { FcTreeStructure } from "react-icons/fc";
// import { useNavigate } from "react-router-dom"

const AuthorProflie = () => {

    // const {userId} = useParams()

    // just rename it for better understanding
    const  { userId: authorId } = useParams()
    const loggedInUserId = useSelector((state) => state.auth.userData?.$id);
    const navigate = useNavigate()

    const [authorPosts, setAuthorPosts] = useState([]);

    console.log("author id: ", authorId, "|", "loggedid: ", loggedInUserId)

    const selfProfile = loggedInUserId === authorId
    console.log("self profile: ", selfProfile)

    const [loading, setLoading] = useState(false)


    // if(selfProfile){
    //     navigate("/inkStation")
    // }
    useEffect(()=>{


        // if(selfProfile){
        //     navigate("/inkStation", { replace: true })
        // }

        const meetAuthor = async()=>{

            setLoading(true)
            try{
                const response = await services.getUserPosts(authorId)
                if(response){
                    console.log("its working...")
                    setAuthorPosts(response)
                }
            }catch(err){
                toast.error(err.message || "Pls try later")
            }finally{
                setLoading(false)
            }
        }
        meetAuthor() 


        

    },[selfProfile, navigate, authorId])

    if(loading){
        return "pls wait...."
    }
    

    console.log("author api data: ",authorPosts)
    // const authorName = authorPosts.documents[0]?.userName || "Anonymous Author";

    // const authorName = authorPosts.documents.filter((data)=> data.userName !==null)

//    const authorName = authorPosts.documents?.reduce((acc,post)=>{
//     if(post.userName !==null){

//         // console.log("reduce: ", post.userName, "|", typeof(acc),"|",acc+post.userName)

//         // console.log("did i catch: ", acc)
//         return acc+post.userName

//     }
//     return acc
//    },"")

const authorName = authorPosts.documents?.find(post => post.userName)?.userName || "Anonymous Author"

    console.log("author name: ", authorName)

    const publishedCount = authorPosts.documents?.filter(post => post.status === "active").length || 0;

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

        const authorRankName = getRank(publishedCount)

        const totalContent = authorPosts.documents?.reduce((total, post)=>{
            if(post.status==="active"){
                const cleanText = post.content.replace(/<[^>]*>?/gm, '')
                const wordCount = cleanText.trim().split(/\s+/).length;

                return total+wordCount
                
            }
            return total

        },0)

        console.log("testing: ", totalContent)
        const likeData = authorPosts.documents?.reduce((total, number)=>{
        return total + (number.like ?? 0)
    },0)

    const returnToStudy =()=>{
        navigate(-1)
    }



  return (
    <div className="author-container" >
        <h1>{authorName} <span style={{fontSize:"1.2rem"}} >({authorRankName.title})</span></h1>
        {/* <p>{publishedCount} Stories <SiWikibooks color="green" /></p> */}
        <div className="total-stats">
            <p><b>{publishedCount}</b> Stories <SiWikibooks size={28} color="green" /></p>
            <p><b>{totalContent}</b> Words <RiPenNibLine size={28} color="#0882a4" /></p>
            <p><b>{likeData}</b> Likes <FcLike size={25}  /></p>
        </div>
        {/* <hr /> */}
        <div className="author-content" >
            <div className="author-story-panel">
                {authorPosts.documents?.length === 0 ? (
                                    <div className="encourage"  >
                                        <h4>No ink spilled yet</h4>
                    
                                    </div>
                                ):(
                                    <div className="author-story" >
                                        {authorPosts?.documents
    ?.filter((post) => post.status === "active")
    ?.map((post) => (
        <div key={post.$id} className="story-card">
            <h3>{post.title}</h3>
            {/* <h3>test</h3> */}
            <li ><Link className="author-slug" to={`/my-ink/${post.slug}`} ><RxReader color="green" size={25} />/Start Reading</Link></li>
           
        </div>
    ))}
                                    </div>
                                )}
            </div>
            <div className="author-stats-panel">
                
                <button onClick={returnToStudy} type="button"><AiOutlineRollback size={28} />Back to Story</button>
            </div>
        </div>
    </div>
  )
}

export default AuthorProflie