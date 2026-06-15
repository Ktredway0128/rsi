import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

const MONTHLY_PRICE_ID = 'price_1TbOWYGUezZzezl5LiwjeIKq';
const ANNUAL_PRICE_ID = 'price_1TbOWZGUezZzezl5WAYO1OkV';

function Pricing() {
  const [loading, setLoading] = useState(null);

  const handleCheckout = async (priceId) => {
    setLoading(priceId);
    try {
      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

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
          A platform subscription for your property. No per-server fees. No renewals. Just access to the standard.
        </p>
      </div>

      {/* Platform Pricing */}
      <div className="py-20 px-12 border-b border-gold/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-widest text-gold mb-12 uppercase text-center">Monthly / Annually</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Monthly */}
            <div className="border border-gold/20 p-8 flex flex-col">
              <p className="text-xs tracking-widest text-gold uppercase mb-4">Monthly</p>
              <div className="mb-4">
                <span className="text-5xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>$350</span>
                <span className="text-gray-400 text-sm ml-2">/ month</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                Unlimited staff access. New hires get an access code and go through the program immediately. Cancel anytime.
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
                <button
                  onClick={() => handleCheckout(MONTHLY_PRICE_ID)}
                  disabled={loading === MONTHLY_PRICE_ID}
                  className="mt-6 w-full px-8 py-4 bg-gold text-black font-bold tracking-widest text-sm hover:bg-gold/80 transition-colors uppercase hover-lift disabled:opacity-50"
                >
                  {loading === MONTHLY_PRICE_ID ? 'Loading...' : 'Start Today'}
                </button>
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
                Everything in monthly, billed annually. The simplest way to budget training for the year ahead.
              </p>
              <div className="border-t border-gold/10 pt-6">
                {[
                  'Everything in monthly',
                  'Two months free',
                  'Price locked in for the year',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 mb-3">
                    <div className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                    <p className="text-gray-300 text-sm">{item}</p>
                  </div>
                ))}
                <button
                  onClick={() => handleCheckout(ANNUAL_PRICE_ID)}
                  disabled={loading === ANNUAL_PRICE_ID}
                  className="mt-6 w-full px-8 py-4 bg-gold text-black font-bold tracking-widest text-sm hover:bg-gold/80 transition-colors uppercase hover-lift disabled:opacity-50"
                >
                  {loading === ANNUAL_PRICE_ID ? 'Loading...' : 'Start Today'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              Managing multiple locations?{' '}
              <a href="/contact" className="text-gold hover:text-gold/70 transition-colors">
                Get in touch for enterprise pricing.
              </a>
            </p>
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
            Every server who passes the exam receives a named RSI Certified Service Professional certificate. For properties it becomes a simple part of the onboarding process. Servers complete the program, earn their certificate, and show up to their first shift prepared.
          </p>
          <p className="text-gray-400 leading-relaxed">
            No expiration or ongoing renewal required. The certificate is proof of completion. A record that this front-of-house employee went through the RSI program and met the standard.
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
              a: 'Approximately three hours to complete all six modules, reflection exercises, scenarios, and the final exam. Designed to fit within a half day.'
            },
            {
              q: 'Is RSI only for servers?',
              a: 'No. RSI is built for all front-of-house serving staff; servers, server assistants, food runners, and anyone on the floor who interacts with guests.'
            },
            {
              q: 'How does the subscription work for new hires?',
              a: 'When a new server joins your team, you give them an access code. They sign up, complete the program at their own pace, and earn their certificate. No per-server fees, no additional charges, it\'s included in your subscription.'
            },
            {
              q: 'What happens if an employee fails the exam?',
              a: 'Three attempts are included. If all three are unsuccessful, the employee reviews the modules and tries again. No additional charge for retakes.'
            },
            {
              q: 'Can staff complete the program on their own time?',
              a: 'Yes. The online program is self-paced. Front-of-house staff can complete it on any device, at any time. Progress is saved between sessions.'
            },
            {
              q: 'Is RSI just for new hires, or can existing staff use it too?',
              a: 'Both. RSI was built for onboarding new hires, but properties can also open it up to existing staff as a refresher or for those who want to sharpen their service skills.'
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
        <p className="text-gray-400 mb-8">Reach out and we will put together the right plan for your team.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/program"
            className="px-8 py-4 bg-gold text-black font-bold tracking-widest text-sm hover:bg-gold/80 transition-colors hover-lift"
          >
            VIEW THE PROGRAM
          </a>
          <a
            href="/contact"
            className="px-8 py-4 border border-gold text-gold font-bold tracking-widest text-sm hover:bg-gold hover:text-black transition-colors hover-lift"
          >
            GET IN TOUCH
          </a>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Pricing