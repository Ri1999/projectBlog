// import React from 'react'
import storageService from "../appwrite/major_config"
import { Link } from 'react-router-dom'
import "../components/postcardStyle.css"
// import { MdOutlinePushPin } from "react-icons/md";
// import { GoPin } from "react-icons/go";
// import { TbPinFilled } from "react-icons/tb";
import { MdPublishedWithChanges } from "react-icons/md";
import { MdUnpublished } from "react-icons/md";
// import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
// import { SlLike } from "react-icons/sl";
// import { BiLike } from "react-icons/bi";
// import { BiDislike } from "react-icons/bi";

const PostCard = ({

    // this is Individual Story Card in Feed, clickable, beautiful Ui

    // $id is apwrite syntax
    $id, title,featuredImage, 
    slug,status,like,dislike,report,


}) => {

    // console.log("test001: ", status)
    // console.log(storageService.getFileView(featuredImage))
    const checkStatus = (status)=>{
        if(status==="inactive"){
            return false
        }else{
            return true
        }
    }
    const result = checkStatus(status)

    // console.log("likes: ", like)
    // console.log("dislikes: ", dislike)
    // console.log("reports: ", report)
    



  return (

    //  to={`/post/${$id}`

    <Link className="link-dom" to={`/my-ink/${slug}`}  >
        <div className="postcard-container">
            {/* <TbPinFilled color="black" size={20} /> */}
            {/* {checkStatus(status)} */}
            {result? <MdPublishedWithChanges color="#386641" size={20} />:<MdUnpublished color="#a3b18a" size={20} />}
            <div className="postcard-content">

                {/* testing purpose off */}
                
                <img src={storageService.getFileView(featuredImage)} alt="post_image" />

                {/* {$createdAt} */}

                {/* <img src="https://images.pexels.com/photos/39417700/pexels-photo-39417700.jpeg" alt="" /> */}


            </div>
            {/* testing purpose off */}
            <p style={{color:"#c1121f"}} >{like ?? 0} <FcLike  size={18} /></p>
            <h2 style={{padding:"5px", width:"70%", borderRadius:"3px", }} >{title}</h2>

        </div>

    </Link>
  )
}

export default PostCard