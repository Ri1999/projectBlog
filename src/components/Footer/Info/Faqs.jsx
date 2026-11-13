// import React from 'react'
import { useState } from "react"
import { IoChevronDownSharp } from "react-icons/io5";
import "./info.css"
import { FcFaq } from "react-icons/fc";
const Faqs = () => {

    const [openIndex, setOpenIndex] = useState(null);

    const faqList =[

        {
        question: "Is Charukavya free to use?",
        answer: "Yes, Charukavya is 100% free for both readers and creators. There are no paywalls, hidden charges, or mandatory subscriptions to read or publish stories."
    },
    {
        question: "Do I own the copyright to the stories or art I publish here?",
        answer: "Absolutely. You retain 100% copyright and ownership of your intellectual property. Charukavya is simply a showcase for your creativity—your words and artwork belong entirely to you."
    },
    {
        question: "Is Charukavya completely ad-free?",
        answer: "Yes. We provide a completely distraction-free reading and writing experience—no popup ads, no banners, and no cluttered layouts. Just pure stories and art."
    },
    {
        question: "How does tipping work? Does Charukavya take any cut?",
        answer: "Charukavya takes 0% platform fees. If you love a writer's work, click 'Send Love' to generate a direct peer-to-peer UPI QR code. 100% of your contribution goes straight to the creator's personal bank account."
    },
    {
        question: "How does Charukavya maintain story quality and filter spam?",
        answer: "Our community-driven Like/Dislike and Report system naturally highlights well-crafted, original stories while keeping low-effort or automated spam hidden from the main feed."
    },
    {
        question: "Will I lose my writing if my browser suddenly crashes?",
        answer: "We are actively building an automatic cloud-save feature. Until it launches, we recommend saving your work as a draft on the platform regularly—and keeping a quick local backup while writing long-form chapters."
    },
    {
        question: "What are the file formats and size limits for story cover images?",
        answer: "We support JPG, JPEG, PNG, and WEBP files up to 1MB. Uploaded images are automatically optimized so your stories load fast across all mobile and desktop screens."
    },
    {
        question: "Can two creators collaborate on the same story?",
        answer: "Yes! With our upcoming 'Collab Mode' feature, you will be able to invite fellow writers to co-author chapters together—while each creator retains full ownership and control over their individual sections."
    }

    ]

    // logic:
        
        // at first all facq is closed right? so null
        // and user click same index which is open so it default to null otherwise different index got shown

    const togglefaq =(number)=>{

        setOpenIndex( openIndex === number? null: number )
    }


  return (
    <div className="container" >
        <div 
                style={{ 
                display: "inline-block", 
                backgroundColor: "#fdfdfd", 
                color: "#035e21", 
                fontSize: "0.75rem", 
                fontWeight: "700", 
                padding: "20px 12px", 
                borderRadius: "12px", 
                marginBottom: "8px",
                letterSpacing: "0.04em",
                textAlign:"center",
                fontFamily:"Sansation, sans-serif",
            }}
            >HELP CENTER
            </div>
        <h1 style={{fontSize:"1.7rem"}} >Frequently Asked Questions <FcFaq size={40} /></h1>
        <p style={{fontSize:"1.1rem",color: "#1d3557",}} >Everything you need to know about writing, reading, and supporting creators on Charukavya.</p>
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