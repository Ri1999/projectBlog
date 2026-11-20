// import React from 'react';
import { Link } from "react-router-dom";
import "./info.css";

const PrivacyPolicy = () => {


    return (
        <div className="container">
            {/* Header & Effective Date Badge */}
            <div style={{ borderBottom: "1px solid #e2e8f0", paddingBottom: "18px", marginBottom: "24px" }}>
                <span style={{
                    display: "inline-block",
                    backgroundColor: "#f0fdf4",
                    color: "#16a34a",
                    fontSize: "0.75rem",
                    fontWeight: "700",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    marginBottom: "10px",
                    letterSpacing: "0.04em",
                    fontFamily:"Sansation, sans-serif",
                }}>
                    🛡️ LEGAL & TRANSPARENCY
                </span>
                <h1 className="privacy-heading" >
                    Privacy Policy
                </h1>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#1d3557" }}>
                    Last Updated: November 2026 • Effective for all Charukavya users
                </p>
            </div>

            
            <div style={{
                backgroundColor: "#fdfdfd",
                borderLeft: "4px solid #16a34a",
                borderRadius: "8px",
                padding: "16px 18px",
                marginBottom: "28px"
            }}>
                <p style={{ margin: "0 0 6px 0", fontWeight: "700", color: "#1d3557", fontSize: "0.95rem" }}>
                    Privacy at a Glance
                </p>
                <p style={{ margin: 0, fontSize: "1rem", color: "#1d3557", lineHeight: "1.5" }}>
                    We never sell your data. Creator tips via UPI go <strong>100% peer-to-peer</strong>—Charukavya never stores your bank details, card numbers, or transaction history.
                </p>
            </div>

            <div className="content">
                <section className="privacy-section" >
                    <h2 >1. Information We Collect</h2>
                    <p >
                        When you interact with <strong>Charukavya</strong>, we collect only the essential information required to run the platform:
                    </p>
                    <ul >
                        <li><strong>Account Data:</strong> Name, email address, and profile picture when registering via Email or OAuth (Google/GitHub).</li>
                        <li><strong>User Content:</strong> Story posts, drafts, cover images, and feedback voluntarily submitted on our platform.</li>
                        <li><strong>Usage & Security Data:</strong> Basic browser telemetry, IP address, and session timestamps strictly for security logs and spam prevention.</li>
                        <li><strong>Payment & Support Data:</strong> UPI ID voluntarily provided by creators to generate direct peer-to-peer support QR codes. We do not process, hold, or store any financial transactions.</li>
                    </ul>

                </section>

                <section className="privacy-section" >
                    <h2 >2. How We Use Your Information</h2>
                    <p >We use your data solely for the following purposes:</p>
                    <ul>
                        <li>To authenticate your identity and secure your account.</li>
                        <li>To publish, host, and display your stories to readers.</li>
                        <li>To improve platform performance and UI/UX based on user feedback.</li>
                        <li>To monitor system integrity and prevent unauthorized or abusive activity.</li>
                    </ul>
                </section>

                <section className="privacy-section" >
                    <h2 >3. Data Storage & Security</h2>
                    <p >
                        Your account credentials and published content are securely hosted on encrypted, enterprise-grade cloud infrastructure using modern security protocols. <strong style={{ color: "#012a35" }}>We do not sell, rent, or trade your personal data to third parties or advertisers.</strong>
                    </p>
                </section>

                <section className="privacy-section" >
                    <h2 >4. Cookies & Local Storage</h2>
                    <p >
                        We use browser LocalStorage and essential session cookies strictly to keep you logged in across page refreshes and remember your reading or UI preferences. We do not use invasive cross-site tracking cookies.
                    </p>
                </section>

                <section className="privacy-section" >
                    <h2>5. Your Data Rights & Control</h2>
                    <p >
                        You retain full ownership of your stories and personal data. You can edit or delete your published works at any time directly from your dashboard, or request permanent account deletion by emailing our support desk.
                    </p>
                </section>

                <section className="privacy-section" >
                    <h2 >6. Intellectual Property & Plagiarism</h2>
                    <p >
                        We respect original writing. If you believe any content published on Charukavya infringes upon your copyright, please refer to the Takedown Procedure outlined in our{" "}
                        <Link to="/terms" style={{ color: "#16a34a", fontWeight: "600", textDecoration: "underline" }}>
                            Terms & Conditions
                        </Link>.
                    </p>
                </section>

                <section className="privacy-section" >
                    <h2 >7. Contact Us</h2>
                    <p >
                        If you have any questions or privacy concerns regarding this policy, please reach out via our{" "}
                        <Link to="/contact-us" style={{ color: "#16a34a", fontWeight: "600", textDecoration: "underline" }}>
                            Contact Us
                        </Link>{" "}
                        page or you can reach us directly at{" "}
                        <strong>charukavya.support@gmail.com</strong>.
                    </p>
                </section>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
