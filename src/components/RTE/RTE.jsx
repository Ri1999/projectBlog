// import React from 'react'
import {Editor} from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"
import "./rte.css"
const RTE = ({ name = "content", control, label, defaultValue = "" }) => {

// Props de diya par props aayega kisse?
// ans: Yeh props aayenge Parent Component se, in future steps me jab hum PostForm (Blog Create/Edit Form) banayenge, toh wahan RTE component ko use karenge, example:   <RTE ....here are the props />   

// If parent component does not set ant name thats why i set this as name , control is main brain of useForm, label is for Ui show works.

// why need? 
// 1. USER INTERACTION --> 2. TINYMCE OUTPUT --> 3. <Controller />(Bridge from react-hook-form) --> 4. POST FORM SUBMIT(`handleSubmit(onSubmit)` is triggered) --> 5. APPWRITE DATABASE

// nutshell : bhai mtlb RTE khud handleSubmit() trigger nhi kaar sakta toh react-hook-form usse <Controller /> deta hai , untimatemly trigger handleSubmit() hi karna hai, `<Controller />` bas RTE ka HTML data form state tak pahunchane ka kaam karta hai

if (!control) {
    return <div>Error: </div>;
}




  return (
    <div className="rte-container" >
        {/* condition that if label used then render it */}
        {label && <label>{label}</label>}
        <Controller
        // it need 3 primary props
        name={name}
        control={control}

        // syntax (|)=>()
        //   inside written as    
        //         |    
        //     {field: {onChange}}
        render={({field: {onChange}})=>(

            // here render <Editor/>
            <Editor
            initialValue={defaultValue}
            init={{
                height:500,
                menubar: true,
                plugins:[
                    'image', 'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                // i want to style this seperate how? 
                content_style: "body{font-family: 'Sansation', sans-serif; font-size:1.2rem}",
                 
            
            
            }}
            // it dont place inside object
            onEditorChange={onChange}
            
            
            />
        )}
        
        
        />
    </div>
  )
}

export default RTE