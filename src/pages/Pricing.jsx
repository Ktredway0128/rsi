import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

function Pricing() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* Hero */}
      <div className="pt-40 pb-20 px-12 text-center border-b border-gold/20">
        <p className="text-sm tracking-widest text-gold mb-4 uppercase">Pricing</p>
        <h1
          className="text-5xl font-bold text-white mb-6"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Simple, Transparent Pricing
        </h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
          Per server pricing that scales with your team. No hidden fees.
          Annual renewal built in so the standard never expires.
        </p>
      </div>

      {/* In-Person Callout */}
      <div className="py-16 px-12 border-b border-gold/20 bg-gold/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1">
              <p className="text-sm tracking-widest text-gold mb-4 uppercase">The Most Powerful Way to Certify Your Team</p>
              <h2
                className="text-3xl font-bold text-white mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                There is nothing like being in the room.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                The online program delivers the full RSI curriculum and the same certification standard. Every server who completes it online is genuinely prepared and genuinely certified — the standard does not change based on how you get there.
              </p>
              <p className="text-gray-400 leading-relaxed">
                In-person delivery adds something the screen cannot replicate — live demonstration of tableside mechanics, real-time correction, and the shared energy of an entire team going through the program together with someone who has spent twenty years doing this at the highest level.
              </p>
            </div>
            <div className="flex-shrink-0 md:w-72">
              <div className="border border-gold/30 p-6">
                <p className="text-xs tracking-widest text-gold uppercase mb-6">In-Person Includes</p>
                {[
                  'Live demonstration of tableside mechanics',
                  'Real-time correction and coaching',
                  'Live service scenario roleplay',
                  'Direct Q&A with Kyle Tredway',
                  'Team energy and shared accountability',
                  'Twenty years of answers in the room',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 mb-4">
                    <div className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <p className="text-gray-300 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div className="py-20 px-12 border-b border-gold/20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: 'In-Person Local',
              price: '$225',
              unit: 'per server',
              description: 'Half-day in-person certification delivered at your property by Kyle Tredway.',
              detail: 'Minimum 5 servers',
              highlight: false,
            },
            {
              label: 'In-Person Travel',
              price: '$325',
              unit: 'per server + travel',
              description: 'Full in-person delivery at properties outside the Maricopa County market.',
              detail: 'Minimum 10 servers · Travel at cost',
              highlight: true,
            },
            {
              label: 'Online Certification',
              price: '$125',
              unit: 'per server',
              description: 'Complete the full program online at your own pace. Same curriculum, same exam, same certificate.',
              detail: 'No minimum',
              highlight: false,
            },
            {
              label: 'Annual Renewal',
              price: '$75',
              unit: 'per server',
              description: 'Renew before your certification expires and keep your credential current at a discounted rate.',
              detail: 'No minimum · Must renew before expiry',
              highlight: false,
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`border p-8 flex flex-col ${item.highlight ? 'border-gold bg-gold/5' : 'border-gold/20'}`}
            >
              <p className="text-xs tracking-widest text-gold uppercase mb-4">{item.label}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>{item.price}</span>
                <span className="text-gray-400 text-sm ml-2">{item.unit}</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{item.description}</p>
              <p className="text-xs text-gold/60 tracking-wide">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Certification */}
      <div className="py-20 px-12 border-b border-gold/20">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <p className="text-sm tracking-widest text-gold mb-6 uppercase">Individual Certification</p>
            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Every server earns their own credential
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              Each server who passes receives a named RSI Certified Service Professional certificate valid for one year. It belongs to them — it travels with them wherever they work.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Renew at $75 before expiry to keep the credential current. If certification lapses, full re-certification at the standard online rate applies.
            </p>
          </div>
          <div>
            <p className="text-sm tracking-widest text-gold mb-6 uppercase">Establishment Certification</p>
            <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Your property earns the standard
            </h3>
            <p className="text-gray-400 leading-relaxed mb-4">
              When 80% of your serving staff hold a valid individual certification, your property earns RSI Establishment Certification — renewed annually.
            </p>
            <p className="text-gray-400 leading-relaxed">
              A credential you can display, market, and point to as proof that service here is held to a defined and verified standard.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 px-12 border-b border-gold/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm tracking-widest text-gold mb-12 uppercase text-center">Common Questions</p>
          {[
            {
              q: 'How long does the program take?',
              a: 'Approximately three hours to complete all six modules, reflection exercises, scenarios, and the final exam. Designed to fit within a half day.'
            },
            {
              q: 'What happens if a server fails the exam?',
              a: 'Three attempts are included. If all three are unsuccessful, the server is required to retake the full program before attempting again. No additional charge for retakes.'
            },
            {
              q: 'What is the difference between renewal and re-certification?',
              a: 'Renewal ($75) is for servers who complete the process before their current certification expires. Re-certification ($125) applies when a certification has lapsed. Staying current is always the better value.'
            },
            {
              q: 'Can servers complete the program on their own time?',
              a: 'Yes — the online program is self-paced. Servers can complete it on any device, at any time. Progress is saved between sessions.'
            },
            {
              q: 'Does my property need to make it mandatory?',
              a: 'No. RSI works as a voluntary program too. Properties that open the door often find their best servers pursue it on their own — which drives organic buy-in across the team.'
            },
          ].map((item, idx) => (
            <div key={idx} className={`py-8 ${idx !== 4 ? 'border-b border-gold/10' : ''}`}>
              <h3 className="text-white font-bold mb-3" style={{ fontFamily: 'Georgia, serif' }}>{item.q}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Georgia, serif' }}>
          Ready to get started?
        </h2>
        <p className="text-gray-400 mb-8">Reach out and we will put together the right program for your team.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/contact" className="px-8 py-4 bg-gold text-black font-bold tracking-widest text-sm hover:bg-gold/80 transition-colors hover-lift">
            CONTACT US
          </a>
          <a href="/program" className="px-8 py-4 border border-gold text-gold font-bold tracking-widest text-sm hover:bg-gold hover:text-black transition-colors hover-lift">
            VIEW THE PROGRAM
          </a>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Pricing