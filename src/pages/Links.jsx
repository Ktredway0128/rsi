import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const links = [
  {
    label: 'Free Language Guide',
    description: '10 phrases every server should stop saying — free PDF',
    href: '/free-guide',
  },
  {
    label: 'ROI Calculator',
    description: 'See what undertrained staff is actually costing your property',
    href: '/roi-calculator',
  },
  {
    label: 'About RSI',
    description: 'The standard of refined service',
    href: '/about',
  },
  {
    label: 'View Pricing',
    description: 'Property and team licensing',
    href: '/pricing',
  },
]

export default function Links() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="min-h-screen flex items-center justify-center px-6 py-24">
        <div className="w-full max-w-md">

          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs tracking-widest uppercase text-gold font-sans mb-3">
              Refined Service Institute
            </p>
            <h1
              className="text-3xl text-white mb-4"
              style={{ fontFamily: 'Georgia, serif', fontWeight: 400 }}
            >
              Kyle Tredway
            </h1>
            <div className="w-8 h-px bg-gold mx-auto mb-4" />
            <p className="text-gray-500 text-sm font-sans leading-relaxed">
              Founder, RSI &nbsp;·&nbsp; Certified Sommelier &nbsp;·&nbsp; Cafe Monarch & Reserve, Scottsdale
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group block border border-neutral-800 hover:border-gold/50 bg-neutral-950 hover:bg-neutral-900 transition-all duration-200 px-6 py-5"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs tracking-widest uppercase font-sans font-semibold text-gold mb-1">
                      {link.label}
                    </p>
                    <p className="text-gray-500 text-xs font-sans leading-relaxed">
                      {link.description}
                    </p>
                  </div>
                  <span className="text-gold/40 group-hover:text-gold transition-colors duration-200 ml-4 text-lg">
                    →
                  </span>
                </div>
              </a>
            ))}
          </div>

          {/* Footer note */}
          <p className="text-center text-gray-700 text-xs font-sans mt-10 tracking-wide">
            refinedserviceinstitute.com
          </p>

        </div>
      </div>

      <Footer />
    </div>
  )
}