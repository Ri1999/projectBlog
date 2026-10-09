// import React from 'react'
import { useForm } from "react-hook-form"
import Input from "../Input"
import SelectComponent from "../SelectComponent"
import RTE from "../RTE/RTE"                  
// import blogauthservice from "../../appwrite/auth"   // auth related
import services from "../../appwrite/major_config" // database related
import { useNavigate } from "react-router-dom" // after posting redirect her
import { useSelector } from "react-redux" // identify who creates post
import { useCallback, useEffect } from "react"
import { toast } from 'react-toastify'
import "./postform.css"



const PostForm = ({postDataFromAppwrite}) => {

    // why need this props? what purpose?
    // ans: i fetch userData from direct appwrite and pass via props, so i need this.

    const userData = useSelector((state)=> state.auth.userData) // naming is same as i did in authslice.js

    const navigate = useNavigate()

    const {register, handleSubmit, watch, setValue, control, getValues, formState: { errors}} = useForm({
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
     
        // console.log(" TRIGGERED:", data);--> testing 
    
// two possibilities in edit , either she change image or tile and content etc
// if she change image --> upload new file --> delete old file --> appwrite database update
    const rawContent = data.content || ""
    const extractText = rawContent.replace(/<[^>]*>/g, '').trim()

    if(extractText.length < 50){
        toast.error("A picture says a thousand words, Please write min 50 characters")
        return;
    }



    if(postDataFromAppwrite){

        // she choose either edit photo or left it:

        const editPhoto = data.image[0]? await services.uploadFile(data.image[0]): null
        // if photo editied delete her old photo
        if(editPhoto && postDataFromAppwrite.featuredImage){
            const deleted = await services.deleteFile(postDataFromAppwrite.featuredImage)
            if(deleted){
                toast.success("Old image deleted successfully!")
            }
        }
        // update her whole data inside database 
        const dbUpdate = await services.updatePost(postDataFromAppwrite.$id,{
            // 
            ...data,
            featuredImage: editPhoto? editPhoto.$id: postDataFromAppwrite.featuredImage
            // no need to do userid, you can but not necessary
        })
        toast.success("Story polished to perfection!")
        // navigate her that post page
        if(dbUpdate){
            navigate(`/`) // tempoprary
        }

    }else{
        // she post a new story:

    // why: data.image[0] --> browser file input give always FileList array of objects. look like FileList { 0: File Object (image.png), length: 1 }   
    // why: first uploadfile --> if i run database operation at first then i dont have the referce of the upload image

        const newPhoto = data.image[0] ? await services.uploadFile(data.image[0]) : null

        if(newPhoto){

    // why: newPhoto.$id --> refernce number or serial number on the photo, for foreign key link at database, so this serial-number have to save inside data.featureImage, so finally it look like this featuredImage: "6ac8ee7e003106cee3fa" 

            const fileId = newPhoto.$id
            data.featuredImage = fileId
        }

    // after photo upload starts database creation servides

        const dbNewPost = await services.createPost({
                ...data,
                // if new photo then, give that photo.$id  
                featuredImage: newPhoto? newPhoto.$id : undefined ,
                // and userId is her userData.$id from authSlice 
                userId: userData.$id
        })
        toast.success("Ink spilled, story released!")
            // after databse update navigate her that post location
        if(dbNewPost){
            navigate(`/`) // temporary
        }
        
    }
}


  return (
    <div className='postform-container' >
        {/* testing */}
        <form onSubmit={handleSubmit(postSubmit)} className='postform-content' >

            <div className="postform-upload-area">

                <div className="left-content">

                <Input
                className="test"
                type="file"
                error={errors.image?.message}
                accept="image/png, image/jpg, image/jpeg, image/webp "
                {...register("image",{ required: postDataFromAppwrite? false:"Story cover image is mandatory",

                    validate:{
                        lessThan2MB:(files)=>
                            !files[0] || files[0]?.size <=2* 1024*1024 ||"Max file size allowed is 2MB!",
                        acceptedFormats:(files)=>
                            !files[0] || ["image/jpg","image/jpeg", "image/png", "image/webp"].includes(files[0]?.type) || "Only JPG, PNG,JPEG and WEBP files are allowed!"
                    }
                 }
                )}




                />
                <p>(max file size: <b>2MB</b> | supported formats: <b>jpg,png,jpeg, webp</b>)</p>

                <SelectComponent
                label="Status"
                className="test"
                options={["active","inactive"]}
                
                {...register("status", {required: true})}
                
                />
                <p>(Status| <b>active:Publish | inactive:Draft</b>)</p>
                <button  type="submit">{postDataFromAppwrite ? "Update Post" : "Publish"}</button>

                </div>

                <div className="right-content">

                <Input
                type="text"
                error={errors.title?.message}
                label="Title"
                placeholder="Enter post title"
                {...register("title",{ required: "Drop your story name" })}
                />
                <Input
                type="text"
                label="Slug"
                error={errors.slug?.message}
                placeholder="Auto-generated slug"
                {...register("slug",{ required: "Slug is mandatory" })}
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