// import React from 'react'
import storageService from "../appwrite/major_config"
import { Link } from 'react-router-dom'
import "../components/postcardStyle.css"

const PostCard = ({

    // this is Individual Story Card in Feed, clickable, beautiful Ui

    // $id is apwrite syntax
    $id, title,featuredImage 

}) => {
  return (

    //  to={`/post/${$id}`

    <Link className="link-dom" to={`/post/${$id}`}  >
        <div className="postcard-container">
            <div className="postcard-content">

                {/* testing purpose off */}
                {/* <img src={storageService.getFilePreview(featuredImage)} alt={title} /> */}
                <img src="https://images.pexels.com/photos/39417700/pexels-photo-39417700.jpeg" alt="" />


            </div>
            {/* testing purpose off */}

            {/* <h2>{title}</h2> */}
            <h2>Title</h2>

        </div>

    </Link>
  )
}

export default PostCard