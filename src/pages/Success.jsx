import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Success() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <div className="w-8 h-px bg-gold mx-auto mb-8" />
        <p className="text-xs tracking-widest text-gold uppercase mb-4">Welcome to RSI</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
          You're In.
        </h1>
        <p className="max-w-lg text-gray-400 text-lg leading-relaxed mb-4">
          Your subscription is active. Check your email for your property access code. It should arrive within a few minutes.
        </p>
        <p className="max-w-lg text-gray-400 text-sm leading-relaxed mb-4">
          If it takes longer than expected, reach out and we'll get it to you right away.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/contact"
            className="px-8 py-4 border border-gold text-gold font-bold tracking-widest text-sm hover:bg-gold hover:text-black transition-colors uppercase hover-lift"
          >
            Get In Touch
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Success