import Navbar from '../components/Navbar'
import Footer from "../components/Footer";

const MODULES = [
  { number: "01", title: "Foundation of Refined Service", description: "The philosophy, posture, and mindset behind exceptional hospitality." },
  { number: "02", title: "Sequence & Mechanics", description: "Proper steps of service, timing, and the choreography of a great meal." },
  { number: "03", title: "Beverage Fundamentals", description: "Wine, spirits, and non-alcoholic service — knowledge every server needs." },
  { number: "04", title: "Pairing & Suggestion", description: "How to guide guests confidently toward the right choice for their palate." },
  { number: "05", title: "Tableside Beverage Service", description: "The technique and theater of wine presentation, decanting, and pouring." },
  { number: "06", title: "The Guest Journey", description: "Reading the table, anticipating needs, and creating memorable moments." },
]

function Home() {
  return (
    <div className="bg-black text-white overflow-x-hidden">

      {/* ── Hero ── */}
      <div className="relative min-h-screen overflow-hidden">
        <Navbar />

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          src="/rsi-hero-video.mp4"
        />

        <div className="absolute inset-0 bg-black opacity-40" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 md:-mt-16">

          <h1
            className="text-8xl font-bold text-gold leading-none"
            style={{ fontFamily: 'Georgia, serif', letterSpacing: '-0.01em' }}
          >
            RSI
          </h1>

          <div className="w-48 h-px bg-gold opacity-70 my-3" />

          <p className="text-xs tracking-widest text-gold mb-16 font-light uppercase">
            Refined Service Institute
          </p>

          <h2
            className="text-4xl font-bold text-white mb-3"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Elevate Your Service.
          </h2>

          <h2
            className="text-4xl font-bold text-gold mb-8"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Certify Your Standard.
          </h2>

          <p className="max-w-2xl text-gray-300 text-lg leading-relaxed mb-12">
            The professional certification program for front-of-house serving staff.
            In a hospitality landscape that has prioritized hype over genuine human
            connection, RSI exists to restore the standard.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/pricing"
              className="px-8 py-4 bg-gold text-black font-bold tracking-widest text-sm hover:bg-gold/80 transition-colors hover-lift"
            >
              GET CERTIFIED
            </a>
            <a
              href="/pricing"
              className="px-8 py-4 border border-gold text-gold font-bold tracking-widest text-sm hover:bg-gold hover:text-black transition-colors hover-lift"
            >
              CERTIFY YOUR TEAM
            </a>
          </div>

        </div>
      </div>

      {/* ── Value Props ── */}
      <section className="border-t border-neutral-900 px-6 py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">

          <div>
            <div className="w-8 h-px bg-gold mx-auto mb-6" />
            <h3 className="font-serif text-xl text-white mb-3">Built for Fine Dining</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Developed from 20 years at the highest levels of American fine dining — not adapted from generic hospitality training.
            </p>
          </div>

          <div>
            <div className="w-8 h-px bg-gold mx-auto mb-6" />
            <h3 className="font-serif text-xl text-white mb-3">Recognized Certification</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Servers earn an individual certificate valid for one year. Properties earn Establishment Certification when 80% of staff are certified.
            </p>
          </div>

          <div>
            <div className="w-8 h-px bg-gold mx-auto mb-6" />
            <h3 className="font-serif text-xl text-white mb-3">Online in Three Hours</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Six focused modules, a 40-question exam, and a certificate — completed in-person or entirely online, on any device, at any pace.
            </p>
          </div>

        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="border-t border-neutral-900 px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">

          <p className="text-xs tracking-[0.25em] uppercase text-gold font-sans mb-4">The Process</p>
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Simple. Rigorous. Recognized.</h2>
          <div className="w-12 h-px bg-gold mx-auto mb-16" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">

            {/* Connector line — desktop only */}
            <div className="hidden md:block absolute top-6 left-1/4 right-1/4 h-px bg-neutral-800" />

            {[
              { step: "01", title: "Enroll", body: "Schedule in-person workshop or purchase online access for your team or yourself with no scheduling required." },
              { step: "02", title: "Complete the Program", body: "For online, work through six modules at your own pace. Takes approximately three hours." },
              { step: "03", title: "Earn Certification", body: "Pass the 40-question exam at 80% or better and receive your certificate." },
            ].map(({ step, title, body }) => (
              <div key={step} className="flex flex-col items-center">
                <div className="w-12 h-12 border border-gold flex items-center justify-center mb-6 bg-black relative z-10">
                  <span className="text-gold font-serif text-sm">{step}</span>
                </div>
                <h3 className="font-serif text-lg text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{body}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ── Modules ── */}
      <section className="border-t border-neutral-900 px-6 py-24">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.25em] uppercase text-gold font-sans mb-4">The Curriculum</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Six Modules. One Standard.</h2>
            <div className="w-12 h-px bg-gold mx-auto" />
          </div>

         

          <div className="text-center mt-12">
            <a
              href="/program"
              className="hover-lift inline-block border border-gold text-gold text-xs tracking-widest uppercase font-sans px-10 py-4 transition-colors hover:bg-gold hover:text-black"
            >
              View Full Curriculum
            </a>
          </div>

        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="border-t border-neutral-900 px-6 py-24 text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-sans mb-4">Get Started</p>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
          Your team deserves a higher standard.
        </h2>
        <div className="w-12 h-px bg-gold mx-auto mb-8" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/pricing"
            className="hover-lift px-10 py-4 bg-gold text-black font-bold tracking-widest text-xs font-sans transition-opacity"
          >
            SEE PRICING
          </a>
          <a
            href="/contact"
            className="hover-lift px-10 py-4 border border-gold text-gold font-bold tracking-widest text-xs font-sans transition-colors hover:bg-gold hover:text-black"
          >
            CONTACT US
          </a>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Home