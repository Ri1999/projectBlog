// import React from 'react'
import "./home.css"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Public from "../Public/Public"
import Dashboard from "../../pages/Dashboard"



const Home = () => {

    const authStatus = useSelector((state)=> state.auth.status)
    const navigate = useNavigate()

    // console.log("test: ", authStatus) --> deafult false

  return (

    <main className="home-container">
      {authStatus ? (
        <div>
          <h1 style={{textAlign:"center"}} >Feed Content</h1>
        </div>
      ) : (
        <Public />
      )}
    </main>

  )
}

export default Home