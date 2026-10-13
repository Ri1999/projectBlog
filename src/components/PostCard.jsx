// import React from 'react'
import storageService from "../appwrite/major_config"
import { Link } from 'react-router-dom'
import "../components/postcardStyle.css"

const PostCard = ({

    // this is Individual Story Card in Feed, clickable, beautiful Ui

    // $id is apwrite syntax
    $id, title,featuredImage, 
    slug


}) => {

    // console.log("test001: ", featuredImage)
    // console.log(storageService.getFileView(featuredImage))


  return (

    //  to={`/post/${$id}`

    <Link className="link-dom" to={`/your-ink/${slug}`}  >
        <div className="postcard-container">
            <div className="postcard-content">

                {/* testing purpose off */}

                <img src={storageService.getFileView(featuredImage)} alt="post_image" />

                {/* {$createdAt} */}

                {/* <img src="https://images.pexels.com/photos/39417700/pexels-photo-39417700.jpeg" alt="" /> */}


            </div>
            {/* testing purpose off */}

            <h2 style={{color:"white", backgroundColor:"#2c4a36", padding:"5px", width:"50%", borderRadius:"4px"}} >{title}</h2>

        </div>

    </Link>
  )
}

export default PostCard