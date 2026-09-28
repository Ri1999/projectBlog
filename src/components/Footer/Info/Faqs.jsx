// import React from 'react'
import { useState } from "react"
import { IoChevronDownSharp } from "react-icons/io5";
import "./info.css"
import { FcFaq } from "react-icons/fc";
const Faqs = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const faqList =[

        {
            question:"Is Charukavya free to use?",
            answer:"Yes, Charukavya is 100% free for readers and creators. There are no paywalls or mandatory subscriptions to read or publish stories."
        },
        {
            question:"Do I own the copyright to the stories or art I publish here?",
            answer:"Absolutely. You retain 100% ownership of your intellectual property. Charukavya is just a platform to showcase your creativity, your words and art belong entirely to you."
        },
        {
            question:" Is Charukavya ad-free?",
            answer:"Our platform provides a completely distraction-free workspace. No popup ads, no cluttered layouts. Just pure art and text."
        },
        {
            question:"How do micro-donations work? Can I tip my favorite writer?",
            answer:"If you love a creator's work, you can directly tip them from ₹20 to ₹max using our integrated UPI gateway. 100% of the tip goes directly to the creator's linked account."
        },
        {
            question:"How does Charukavya ensure the stories on the platform maintain high quality?",
            answer:"We trust our community. Our built-in Upvote/Downvote dynamic system naturally pushes well-crafted, original stories to the top, while keeping low-effort or automated spam text hidden from the main feed."
        },
        {
            question:"Will I lose my writing if my browser suddenly crashes?",
            answer:"Not at all. Our text editor is equipped with a real-time cloud Auto-Save mechanism. Every sentence you compose is automatically synced instantly to our servers so you never lose your progress."
        },
        {
            question:"What are the size limitations for canvas or story cover images?",
            answer:"We fully support vector formats (SVGs) along with clean PNGs and JPEGs up to 5MB. Your images are automatically optimized for crisp delivery across all screens."
        },
        //  doubt it work or not
        {
            question:"Can two creators work together on the same story line?",
            answer:"Of course, buddy using our integrated Collab Mode, you can invite any fellow Rachayita to co-author chapters with you. Each author maintains secure control over their unique written sections."
        },

    ]

    // logic:
        
        // at first all facq is closed right? so null
        // and user click same index which is open so it default to null otherwise different index got shown

    const togglefaq =(number)=>{

        setOpenIndex( openIndex === number? null: number )
    }


  return (
    <div className="container" >
        <h1>You ask, We answer<FcFaq size={50} /></h1>
        <div className="content">
            {faqList.map((faq, index)=> {

                // identification that what faq in open and is that equals to the index
                const isOpen = openIndex === index
                return (
                    <div key={index}

                    style={{
                        border: "1px solid green",
                        borderRadius: "10px",
                        backgroundColor: "#fff",
                        overflow: "hidden",
                        transition: "all 0.2s ease"
                    }}>

                        <button 
                        onClick={()=> togglefaq(index)}
                        style={{
                            width: "100%",
                            padding: "18px 20px",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "1.05rem",
                            fontWeight: "600",
                            color: "#2d3748",
                            textAlign: "left",
                            fontFamily:"Sansation, sans-serif",
                        }}
                        
                        
                        type="button">
                        <span>{faq.question}</span>
                        <IoChevronDownSharp 
                        style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.3s ease",
                        color: "green"
                  }}
                />
                </button>

                {isOpen && (
                <div style={{ padding: "0 20px 18px 20px", color: "#17692c", lineHeight: "1.6", fontSize: "0.95rem", fontFamily:"Sansation, sans-serif" }}>
                  {faq.answer}
                </div>
              )}

                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Faqs