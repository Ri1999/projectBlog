// import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'

import './App.css'

function App() {

  // console.log(process.env.REACT_APP_APPWRITE_URL) // this not gonna work cause it works for create react setup, not npm react @vite setup
  console.log(import.meta.env.VITE_APPWRITE_URL)
  

  return (
    <>
      <h1>project blog </h1>
    </>
  )
}

export default App
