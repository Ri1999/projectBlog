// import React from 'react'
import LogoutButton from "./LogoutButton"
import Container from "../container/Container"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { logout } from "../../store/authSlice"
import "./header.css"
import logoimage from "../../images/lavnatalia.png"
// import { useState } from "react"
// import { useLocation } from "react-router-dom";
// import { useState } from "react"

const Header = () => {
  
  // check status
  const authStatus = useSelector((state) => state.auth.status)

  // const isReadingMode = location.pathname.includes(`/your-ink/`);
  // const [shouldHide, setShouldHide] = useState(false)
  // const location = useLocation();




  
  const navigate = useNavigate()

  const navItems = [
    {
      name: authStatus? "Library":"The Atrium",
      slug: "/",       // this slug name meant to be same as router in main.jsx
      active: true,
    },

    // testing to write css for Postcard.jsx and many others

    // {
    //   name:"form/testing",
    //   slug:"/postForm",
    //   active: !authStatus,
    // },
    
  


    {
      name: "Login",
      slug: "/login", // this slug name meant to be same as router in main.jsx
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup", // this slug name meant to be same as router in main.jsx
      active: !authStatus,
    },
    {
      name: "My Ink", // --> all posts naming change to My Ink
      slug: "/my-ink", // this slug name meant to be same as router in main.jsx
      active: authStatus,
    },
    {
      name: "Spill Ink",  // --> add post naming change to Spill Ink
      slug: "/spill-ink", // this slug name meant to be same as router in main.jsx
      active: authStatus, // after tesing need to be set authStatus not !authStatus
    },
    {
      name:"InkStation",      // --> dashboard naming change to inkStation
      slug:"/inkStation",
      active: authStatus,
    },

    // {
    //   name:"/testReport",
    //   slug:"/testReport",
    //   active:authStatus,
    // },


  ]

  // http://localhost:5173/your-ink/test-story-004
  const isStoryPage = window.location.pathname.includes("/my-ink/");

  

  return (
    <header style={{ display: isStoryPage ? "none" : '' }} className="my-header" >
      <Container>
        <nav className="main-nav" >

          <div className="logo-pic">
            <img width={90} src={logoimage} alt="" />
            <h2 className="brand-title" >Charukavya</h2>
          </div>

          <ul className="nav-list ">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>

                  {/* () => navigate(item.slug) */}
                  <button className="nav-button" onClick={()=>{
                    navigate(item.slug);
                    
                  }}  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li>
                <LogoutButton />
              </li>
            )}
          </ul>

        </nav>

      </Container>
    </header>
  )
}

export default Header