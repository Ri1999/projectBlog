// import React from 'react'
// import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import SelectComponent from '../../SelectComponent'
// import { FaRegStar } from "react-icons/fa6";

import "./info.css" // major css is here

const ShareFeedback = () => {

    const {register, handleSubmit, reset, formState:{errors} } = useForm()

    // user ratings

    // const [ratings, setRatings] = useState(0)
    // const [hoverRating, setHoverRating] = useState(0)

    const onSubmit = (data) => {

        // if (ratings === 0) {
        //     toast.error("Please select a star rating! ⭐");
        //     return;
        // }

        console.log("Form Data:", data);
        toast.success("Thank you for your valuable feedback! ❤️");
        reset();
    };



  return (
    <div className='container' >
        <h1>Tell us where we messed up</h1>
        <p>Found a layout bug, hate a feature, or got a wild idea? Pick a category, spill the ink, and help us make <span style={{fontWeight:"600", fontFamily:"Fondamento, cursive"}} >Charukavya</span> better.</p>

        <form onSubmit={handleSubmit(onSubmit)}  className='content' >

            <SelectComponent
            label="category"
            error={errors.category?.message}
            options={["Editor/Formatting Issue","UI/Design","Bug Report","Feature Suggestions", "General"]}
            {...register("category",{required: "Category is required"})}
            className="feedback-component"
            
            />

            <textarea name="" id=""
            label="feedbackMessage"
            placeholder="Message..."
            // error={errors.feedbackMessage?.message}
            {...register("feedbackMessage", {required:"Feedback Message is required"})}
            style={{
                height:"180px",
                resize:"none",
                borderRadius:"8px",
                padding:"10px",
                fontSize:"1.3rem"
            }}
            ></textarea>
            {errors.feedbackMessage && (
                <p style={{ color: "red", fontSize: "1rem", marginTop: "4px" }} >{errors.feedbackMessage.message}</p>
            )}
            

            <button type="submit">Submit</button>

        </form>

    </div>
  )
}

export default ShareFeedback