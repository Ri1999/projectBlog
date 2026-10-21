// import React from 'react'
import storageService from "../appwrite/major_config"
import { Link } from 'react-router-dom'
import "../components/postcardStyle.css"
// import { MdOutlinePushPin } from "react-icons/md";
// import { GoPin } from "react-icons/go";
// import { TbPinFilled } from "react-icons/tb";
import { MdPublishedWithChanges } from "react-icons/md";
import { MdUnpublished } from "react-icons/md";

const PostCard = ({

    // this is Individual Story Card in Feed, clickable, beautiful Ui

    // $id is apwrite syntax
    $id, title,featuredImage, 
    slug,status


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
    



  return (

    //  to={`/post/${$id}`

    <Link className="link-dom" to={`/my-ink/${slug}`}  >
        <div className="postcard-container">
            {/* <TbPinFilled color="black" size={20} /> */}
            {/* {checkStatus(status)} */}
            {result? <MdPublishedWithChanges size={20} />:<MdUnpublished size={20} />}
            <div className="postcard-content">

                {/* testing purpose off */}
                
                <img src={storageService.getFileView(featuredImage)} alt="post_image" />

                {/* {$createdAt} */}

                {/* <img src="https://images.pexels.com/photos/39417700/pexels-photo-39417700.jpeg" alt="" /> */}


            </div>
            {/* testing purpose off */}

            <h2 style={{color:"white", backgroundColor:"#2c4a36", padding:"5px", width:"70%", borderRadius:"4px", }} >{title}</h2>

        </div>

    </Link>
  )
}

export default PostCard