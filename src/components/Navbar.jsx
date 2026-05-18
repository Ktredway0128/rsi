import { useState } from "react";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 right-0 z-20">

      {/* Main bar */}
      <div className="flex items-center justify-between px-6 md:px-12 py-6">
        <a href="/" className="hover-lift">
          <span
            className="text-2xl font-bold text-gold"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}
          >
            RSI
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          <a href="/" className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase hover-lift">Home</a>
          <a href="/program" className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase hover-lift">Program</a>
          <a href="/about" className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase hover-lift">About</a>
          <a href="/pricing" className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase hover-lift">Pricing</a>
          <a href="/contact" className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase hover-lift">Contact</a>
          <a href="/login" className="px-6 py-2 border border-gold text-gold text-xs tracking-widest font-bold hover:bg-gold hover:text-black transition-colors uppercase hover-lift">Login</a>
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
          <a href="/" onClick={() => setOpen(false)} className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase">Home</a>
          <a href="/program" onClick={() => setOpen(false)} className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase">Program</a>
          <a href="/about" onClick={() => setOpen(false)} className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase">About</a>
          <a href="/pricing" onClick={() => setOpen(false)} className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase">Pricing</a>
          <a href="/contact" onClick={() => setOpen(false)} className="text-xs tracking-widest text-white hover:text-gold transition-colors uppercase">Contact</a>
          <a href="/login" onClick={() => setOpen(false)} className="text-xs tracking-widest text-gold border border-gold px-4 py-2 text-center hover:bg-gold hover:text-black transition-colors uppercase">Login</a>
        </div>
      </div>

    </nav>
  )
}

export default Navbar