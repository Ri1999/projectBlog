// import React from 'react'

// import { Link } from 'react-router-dom'
// import Logo from '../Logo'
import "./footer.css"
// import logoimage from "../../images/lavnatalia.png"

function Footer() {

  // const color ={

  //   background:" #e63947e0",
  //   fontcolor:"#F8F9FA",

  // }


  return (

    <>
    
    <div className="footer" >
      <div className="footer-container">

        <div className="brand-logo">
          <h2>Charukavya</h2>
          <p>Where ink meets imagination.</p>
        </div>

        <div className="company">

          <h3 >Company</h3>
          <ul className="company-links" >
            <li><a href="">Stories</a></li>
            <li><a href="">About Us</a></li>

            {/* <li><a href="">Affiliate Program</a></li>
            <li><a href="">Press Kit</a></li> */}

          </ul>

        </div>

        <div className="support">

          <h3 >Support</h3>
          <ul className="support-links" >
            {/* <li><a href="">Account</a></li> */}
            <li><a href="">Contact Us</a></li>
            <li><a href="">Share Feedback</a></li>
            <li><a href="">FAQs</a></li>
          </ul>
          
        </div>

        <div className="legals">

          <h3 >Legals</h3>
          <ul className="legal-links" >
            <li><a href="">Terms & Conditions</a></li>
            <li><a href="">Privacy Policy</a></li>

            {/* <li><a href="">Licensing</a></li> */}

          </ul>
          
        </div>


      </div>
      
    </div>

    <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Charukavya. All rights reserved | Illustration artwork licensed via Freepik.</p>
        
      </div>




    </>

    

    
  )
}

export default Footer