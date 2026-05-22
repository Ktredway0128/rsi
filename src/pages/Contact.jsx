import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const INQUIRY_TYPES = [
  { value: "", label: "Select inquiry type" },
  { value: "in-person-local", label: "In-Person Local (Maricopa County)" },
  { value: "in-person-travel", label: "In-Person Travel" },
  { value: "online", label: "Online Program" },
  { value: "general", label: "General Question" },
];

const InputField = ({ label, id, optional, children }) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs tracking-widest uppercase text-gray-400 font-sans">
      {label}
      {optional && <span className="ml-2 text-gray-600 normal-case tracking-normal">optional</span>}
    </label>
    {children}
  </div>
);

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    property: "",
    role: "",
    email: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState(null);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    })
    setSubmitted(true)
  }

  const inputBase =
    "bg-neutral-900 border text-white placeholder-gray-600 rounded-sm px-4 py-3 text-sm font-sans outline-none transition-all duration-200 w-full";
  const inputIdle = "border-neutral-700";
  const inputFocused = "border-gold ring-1 ring-gold/20";

  const fieldProps = (name) => ({
    name,
    id: name,
    value: form[name],
    onChange: handleChange,
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(null),
    className: `${inputBase} ${focused === name ? inputFocused : inputIdle}`,
  });

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center max-w-3xl mx-auto">
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-sans mb-4">
          Get in Touch
        </p>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
          Elevate Your Team
        </h1>
        <div className="w-16 h-px bg-gold mx-auto mb-5" />
        <p className="text-gray-400 text-base md:text-lg leading-relaxed">
          Whether you're a single property or a multi-location group, RSI is built to fit your team.
          Reach out and we'll find the right path to certification together.
        </p>
      </section>

      {/* Main content */}
      <section className="px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

          {/* Form — 3 columns */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="border border-gold/30 bg-neutral-900 rounded-sm px-8 py-12 text-center">
                <div className="w-12 h-12 rounded-full border border-gold flex items-center justify-center mx-auto mb-6">
                  <svg className="w-5 h-5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-serif text-2xl text-white mb-3">Message Received</h2>
                <div className="w-10 h-px bg-gold mx-auto mb-4" />
                <p className="text-gray-400 text-sm leading-relaxed max-w-sm mx-auto">
                  Thank you for reaching out. You'll hear back within one business day — typically sooner.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", property: "", role: "", email: "", phone: "", inquiryType: "", message: "" }); }}
                  className="mt-8 text-xs tracking-widest uppercase text-gold border border-gold/40 px-6 py-2.5 hover-lift transition-colors hover:bg-gold/5"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input type="hidden" name="form-name" value="contact" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <InputField label="Full Name" id="name">
                        <input {...fieldProps("name")} type="text" placeholder="Jane Smith" required />
                      </InputField>
                      <InputField label="Property Name" id="property">
                        <input {...fieldProps("property")} type="text" placeholder="The Grand Hotel" required />
                      </InputField>
                    </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="Role / Title" id="role">
                      <input {...fieldProps("role")} type="text" placeholder="Food & Beverage Director" required />
                    </InputField>
                    <InputField label="Email Address" id="email">
                      <input {...fieldProps("email")} type="email" placeholder="jane@thegrandhotel.com" required />
                    </InputField>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <InputField label="Phone Number" id="phone" optional>
                      <input {...fieldProps("phone")} type="tel" placeholder="(602) 555-0100" />
                    </InputField>
                    <InputField label="Type of Inquiry" id="inquiryType">
                      <select
                        {...fieldProps("inquiryType")}
                        required
                        className={`${inputBase} ${focused === "inquiryType" ? inputFocused : inputIdle} appearance-none cursor-pointer`}
                      >
                        {INQUIRY_TYPES.map((opt) => (
                          <option key={opt.value} value={opt.value} disabled={opt.value === ""} className="bg-neutral-900">
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </InputField>
                  </div>

                  <InputField label="Message" id="message">
                    <textarea
                      {...fieldProps("message")}
                      rows={5}
                      placeholder="Tell us about your team, timeline, or any questions you have..."
                      required
                      className={`${inputBase} ${focused === "message" ? inputFocused : inputIdle} resize-none`}
                    />
                  </InputField>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="hover-lift w-full sm:w-auto bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-10 py-4 transition-opacity"
                    >
                      Send Message
                    </button>
                  </div>
              </form>
            )}
          </div>

          {/* Contact info — 2 columns */}
          <div className="lg:col-span-2 flex flex-col gap-8 lg:pt-1">

            {/* Response time */}
            <div className="border-l-2 border-gold pl-5">
              <p className="text-xs tracking-widest uppercase text-gold font-sans mb-2">Response Time</p>
              <p className="text-white font-serif text-lg mb-1">Within One Business Day</p>
              <p className="text-gray-400 text-sm leading-relaxed">
                Most inquiries receive a response same day. For urgent requests, call directly.
              </p>
            </div>

            {/* Direct contact */}
            <div className="flex flex-col gap-5">
              <p className="text-xs tracking-widest uppercase text-gold font-sans">Direct Contact</p>

              <a href="mailto:kyle@refinedserviceinstitute.com" className="group flex items-start gap-3">
                <div className="w-8 h-8 border border-neutral-700 group-hover:border-gold flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-sans uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-sm text-white group-hover:text-gold transition-colors">
                    refinedserviceinstitute@gmail.com
                  </p>
                </div>
              </a>

              <a href="tel:+16025550100" className="group flex items-start gap-3">
                <div className="w-8 h-8 border border-neutral-700 group-hover:border-gold flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-sans uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="text-sm text-white group-hover:text-gold transition-colors">
                    480-438-0390
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border border-neutral-700 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3.5 h-3.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-sans uppercase tracking-wider mb-0.5">Based In</p>
                  <p className="text-sm text-white">Scottsdale, Arizona</p>
                  <p className="text-xs text-gray-500 mt-0.5">Serving properties nationwide</p>
                </div>
              </div>
            </div>

            {/* In-person note */}
            <div className="bg-neutral-900 border border-neutral-800 p-5">
              <p className="text-xs tracking-widest uppercase text-gold font-sans mb-2">In-Person Training</p>
              <p className="text-sm text-gray-400 leading-relaxed">
                Local Maricopa County properties start at <span className="text-white">$225/server</span> (min. 5).
                Travel engagements available nationwide from <span className="text-white">$325/server</span> (min. 10).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-neutral-900 px-6 py-20 text-center">
        <p className="text-xs tracking-[0.25em] uppercase text-gold font-sans mb-4">Ready to Begin</p>
        <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
          Your staff. Certified. Elevated.
        </h2>
        <div className="w-12 h-px bg-gold mx-auto mb-6" />
        <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
          RSI certification is recognized proof of professional service excellence — for your team and your guests.
        </p>
        <a
          href="/program"
          className="hover-lift inline-block border border-gold text-gold text-xs tracking-widest uppercase font-sans px-10 py-4 transition-colors hover:bg-gold hover:text-black"
        >
          View the Program
        </a>
      </section>
      <Footer />
    </div>
  );
}