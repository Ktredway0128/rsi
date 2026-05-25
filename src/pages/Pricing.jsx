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
          A platform subscription for your property and in-person training when you want Kyle in the room.
          No per-server fees. No renewals. Just access to the standard.
        </p>
      </div>

      {/* Platform Pricing */}
      <div className="py-20 px-12 border-b border-gold/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-widest text-gold mb-12 uppercase text-center">Online Platform</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Monthly */}
            <div className="border border-gold/20 p-8 flex flex-col">
              <p className="text-xs tracking-widest text-gold uppercase mb-4">Monthly</p>
              <div className="mb-4">
                <span className="text-5xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>$350</span>
                <span className="text-gray-400 text-sm ml-2">/ month</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                Unlimited staff access. New hires get a code and go through the program immediately. Cancel anytime.
              </p>
              <div className="border-t border-gold/10 pt-6">
                {[
                  'Unlimited server enrollments',
                  'Full 6-module curriculum',
                  'Checkpoint questions and exercises',
                  'Service scenarios',
                  '40-question randomized exam',
                  'Individual completion certificates',
                  'Cancel anytime',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 mb-3">
                    <div className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Annual */}
            <div className="border border-gold bg-gold/5 p-8 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs tracking-widest text-gold uppercase">Annual</p>
                <span className="text-xs text-black bg-gold px-2 py-1 font-sans font-semibold tracking-wide">SAVE $700</span>
              </div>
              <div className="mb-4">
                <span className="text-5xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>$3,500</span>
                <span className="text-gray-400 text-sm ml-2">/ year</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                Everything in monthly, billed annually. Best for properties with consistent staff and regular turnover.
              </p>
              <div className="border-t border-gold/10 pt-6">
                {[
                  'Everything in monthly',
                  'Two months free',
                  'Priority support',
                  'Ideal for stable teams',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 mb-3">
                    <div className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* In-Person Callout */}
      <div className="py-16 px-12 border-b border-gold/20 bg-gold/5">
        <div className="max-w-4xl mx-auto">
          
          {/* Video — full width above content */}
          <div className="overflow-hidden rounded-sm mb-12 -mx-12">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-64 md:h-80 object-contain"
              src="/pricing-training.mp4"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            <div className="flex-1">
              <p className="text-sm tracking-widest text-gold mb-4 uppercase">The Most Powerful Way to Train Your Team</p>
              <h2
                className="text-3xl font-bold text-white mb-6"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                There is nothing like being in the room.
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                The online platform delivers the full RSI curriculum and a consistent standard across your entire team. Every server who completes it is genuinely prepared — the standard does not change based on how you get there.
              </p>
              <p className="text-gray-400 leading-relaxed">
                In-person training adds something the screen cannot replicate — live demonstration of tableside mechanics, real-time correction, and the shared energy of an entire team going through the program together. And unlike the online program, in-person is built entirely around you. Your team. Your menu. Your beverage program. Your service culture. Kyle doesn't come in and deliver a script — he comes in and trains your specific people for your specific restaurant at the highest level.
              </p>
            </div>
            <div className="flex-shrink-0 md:w-72">
              <div className="border border-gold/30 p-6">
                <p className="text-xs tracking-widest text-gold uppercase mb-6">In-Person Includes</p>
                {[
                  'Live demonstration of tableside mechanics',
                  'Real-time correction and coaching',
                  'Live service scenario roleplay',
                  'Curriculum tailored to your menu and atmosphere',
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

      {/* In-Person Pricing */}
      <div className="py-20 px-12 border-b border-gold/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-widests text-gold mb-12 uppercase text-center">In-Person Training</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="border border-gold/20 p-8">
              <p className="text-xs tracking-widest text-gold uppercase mb-4">Local</p>
              <p className="text-xs text-gray-500 font-sans mb-4">Maricopa County</p>
              <div className="mb-4">
                <span className="text-5xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>$275</span>
                <span className="text-gray-400 text-sm ml-2">/ server</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Half-day in-person training delivered at your property by Kyle Tredway. Not a recitation of the curriculum — a fully customized session built around your team, your menu, your beverage program, and your service culture.
              </p>
              <p className="text-xs text-gold/60 tracking-wide">Minimum 5 servers</p>
            </div>

            <div className="border border-gold bg-gold/5 p-8">
              <p className="text-xs tracking-widest text-gold uppercase mb-4">Travel</p>
              <p className="text-xs text-gray-500 font-sans mb-4">Nationwide</p>
              <div className="mb-4">
                <span className="text-5xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>$375</span>
                <span className="text-gray-400 text-sm ml-2">/ server + travel</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Full in-person training at properties outside the Maricopa County market. Fully customized to your team, your menu, your beverage program, and your service culture — delivered anywhere in the country.
              </p>
              <p className="text-xs text-gold/60 tracking-wide">Minimum 8 servers · Travel at cost</p>
            </div>

          </div>
        </div>
      </div>

      {/* What certification means */}
      <div className="py-20 px-12 border-b border-gold/20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm tracking-widest text-gold mb-6 uppercase">Certification</p>
          <h3 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Proof the standard has been met
          </h3>
          <p className="text-gray-400 leading-relaxed mb-4">
            Every server who passes the exam receives a named RSI Certified Service Professional certificate. For most properties it becomes a simple part of the onboarding process — servers complete the program, earn their certificate, and show up to their first shift prepared.
          </p>
          <p className="text-gray-400 leading-relaxed">
            No ongoing renewal required. The certificate is proof of completion — a record that this server went through the RSI program and met the standard.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 px-12 border-b border-gold/20">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm tracking-widest text-gold mb-12 uppercase text-center">Common Questions</p>
          {[
            {
              q: 'How long does the program take?',
              a: 'Approximately two to three hours to complete all six modules, reflection exercises, scenarios, and the final exam. Designed to fit within a half day.'
            },
            {
              q: 'How does the subscription work for new hires?',
              a: 'When a new server joins your team, you give them an access code. They sign up, complete the program at their own pace, and earn their certificate. No per-server fees, no additional charges — it\'s included in your subscription.'
            },
            {
              q: 'What happens if a server fails the exam?',
              a: 'Three attempts are included. If all three are unsuccessful, the server reviews the modules and tries again. No additional charge for retakes.'
            },
            {
              q: 'Can servers complete the program on their own time?',
              a: 'Yes — the online program is self-paced. Servers can complete it on any device, at any time. Progress is saved between sessions.'
            },
            {
              q: 'Do we need the subscription to book in-person training?',
              a: 'No — in-person training is available independently. Many properties start with an in-person session and then add the platform subscription for ongoing new hire onboarding.'
            },
            {
              q: 'Does my property need to make it mandatory?',
              a: 'No. RSI works as a voluntary program too. Properties that open the door often find their best servers pursue it on their own — which drives organic buy-in across the team.'
            },
          ].map((item, idx) => (
            <div key={idx} className={`py-8 ${idx !== 5 ? 'border-b border-gold/10' : ''}`}>
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