// import React from 'react'
import "./info.css"
// import { FcPrivacy } from "react-icons/fc";
// import { PiFingerprintSimple } from "react-icons/pi";
// import { toast } from "react-toastify"
const PrivacyPolicy = () => {

    const privacyStyle={
        fontSize: "1.3rem", fontWeight: "600", color: "#012a35", marginBottom: "8px",
        fontFamily:"Sansation, sans-serif",

    }
    const pStyle={
      lineHeight:"1.7rem",
    }

    // const adminEmail = "patraarittik1999@gmail.com"
    
        // const copyToClip = ()=>{
        //     navigator.clipboard.writeText(adminEmail)
        //     toast.success("Email copied to clipboard ")
        // }

  return (
    <div className="container" >
        <h1>Privacy Policy</h1>
        <p>Last Updated: Oct 2026</p>
        <div className="content" >
            <section>
          <h2 style={privacyStyle}>
            1. Information We Collect
          </h2>
          <p style={pStyle} >
            When you interact with <strong>Charukavya</strong>, we may collect the following types of information:
          </p>
          <ul style={privacyStyle}>
            <li><strong>Account Data:</strong> Name, email address, and profile picture when registering via Email or Social Auth (Google/GitHub).</li>
            <li><strong>User Content:</strong> Story posts, drafts, images, and feedback submitted on our platform.</li>
            <li><strong>Usage Data:</strong> Basic browser telemetry, IP address, and session timestamps for security logs.</li>
            <li>Payment & Support Data: UPI ID or linked mobile number voluntarily provided by creators to generate direct peer-to-peer support QR codes. (We do not store or process any financial transactions).</li>
          </ul>
        </section>

        <section>
          <h2 style={privacyStyle}>
            2. How We Use Your Information
          </h2>
          <p style={pStyle} >We use your data solely for the following purposes:</p>
          <ul style={privacyStyle}>
            <li>To authenticate your identity.</li>
            <li>To publish and display your stories to the webapp.</li>
            <li>To improve platform UI/UX based on feedback provided.</li>
            <li>To monitor system integrity and prevent unauthorized activity.</li>
          </ul>
        </section>

        <section>
          <h2 style={privacyStyle}>
            3. Data Storage & Security
          </h2>
          <p style={pStyle} >
            
            Your account credentials and published data are securely hosted on encrypted, enterprise-grade cloud database infrastructure. with encrypted protocols.<strong style={{color:"#012a35"}} > We do not sell, rent, or trade your personal data to third parties</strong>.
          </p>
        </section>

        <section>
          <h2 style={privacyStyle}>
            4. Cookies & Local Storage
          </h2>
          <p  style={pStyle}>
            We use browser LocalStorage and essential session cookies strictly to keep you authenticated across page refreshes and store your preferred UI preferences.
          </p>
        </section>

        <section>
          <h2 style={privacyStyle}>
            5. Your Data Rights
          </h2>
          <p  style={pStyle}>
            You retain full ownership of your content and data. You can edit or delete your published stories at any time directly from your account dashboard, or request complete account deletion by contacting us via email.
          </p>
        </section>

        <section>
          <h2 style={privacyStyle} >
          6. For Intellectual Property or Plagiarism Concerns</h2>
          <p>If you believe any content on Charukavya violates your copyright, please review our Takedown Procedure in our Terms & Conditions.</p>
        </section>

        <section>
          <h2 style={privacyStyle}>
            7. Contact Us
          </h2>
          <p  style={pStyle}>
            If you have any questions or privacy concerns regarding this policy, feel free to reach out via our <strong style={{color:"#012a35"}} >Contact Us</strong> page.
          </p>
        </section>

        </div>

    </div>
  )
}

export default PrivacyPolicy