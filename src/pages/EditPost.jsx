import React from 'react'
import { useState, useEffect } from 'react'
import services from '../appwrite/major_config'
import PostForm from '../components/PostForm.jsx/PostForm'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Container from '../components/container/Container'
// import { FcSynchronize } from "react-icons/fc";
import { FiLoader } from "react-icons/fi";

const EditPost = () => {

    const [data, setData] = useState(null)
    const { slug } = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{

        // post ka details nikalna warna edit mai toh empty hoga, continueation nhi hoga aur anomaly behavior hoga 

        const fetchPostDetails = async()=>{
            setLoading(true)
            try{

                const [fetchData] = await Promise.all([services.getPost(slug),

                    new Promise((resolve)=> setTimeout(resolve,1000))
                ])

                if(fetchData){
                    setData(fetchData)
                }else{
                    toast.error("Story not found");
                    navigate("/my-ink")
                }
            }catch(err){
                toast.error(err.message || "Failed to load story");
            }finally{
                setLoading(false);
            }
        }
        if(slug){
            // readPost()
            fetchPostDetails()
        }

    },[slug, navigate])

    const loadingAnimation ={
        animation: "spin 1s linear infinite"
    }

    if(loading){
        return (
            <div style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                height:"60vh",
                flexDirection:"column"
            }} ><h1><i>Loading story details...</i></h1><span style={loadingAnimation} ><FiLoader color="green" size={40}/></span></div>
        )
    }


  return (
    <div><Container>
        {/* props name in PostForm.jsx is postDataFromAppwrite so in here also props name must be same  */}
        <PostForm postDataFromAppwrite = {data} />

    </Container></div>
  )
}

export default EditPost