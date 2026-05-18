export default function Footer() {
    return (
      <footer className="border-t border-neutral-900 bg-black">
  
        {/* Logo block */}
        <div className="flex flex-col items-center py-12 px-6">
          <h2
            className="text-3xl font-bold text-gold leading-none"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}
          >
            RSI
          </h2>
          <div className="w-24 h-px bg-gold opacity-70 my-2" />
          <p className="text-xs tracking-widest text-gold font-light uppercase">
            Refined Service Institute
          </p>
        </div>
  
        {/* Nav links */}
        <div className="flex flex-wrap justify-center gap-6 px-6 pb-10">
          {[
            { label: "Home", href: "/" },
            { label: "Program", href: "/program" },
            { label: "About", href: "/about" },
            { label: "Pricing", href: "/pricing" },
            { label: "Contact", href: "/contact" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-xs tracking-widest uppercase text-gray-500 hover:text-gold transition-colors font-sans"
            >
              {label}
            </a>
          ))}
        </div>
  
        {/* Bottom bar */}
        <div className="border-t border-neutral-900 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 max-w-6xl mx-auto">
          <p className="text-xs text-gray-700 font-sans">
            © {new Date().getFullYear()} Refined Service Institute. All rights reserved.
          </p>
          <p className="text-xs text-gray-700 font-sans italic" style={{ fontFamily: 'Georgia, serif' }}>
            Restoring the standard of service.
          </p>
        </div>
  
      </footer>
    )
  }