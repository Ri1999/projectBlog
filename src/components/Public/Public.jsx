// import React from 'react'
import "./public.css"
import { useNavigate } from 'react-router-dom'
import { PenTool, BookOpen} from 'lucide-react'
import { Sparkles, Trophy,} from 'lucide-react'

const Public = () => {

    const navigate = useNavigate()

  return (
    <div className="public-wrapper">
      
      {/* upper arera  */}
      <section className="public-hero">

        <h1 className="hero-heading">A Quiet Corner for Your Loudest Thoughts...</h1>
        <p className="hero-subheading">
          Read, write, and explore micro-stories.
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
            Open Your Canvas
          </button>
        </div>

      </section>


      {/* lower card area */}
      
      <section className="public-grid">

        <div className="grid-card">
          <div className="card-icon"><PenTool className="card-icon" size={32} /></div>
          <h3>Write Freely</h3>
          <p>Express yourself, tech logs, or personal experiences on AD-free environment.</p>
        </div>

        <div className="grid-card">

          <div className="card-icon"><BookOpen color="Maroon" className="card-icon" size={32} /></div>
          <h3>Built-in Resonance</h3>
          <p>An inclusive feed that champions new writers. Get discovered, and build your audience organically.</p>
        </div>

        <div className="grid-card">
          <div className="card-icon"><Sparkles color="DarkGoldenRod" className="card-icon" size={32} /></div>
          <h3>Beautiful Story Formatting</h3>
          <p>Frame your words with cover art, rich formatting, and a seamless mode crafted for late-night readers.</p>
        </div>

        <div className="grid-card">
          <div className="card-icon"><Trophy color="Silver" className="card-icon" size={32} /></div>
          <h3>Write. Compete. Get Featured.</h3>
          <p>Participate in our weekly community-judged writing challenges. Craft your best story and claim your spot in the <b>The Inkwell</b>.</p>
        </div>



      </section>

    </div>
  )
}

export default Public