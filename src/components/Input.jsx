// import React from 'react'
import React, { useId } from 'react'

// why need that
// Real project (Login, Signup, Post Forms) need multiple HTML inputs
// it becomes code reperating 



const Input = React.forwardRef(
    function Input({
        label,
        type = "text",
        
        className = "",
        // name,
        // value,           ---> those things need to be inside porps or otherAttributes 
        // placeholder="",
        ...otherAttributes // extra attributes ( onChange methods etc.)
    }, ref){  // // <--- Second parameter 'ref'

        // why need ref ? in everything comes from ref then why take labe,type, calssName in sepreate way?

        // ans : styling, click methods need to take seperatly otherwise DOM will be break, so ref take seperately

        // otherAttributes send

        // name="email"
        // onChange={...}
        // onBlur={...}

        // ref send

        // HTML <input> tag the direct pointer (DOM handle).
        // and the library read all values as ref.current.value

// nutshell as per my understanding : 

// toh ae input.jsx sala one way bridge hai , Login form mai so type hua sabkuch kacha chitha wo react-hook-form library koh deh diya , library se liya nhi 
// bss itna bol doh kuki data flow janna hai nah? aur kya react-hook-form library koh problem hota hai iss liya hamlog usse wo bridge dete hai isse DRY nhi hota aur kaam bhi smooth hota hai 





        const id = useId() // it generate new id
    

        return (
            <div>

            {/* if label passed then render  */}

            {label &&  <label htmlFor={id}>{label}</label> }
            <input type={type} className={className}  ref={ref}
            {...otherAttributes} id={id}
            />

            </div>
        )
    }
)

export default Input
