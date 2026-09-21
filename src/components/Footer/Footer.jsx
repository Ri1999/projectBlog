// import React from 'react'

// import { Link } from 'react-router-dom'
// import Logo from '../Logo'
import "./footer.css"

function Footer() {

  const color ={

    background:" #e63947e0",
    fontcolor:"#F8F9FA",

  }


  return (

    <div className="footer" >
      <div className="footer-container">

        <div className="brand-logo">
          <h2 >DevUI</h2>
          <p>Header section text / Short description goes here.</p>
        </div>

        <div className="company">

          <h3 >Company</h3>
          <ul className="company-links" >
            <li><a href="">Features</a></li>
            <li><a href="">Pricing</a></li>
            <li><a href="">Affiliate Program</a></li>
            <li><a href="">Press Kit</a></li>
          </ul>

        </div>

        <div className="support">

          <h3 >Support</h3>
          <ul className="support-links" >
            <li><a href="">Account</a></li>
            <li><a href="">Help</a></li>
            <li><a href="">Contact Us</a></li>
            <li><a href="">Customer Support</a></li>
          </ul>
          
        </div>

        <div className="legals">

          <h3 >Legals</h3>
          <ul className="legal-links" >
            <li><a href="">Terms & Conditions</a></li>
            <li><a href="">Privacy Policy</a></li>
            <li><a href="">Licensing</a></li>
          </ul>
          
        </div>


      </div>

    </div>

    
  )
}

export default Footer