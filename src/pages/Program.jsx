import Navbar from '../components/Navbar'
import Footer from "../components/Footer";

const modules = [
  {
    num: '01',
    title: 'The Foundation of Refined Service',
    description: 'Why service matters more than ever. The psychology of hospitality, the three pillars of RSI, and what separates a server who is technically correct from one who delivers a genuinely memorable experience.',
    image: null,
  },
  {
    num: '02',
    title: 'Sequence & Mechanics of Service',
    description: 'The invisible architecture of a perfect dining experience. Proper sequence, table mechanics, carrying and clearing, crumbing, napkin service, table awareness, and handling difficult moments with grace.',
    image: null,
  },
  {
    num: '03',
    title: 'Beverage Fundamentals',
    description: 'Old World vs New World wine, key grape varieties, beer families, spirits, cocktail knowledge, and non-alcoholic programs. Everything a server needs to speak confidently about any beverage on any list.',
    image: null,
  },
  {
    num: '04',
    title: 'Pairing & Suggestion',
    description: 'The two types of pairings, structural principles, what breaks a pairing, pairing across the full beverage program, and the art of making a recommendation that is genuinely in the guest\'s interest.',
    image: null,
  },
  {
    num: '05',
    title: 'Tableside Beverage Service',
    description: 'Wine presentation, the pour, sparkling service, decanting technique, ongoing wine service, spirits and cocktail delivery, and handling questions and objections at the table with confidence.',
    image: null,
  },
  {
    num: '06',
    title: 'The Guest Journey',
    description: 'Anticipating needs, making it personal, handling complaints gracefully, the farewell, and turning tables without a guest ever feeling rushed. The standard that makes guests return and tell everyone.',
    image: null,
  },
]

function Program() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* Hero */}
      <div className="pt-40 pb-20 px-12 text-center border-b border-gold/20">
        <p className="text-sm tracking-widest text-gold mb-4 uppercase">The Curriculum</p>
        <h1
          className="text-5xl font-bold text-white mb-6"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          The Certified Service Professional Program
        </h1>
        <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
          Six modules covering the complete arc of refined service — from the philosophy of hospitality
          to the mechanics of tableside wine service. Designed for upscale casual through fine dining.
          Built to be completed in approximately three hours.
        </p>
      </div>

      {/* How It Works */}
      <div className="py-20 px-12 border-b border-gold/20">
        <p className="text-sm tracking-widest text-gold mb-12 uppercase text-center">How It Works</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
          {[
            { step: '01', title: 'Complete Six Modules', desc: 'Read each module, complete the reflection exercise, and work through four real service scenarios.' },
            { step: '02', title: 'Pass Each Checkpoint', desc: 'Three questions at the end of every module. All three must be answered correctly to advance.' },
            { step: '03', title: 'Take the Final Exam', desc: '40 questions drawn from a randomized pool. 80% to pass. Three attempts included.' },
            { step: '04', title: 'Earn Your Certificate', desc: 'A named RSI Certified Service Professional certificate, valid for one year.' },
          ].map((item) => (
            <div key={item.step} className="flex flex-col items-center">
              <span className="text-4xl font-bold text-gold/30 mb-4" style={{ fontFamily: 'Georgia, serif' }}>{item.step}</span>
              <h3 className="text-sm font-bold text-white tracking-wide mb-3 uppercase">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modules */}
      <div className="py-20 px-12 border-b border-gold/20">
        <p className="text-sm tracking-widest text-gold mb-12 uppercase text-center">The Modules</p>
        <div className="max-w-5xl mx-auto">
          {modules.map((mod, idx) => (
            <div
              key={mod.num}
              className={`flex items-start gap-8 py-10 ${idx !== modules.length - 1 ? 'border-b border-gold/10' : ''}`}
            >
              <span
                className="text-5xl font-bold text-gold/20 leading-none flex-shrink-0 w-16"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {mod.num}
              </span>
              <div>
                <h3
                  className="text-xl font-bold text-white mb-3"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {mod.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">{mod.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certification */}
      <div className="py-20 px-12 border-b border-gold/20">
        <p className="text-sm tracking-widest text-gold mb-12 uppercase text-center">Certification</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>Individual Certification</h3>
            <p className="text-gray-400 leading-relaxed mb-4">Each server who passes the exam receives a named RSI Certified Service Professional certificate, valid for one year. The certificate belongs to them — it travels with them regardless of where they work.</p>
            <p className="text-gray-400 leading-relaxed">Annual renewal keeps the standard current and the credential meaningful.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>Establishment Certification</h3>
            <p className="text-gray-400 leading-relaxed mb-4">When 80% of your serving staff hold a valid individual certification, your property earns RSI Establishment Certification — a credential that signals to every guest that service here is held to a defined and verified standard.</p>
            <p className="text-gray-400 leading-relaxed">Renewed annually. Displayed proudly.</p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
          Ready to certify your team?
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/pricing" className="px-8 py-4 bg-gold text-black font-bold tracking-widest text-sm hover:bg-gold/80 transition-colors hover-lift">
            VIEW PRICING
          </a>
          <a href="/contact" className="px-8 py-4 border border-gold text-gold font-bold tracking-widest text-sm hover:bg-gold hover:text-black transition-colors hover-lift">
            GET IN TOUCH
          </a>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Program
