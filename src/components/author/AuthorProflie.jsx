// import React from 'react'
import { useEffect, useState } from "react"
import services from "../../appwrite/major_config"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { FiLoader } from "react-icons/fi";
import { toast } from "react-toastify"
import "./authprofile.css"

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


  return (
    <div className="author-container" ></div>
  )
}

export default AuthorProflie