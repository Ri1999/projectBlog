// import React from 'react'
import "./info.css"
import { FcPrivacy } from "react-icons/fc";
const PrivacyPolicy = () => {

    const privacyStyle={
        fontSize: "1.3rem", fontWeight: "600", color: "#2b6cb0", marginBottom: "8px",
        fontFamily:"Sansation, sans-serif",

    }

  return (
    <div className="container" >
        <h1>Your Footprints <FcPrivacy size={39} /></h1>
        <p>Last Updated: September 2026</p>
        <div className="content" >
            <section>
          <h2 style={privacyStyle}>
            1. Information We Collect
          </h2>
          <p>
            When you interact with <strong>Charukavya</strong>, we may collect the following types of information:
          </p>
          <ul style={privacyStyle}>
            <li><strong>Account Data:</strong> Name, email address, and profile picture when registering via Email or Social Auth (Google/GitHub).</li>
            <li><strong>User Content:</strong> Blog posts, drafts, images, and feedback submitted on our platform.</li>
            <li><strong>Usage Data:</strong> Basic browser telemetry, IP address, and session timestamps for security logs.</li>
          </ul>
        </section>

        <section>
          <h2 style={privacyStyle}>
            2. How We Use Your Information
          </h2>
          <p>We use your data solely for the following purposes:</p>
          <ul style={privacyStyle}>
            <li>To authenticate your identity and manage your blogging profile.</li>
            <li>To publish and display your articles to the community.</li>
            <li>To improve platform UI/UX based on feedback provided.</li>
            <li>To monitor system integrity and prevent unauthorized activity.</li>
          </ul>
        </section>

        <section>
          <h2 style={privacyStyle}>
            3. Data Storage & Security
          </h2>
          <p>
            Your account credentials and published data are securely handled using <strong>Appwrite Backend Cloud Services</strong> with industry-standard encryption protocols. We do not sell, rent, or trade your personal data to third parties.
          </p>
        </section>

        <section>
          <h2 style={privacyStyle}>
            4. Cookies & Local Storage
          </h2>
          <p>
            We use browser LocalStorage and essential session cookies strictly to keep you authenticated across page refreshes and store your preferred UI preferences.
          </p>
        </section>

        <section>
          <h2 style={privacyStyle}>
            5. Your Data Rights
          </h2>
          <p>
            You have full ownership of your data. You can edit or delete your published blog posts at any time from your account dashboard, or request complete account deletion.
          </p>
        </section>

        <section>
          <h2 style={privacyStyle}>
            6. Contact Us
          </h2>
          <p>
            If you have any questions or privacy concerns regarding this policy, feel free to reach out via our <strong>Contact Us</strong> page.
          </p>
        </section>

        </div>

    </div>
  )
}

export default PrivacyPolicy