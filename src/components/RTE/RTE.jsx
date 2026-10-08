// import React from 'react'
import {Editor} from "@tinymce/tinymce-react"
import { Controller } from "react-hook-form"
import "./rte.css"
import { useState } from "react"
import { useRef } from "react"
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

const [isDarkMode, setIsDarkMode] = useState(true)
const editorReference = useRef(null)


// the one of big juju :
// RTE create <iframe> isolate html in background
// i use first time userRef --> it remember old component even after useState rerendered, i secret vault type.
// It hold reference pointer of any DOM node : <iframe>, <input>, <button>

// how it works:
// inside useRef there is a object which has one property {current: null}

const toogleMode =()=>{
    const nextmode = !isDarkMode
    setIsDarkMode(nextmode)


// it checks is TinyMCE editor load or not, .current return object with property
    if(editorReference.current){
    const body = editorReference.current.getBody(); // target <iframe> body

    if(body){
        // set conditions
        const bgcolor = nextmode? "#181b1d":"#FAF7F2"
        const textcolor = nextmode? "whitesmoke":"#172a05"

        // force all <iframe> css and set my stylings
        body.style.setProperty('background-color', bgcolor, 'important');
        body.style.setProperty('color', textcolor, 'important');
    }
}
}

console.log("mode: ", isDarkMode)





  return (
    <div className="rte-container" >
        {/* condition that if label used then render it */}
        {label && <label>{label}</label>}
        <button 
        
        style={{
            backgroundColor:isDarkMode?"#16241b":"#818b84",
            color:isDarkMode?"whitesmoke":""
        }}
        
        
        onClick={toogleMode} type="button">{isDarkMode? "🌙":"☀️"}</button>
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

            // tinyMCe built in props, that means when it fires, Editor go inside current:{.....} of my useRef
            onInit={(eventObject, JSinstanceofEditor) => (editorReference.current = JSinstanceofEditor)}

            // api key
            tinymceScriptSrc="https://cdnjs.cloudflare.com/ajax/libs/tinymce/6.8.2/tinymce.min.js" // Free CDN Bypass
            initialValue={defaultValue}
            init={{
                height:500,
                width: '100%',
                menubar: false,

                // there are brading names on it which look aweful and Ui bad so
                branding:false,
                elementpath: false,
                statusbar: false,
                autofocus: true,
                resize:false,
                toolbar_sticky: true,
                selector: "textarea",

// TODO: later if app runs well
                // content_language: 'en',

                // content_langs:[
                //     { title: 'English', code: 'en' },
                //     {title: 'Bengali', code: 'bn-IN'},
                // ],
                plugins:[
                    'image', 'advlist', 'autolink', 'lists', 'link', 'charmap', 'preview', 'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'wordcount'
                ],
                toolbar: "undo redo | paste | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat |",
                // i want to style this seperate how
                font_css: 'https://fonts.googleapis.com/css2?family=Fondamento:ital@0;1&family=Sansation:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap',

                content_style: `
                @import url('https://fonts.googleapis.com/css2?family=Fondamento:ital@0;1&family=Sansation:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap');
                body{
                font-family: 'Fondamento', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
                font-size: 1.2rem !important;
                line-height: 1.6 !important;
                background-color: ${isDarkMode ? '#0C0A09' : '#d0d0ce'} !important;
                color: ${isDarkMode ? '#e3e3e3' : '#1A1A1A'} !important;
                padding: 12px;
                
                
                }
                

                
                
                `,
                 
            
            
            }}
            // it dont place inside object
            onEditorChange={onChange}
            // key={isDarkMode ? 'dark-pad' : 'light-pad'}
            // after that if someone write anything and toogle mode, all code written in vanished 
            
            
            />
        )}
        
        
        />
    </div>
  )
}

export default RTE