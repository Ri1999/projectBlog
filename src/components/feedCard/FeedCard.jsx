// import React from 'react'

// import storageService from "../appwrite/major_config"
// import { storageService } from '../../appwrite/major_config';
import services from '../../appwrite/major_config';
import { Link } from 'react-router-dom'
import "./feedCard.css"
import { FcLike } from "react-icons/fc";
// import { LuBookUser } from "react-icons/lu";
// import { FcApproval } from "react-icons/fc";

const FeedCard = ({

    title,featuredImage, 
    slug,like,
    contentRating,userName,
    
   

}) => {

    

  return (
    
    <Link className='feed-link' to={`/ink-creations/${slug}`} >
    <div className='feedcard-container'>
        <div className="feedcard-content">
            <img src={services.getFileView(featuredImage)} alt="post_image" />

        </div>
        <div>
            <p style={{color:"#c1121f"}} >{like ?? 0}<FcLike  size={18} />
            
            </p>
            <div className="feed-name">
                <p className='feed-story-name' >{title || "Anonymous" }</p>
                <p className='feed-author' >{userName || "Anonymous"}</p>
                <p>{contentRating==="nsfw"?"18+":""}</p>
                {/* <p>{tags}</p> */}
            </div>
        </div>

    </div>

    </Link>
  )
}

export default FeedCard