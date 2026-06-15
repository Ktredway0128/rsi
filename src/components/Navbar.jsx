import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <nav className="absolute top-0 left-0 right-0 z-20">

      {/* Main bar */}
      <div className="flex items-center justify-between px-6 md:px-12 py-6">
        <Link to="/" className="hover-lift">
          <span
            className="text-2xl font-bold text-gold"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}
          >
            RSI
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase hover-lift">Home</Link>
          <Link to="/program" className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase hover-lift">Program</Link>
          <Link to="/about" className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase hover-lift">About</Link>
          <Link to="/pricing" className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase hover-lift">Pricing</Link>
          <Link to="/contact" className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase hover-lift">Contact</Link>
          {user ? (
            <div className="flex items-center gap-6">
              <Link to="/dashboard" className="px-6 py-2 border border-gold text-gold text-xs tracking-widest font-bold hover:bg-gold hover:text-black transition-colors uppercase hover-lift">Dashboard</Link>
              <button onClick={handleSignOut} className="text-xs tracking-widest uppercase text-gray-500 hover:text-gold transition-colors font-sans">Sign Out</button>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link to="/pricing" className="px-8 py-3 bg-gold text-black text-sm tracking-widest font-bold hover:bg-gold/80 transition-colors uppercase hover-lift">Start Today</Link>
              <Link to="/login" className="px-6 py-2 border border-gold text-gold text-xs tracking-widest font-bold hover:bg-gold hover:text-black transition-colors uppercase hover-lift">Login</Link>
            </div>
          )}
        </div>

        {/* Hamburger button — mobile only */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8"
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-px bg-gold transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-px bg-gold transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-px bg-gold transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden bg-black border-t border-neutral-900 transition-all duration-300 overflow-hidden ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col px-6 py-6 gap-6">
          <Link to="/" onClick={() => setOpen(false)} className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase">Home</Link>
          <Link to="/program" onClick={() => setOpen(false)} className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase">Program</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase">About</Link>
          <Link to="/pricing" onClick={() => setOpen(false)} className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase">Pricing</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase">Contact</Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="text-xs tracking-widest text-gold border border-gold px-4 py-2 text-center hover:bg-gold hover:text-black transition-colors uppercase">Dashboard</Link>
              <button onClick={() => { handleSignOut(); setOpen(false) }} className="text-xs tracking-widest uppercase text-gray-500 hover:text-gold transition-colors font-sans text-left">Sign Out</button>
            </>
          ) : (
            <>
              <Link to="/pricing" onClick={() => setOpen(false)} className="text-xs tracking-widest text-black bg-gold px-4 py-2 text-center hover:bg-gold/80 transition-colors uppercase font-bold">Start Today</Link>
              <Link to="/login" onClick={() => setOpen(false)} className="text-xs tracking-widest text-gold border border-gold px-4 py-2 text-center hover:bg-gold hover:text-black transition-colors uppercase">Login</Link>
            </>
          )}
        </div>
      </div>

    </nav>
  )
}

export default Navbar