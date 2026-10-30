// import React from 'react'

import SelectComponent from "../SelectComponent"

import { useForm } from 'react-hook-form'

const ReportModal = () => {

    const {register, handleSubmit, reset, formState:{errors} } = useForm()
    
    const REPORT_REASONS = [
  "Harassment, Bullying, or Hate Speech",
  "Sexually Explicit or Adult Content",
  "Violence, Self-Harm, or Dangerous Behavior",
  "Plagiarism or Intellectual Property Violation",
  "Misinformation, Spam, or Scam",
  "Plagiarized or Low-Quality AI-Generated Content",
  "Other / Hurts Community Guidelines"
];

const reportSubmit = (data)=>{
    // testing 
    console.log("report Data:", data);
    reset()

}




  return (
    <div style={{width:"100%",marginTop:"20px", marginBottom:"20px"} } >
        <h3 style={{textAlign:"center", }} >Report Story for Review</h3>
        <p style={{textAlign:"center", marginBottom:"10px"}} >Help us understand what's wrong with this story</p>
        <>
        <form onSubmit={handleSubmit(reportSubmit)} style={{marginTop:"30px",display:"flex", flexDirection:"column", width:"90%", alignItems:"center", justifyContent:"center", gap:"10px", margin:"auto"}} >
            <SelectComponent
            label="reportcategory"
            error={errors.reportcategory?.message}
            options={REPORT_REASONS}
            {...register("reportcategory",{required:"Report Category is required",
                
            })}
            style={{
                fontSize:"1.1rem",
                borderRadius:"2px",
                padding:"4px",
                backgroundColor:"#283618",
                color:"whitesmoke",
                fontFamily: "Sansation, sans-serif",
                width:"100%"
                
            }}
            
            />
            <textarea name="" id=""
            label="reportText"
            placeholder='Explain in details...'
            {...register("reportText",{required:"Explain in details pls",
                validate: {
      notEmpty: (value) => 
        /\S+/.test(value) || "You cannot submit report with an empty box or just spaces"
    }
            })}
            style={{
                height:"180px",
                resize:"none",
                // width:"800px",
                width:"100%",
                borderRadius:"2px",
                padding:"10px",
                fontSize:"1.3rem",
            }}
            >

            </textarea>
            {errors.reportText && (
                <p style={{ color: "red", fontSize: "1rem", marginTop: "4px" }} >{errors.reportText.message}</p>
            )}
            {/* <button type="submit">Submit</button> */}

            <button style={{width:"40%", padding:"10px 20px", borderRadius:"4px", border:"none", background:"transparent", backgroundColor:"#780000", color:"whitesmoke", fontSize:"1rem",fontFamily: "Sansation, sans-serif", cursor:"pointer" }} type="submit">Sumbit</button>
        </form>
        </>
        
    </div>
  )
}

export default ReportModal