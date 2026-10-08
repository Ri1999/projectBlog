import React from 'react'
import { useForm } from "react-hook-form"
import Input from "../Input"
import SelectComponent from "../SelectComponent"
import RTE from "../RTE/RTE"                  
import blogauthservice from "../../appwrite/auth"   // auth related
import services from "../../appwrite/major_config" // database related
import { useNavigate } from "react-router-dom" // after posting redirect her
import { useSelector } from "react-redux" // identify who creates post
import { useCallback, useEffect } from "react"
import "./postform.css"



const PostForm = ({postDataFromAppwrite}) => {

    // why need this props? what purpose?
    // ans: i fetch userData from direct appwrite and pass via props, so i need this.

    const userData = useSelector((state)=> state.auth.userData) // naming is same as i did in authslice.js

    const navigate = useNavigate()

    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        // watch same as useState keep eye on live input values 

        // setValue can change slug name into user's own ideas

        // getValues reads current values without rerender 

        defaultValues:{
            title: postDataFromAppwrite?.title || "",
            slug: postDataFromAppwrite?.$id || "",
            content: postDataFromAppwrite?.content || "",
            status: postDataFromAppwrite?.status || "active",
        }
    })

// useCallback to optimize and stop it from unwanted rerendering
// why need this? SEO-friendly URLs, "react-19---next.js-masterclass-" $\rightarrow$ Clean Slug: "react-19-next-js-masterclass"

// --------------- old code -------------------------------------------------
    // const slugTransform=(value)=>{

    //     if( value && typeof value === "string" ){
    //         return value.trim().toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "-")
    //     }
    // }
//------------------------------------------------------------------------------    

    const newslugTransform = useCallback((value)=>{

        if(value && typeof value === "string"){

            // want my personal brand name here
            const slug = value.trim().toLowerCase().replace(/[^a-zA-Z0-9\s]/g, "").replace(/\s+/g, "-")
// TODO Future Enhancements:
// - Appwrite Slug Collision Handler: Add unique suffix (`-at-charukavya`) on post creation.
            return `${slug}`

        }
        return ""

    },[])

    // real time watching work bind watch+newslugTransform inside useEffect, so that set slug according to the title

    useEffect(()=>{

        const subs = watch((formData,{name})=>{
            // value,{name} --> means name destrucutre

            // watch(param1, param2) --> entire form currentState data, and specific filed naming : explain like
// array.forEach((item, index) => { ... })  
// // formData  --> Form ke saare fields ka LIVE data (Title, Slug, Content, Status)
// { name }  --> Metadata se destructure kiya gaya specific field jisme change hua               
            if(name==="title"){

                // setValue(fieldName,newValue, [options])

                // iska mtlb newslugTransform(value.title) function run hokr jo value milega usse slug mai daal doh
                // fieldName is wrtitten here as string , 
                setValue("slug", newslugTransform(formData.title), 
                {shouldValidate: true}) // validate the whole operation
            }
        })

        return ()=> subs.unsubscribe();
    }, [watch, newslugTransform, setValue])

    // handle submit
    const postSubmit = async (data)=>{
    
// services.uploadFile(file), and using <input type="file" {...register("image")} /> , 
//it look like :

// data.image = [File {name: "my-photo.png", size: 204800, type: "image/png", ...raw binary data}]}
// data.image is whole array, data.image[0] actual imagefile

// two possibilities in edit , either she change image or tile and content etc
// if she change image --> upload new file --> delete old file --> appwrite database update


    // her edit mode : nutshell logic

// blogpost a gaya --> mera gf await services.uploadFile(data.image[0]) se new photi set karegi, warna null karegi mtlb phot same rakhegi --> agr photo change kiya toh services.deleteFile(blogPost.featuredImage) seh old photo haat jaega --> databse mai update hoga --> blogpost.$id se hamara slug set kiya hai, slug uha se milega, ...data se new dataset milega, aur uss spread data seh featureImage kah condition hai agr photo new set kiya hai toh uska path .$Id warna purana blogPost.featuredImage hi rahega
// aur ae saab karne keh baad agr database update sucessful hua tph gf koh navigate kaar denge update hua uski location pr dataBasePost.$id
    

    if(postDataFromAppwrite){

        // she choose either edit photo or left it
        const editPhoto = data.image[0]? await services.uploadFile(data.image[0]): null
        // if photo editied delete her old photo
        if(editPhoto){
            await services.deleteFile(postDataFromAppwrite.featuredImage)
        }
        // update her whole data inside database 
        const dbUpdate = await services.updatePost(postDataFromAppwrite.$id,{
            // 
            ...data,
            featuredImage: editPhoto? editPhoto.$id: postDataFromAppwrite.featuredImage
        })
        // navigate her that post page
        if(dbUpdate){
            navigate(`/post/${dbUpdate.$id}`)
        }

    }else{

        // upload her photo: create mode

        // she choose either attach photo or left it null
        const newPhoto = data.image[0] ? await services.uploadFile(data.image[0]) : null

        if(newPhoto){
            const fileId = newPhoto.$id
            data.featuredImage = fileId
        }
        // after photo upload create her a new post at database

        const dbNewPost = await services.createPost({
                ...data,
                featuredImage: newPhoto? newPhoto.$id : undefined ,
                userId: userData.$id
        })
            // after databse update navigate her that post location
        if(dbNewPost){
            navigate(`/post/${dbNewPost.$id}`)
        }
        
    }
}


  return (
    <div className='postform-container' >
        {/* testing */}
        <form className='postform-content' >

            <div className="postform-upload-area">

                <div className="left-content">

                <Input
                className="test"
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/webp "
                {...register("image",{ required: !postDataFromAppwrite?"required":false,

                    validate:{
                        lessThan2MB:(files)=>
                            !files[0] || files[0]?.size <=2* 1024*1024 ||"Max file size allowed is 2MB!",
                        acceptedFormats:(files)=>
                            !files[0] || ["image/jpg","image/jpeg", "image/png", "image/webp"].includes(files[0]?.type) || "Only JPG, PNG, and WEBP files are allowed!"
                    }
                 }
                )}




                />
                <p>(max file size: <b>2MB</b> | supported formats: <b>jpg,png,jpeg, webp</b>)</p>

                <SelectComponent
                label="Status"
                className="test"
                options={["Active","Inactive"]}
                
                {...register("Status", {required: true})}
                
                />
                <p>(Status| <b>active:Publish | inactive:Draft</b>)</p>
                <button onSubmit={handleSubmit(postSubmit)} type="submit">{postDataFromAppwrite ? "Update Post" : "Publish"}</button>

                </div>

                <div className="right-content">

                <Input
                label="Title"
                placeholder="Enter post title"
                {...register("title",{ required: true })}
                />
                <Input
                label="Slug"
                placeholder="Auto-generated slug"
                {...register("slug",{ required: true })}
                onInput={(e)=>{
                    setValue("slug", newslugTransform(e.currentTarget.value),
                    { shouldValidate: true }
                
                )
                }}
                
                />
                </div>

            </div>

            <div className="postform-written-area">


                <RTE
                className="writepad"
                name="content" 
                control={control} 
                label="Writing Pad"
                defaultValue={getValues("content")}
                
                />


            </div>
            
        </form>



    </div>
  )
}

export default PostForm