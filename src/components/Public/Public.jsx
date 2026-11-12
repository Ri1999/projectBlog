// import React from 'react'
import "./public.css"
import { useNavigate } from 'react-router-dom'
import { PenTool, BookOpen} from 'lucide-react'
import { Sparkles, } from 'lucide-react'
import { FaHandHoldingHeart } from "react-icons/fa";

const Public = () => {

    const navigate = useNavigate()

  return (
    <div className="public-wrapper">
      
      {/* upper arera  */}
      <section className="public-hero">

        <h1 className="hero-heading">A Quiet Corner for Your Loudest Thoughts</h1>
        <p className="hero-subheading">
          Write, build communities, discover stories, and support the voices you love—with zero platform cuts.
        </p>
        <div className="hero-buttons">
          <button 
            type="button" 
            className="btn-primary" 
            onClick={() => navigate('/signup')}
          >
            Start Writing Story
          </button>
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={() => navigate('/login')}
          >
            Uncap Your Pen
          </button>
        </div>

      </section>


      {/* lower card area */}
      
      <section className="public-grid">

        <div className="grid-card">
          <div className="card-icon"><PenTool className="card-icon" size={32} /></div>
          <div className="public-marketings" >

          <h3>Where Your Best Words Happen</h3>
          <p>Your stories deserve a sanctuary. Experience ad-free writing studio crafted for storytellers and poets who just want to create without interruptions.</p>

          </div>
        </div>

        <div className="grid-card">

          <div className="card-icon"><BookOpen color="Maroon" className="card-icon" size={32} /></div>
          <div className="public-marketings" >
          <h3>Tales</h3>
          <p >Stop scrolling through noisy timelines. Discover fresh, authentic stories across the community in a clean feed built purely for joyful reading.</p>
          </div>
          
        </div>

        <div className="grid-card">
          <div className="card-icon"><Sparkles color="DarkGoldenRod" className="card-icon" size={32} /></div>
          <div className="public-marketings" >
          <h3>Read Your Way: Day or Night</h3>
          <p >Immerse yourself in every story with custom font sizing, effortless day and night modes, and instant tools to react, share feedback, or keep the community safe.</p>
          </div>
        </div>

        <div className="grid-card">
          <div className="card-icon"><FaHandHoldingHeart color="red" className="card-icon" size={32} /></div>
          <div className="public-marketings" >
          <h3>For the Creators</h3>
          <p >Empower the voices you love. Send direct financial support via UPI instantly from the story page. We take absolute zero commission—every single rupee goes straight to the <b>writer</b>.</p>
          </div>
        </div>



      </section>

    </div>
  )
}

export default Public