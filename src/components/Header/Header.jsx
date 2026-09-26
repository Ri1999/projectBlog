// import React from 'react'
import LogoutButton from "./LogoutButton"
import Container from "../container/Container"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
// import { logout } from "../../store/authSlice"
import "./header.css"
import logoimage from "../../images/lavnatalia.png"


const Header = () => {
  
  // check status
  const authStatus = useSelector((state) => state.auth.status)

  
  const navigate = useNavigate()

  const navItems = [
    {
      name: "Home",
      slug: "/",       // this slug name meant to be same as router in main.jsx
      active: true,
    },

    // testing to write css for Postcard.jsx

    {
      name:"test",
      slug:"/reset-password",
      active: !authStatus,
    },
    
  


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
      name: "All Posts",
      slug: "/all-posts", // this slug name meant to be same as router in main.jsx
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post", // this slug name meant to be same as router in main.jsx
      active: authStatus,
    }
  ]

  return (
    <header className="header" >
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
                  <button className="nav-button" onClick={() => navigate(item.slug)}>
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