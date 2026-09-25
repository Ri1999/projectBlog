import React from 'react'
import { useId } from "react"

const SelectComponent = ({

    // this is a custom dropdown : when create post user has to choose status :active, inative, 
    // in future category : "Poetry", "Story", "Essay"

    options,
    label,
    className="",
    ...otherAttr

}, ref) => {

    const id = useId()

  return (
    <div className="outer-container" >
        {label &&  
        <label htmlFor={id} className="label-style" ></label> }
        <select className={` select-style  ${className}`} ref={ref} {...otherAttr} id={id} >

            {/* oprions comes with array, so we need to loop */}

            {options?.map((option_data)=> (
                <option key={option_data} value= {option_data}>
                    {option_data}
                </option>
            ))}
            

        </select>

        
        
        </div>
  )
}

export default React.forwardRef(SelectComponent)