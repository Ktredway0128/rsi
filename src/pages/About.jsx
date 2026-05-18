import Navbar from '../components/Navbar';
import Footer from "../components/Footer";

function About() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* Hero */}
      <div className="pt-40 pb-20 px-12 text-center border-b border-gold/20">
        <p className="text-sm tracking-widest text-gold mb-4 uppercase">About</p>
        <h1
          className="text-5xl font-bold text-white mb-6"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          The Standard Behind RSI
        </h1>
        <p className="max-w-3xl mx-auto text-gray-400 text-lg leading-relaxed">
          RSI was built by someone who has spent twenty years at the table — not behind a desk.
          Every principle in this program comes from real service, real guests, and a genuine belief
          that hospitality at its highest level is one of the most meaningful things a person can do professionally.
        </p>
      </div>

      {/* Founder Section */}
      <div className="py-20 px-12 border-b border-gold/20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-16 items-start">

          {/* Photo */}
          <div className="flex-shrink-0">
            <img
              src="/src/assets/headshot.jpg"
              alt="Kyle Tredway"
              className="w-72 h-80 object-cover object-top grayscale"
            />
            <div className="w-72 h-px bg-gold opacity-50 mt-4 mb-3" />
            <p className="text-white font-bold text-lg" style={{ fontFamily: 'Georgia, serif' }}>Kyle Tredway</p>
            <p className="text-gold text-xs tracking-widest uppercase mt-1">Founder, Refined Service Institute</p>
          </div>

          {/* Bio */}
          <div className="flex-1">
            <p className="text-sm tracking-widest text-gold mb-6 uppercase">The Founder</p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { label: 'Experience', value: '20 Years in Hospitality' },
                { label: 'Credential', value: 'Certified Sommelier' },
                { label: 'Caliber', value: 'Fine Dining $300+ Per Cover' },
                { label: 'Trained', value: 'Over 100 Servers' },
                { label: 'Markets', value: 'Bay Area · LA · Scottsdale · Nashville' },
                { label: 'Currently', value: 'Cafe Monarch · Reserve, Scottsdale' },
              ].map((item) => (
                <div key={item.label} className="border-l border-gold/30 pl-4">
                  <p className="text-xs tracking-widest text-gold uppercase mb-1">{item.label}</p>
                  <p className="text-white text-sm">{item.value}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-400 leading-relaxed mb-6">
              Kyle Tredway has spent two decades in fine dining — not as an observer, but as the person at the table. As a certified sommelier and lead server and trainer at some of the most respected restaurants in the country, he has seen firsthand what separates a server who is technically correct from one who genuinely changes a guest's evening.
            </p>
            <p className="text-gray-400 leading-relaxed mb-6">
              The Refined Service Institute was built to bridge that gap — to take the standard that exists at the highest level of hospitality and make it accessible, teachable, and verifiable for any property that cares about the experience they deliver.
            </p>
            <p className="text-gray-400 leading-relaxed">
              RSI is not a generic hospitality training program. It is a curriculum built from twenty years of real service, refined into a certification that means something because it was earned.
            </p>
          </div>

        </div>
      </div>

      {/* Philosophy */}
      <div className="py-20 px-12 border-b border-gold/20">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm tracking-widest text-gold mb-12 uppercase text-center">The Philosophy</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: 'Humans Need Humans',
                body: 'In a world where artificial intelligence is replacing more human work every year, one thing remains irreplaceable — the human need to be cared for by another human. Hospitality is not just surviving the age of AI. It is becoming more valuable because of it.'
              },
              {
                title: 'The Standard Was Lost',
                body: 'The industry has chased hype over heart. The hottest table, the longest waitlist, the most talked-about chef. And in the middle of all of it, the guest sits down — and nobody is really there with them. RSI exists to restore what was lost.'
              },
              {
                title: 'Service Is a Craft',
                body: 'The best servers in the world treat their work the way a surgeon treats precision or an architect treats structure. With intention, pride, and genuine care for the outcome. RSI trains servers to see their work that way — and to deliver on it every shift.'
              },
            ].map((item) => (
              <div key={item.title}>
                <div className="w-8 h-px bg-gold mb-6" />
                <h3
                  className="text-lg font-bold text-white mb-4"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {item.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-12 text-center">
        <h2
          className="text-3xl font-bold text-white mb-6"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          Ready to bring RSI to your team?
        </h2>
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

export default About