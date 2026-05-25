import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Terms() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />

      {/* Hero */}
      <div className="pt-40 pb-12 px-12 text-center border-b border-gold/20">
        <p className="text-sm tracking-widest text-gold mb-4 uppercase">Legal</p>
        <h1 className="text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
          Terms of Service
        </h1>
        <p className="text-gray-400 text-sm">Last updated: May 2026</p>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-12 py-20">
        {[
          {
            title: '1. Acceptance of Terms',
            content: 'By accessing or using the Refined Service Institute platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not use the platform.'
          },
          {
            title: '2. Intellectual Property',
            content: 'All content on the RSI platform — including but not limited to module curriculum, exam questions, service scenarios, reflection exercises, and all written material — is the exclusive intellectual property of Refined Service Institute. You may not copy, reproduce, distribute, publish, display, or create derivative works from any RSI content without express written permission. Violation of this policy may result in immediate termination of access and legal action.'
          },
          {
            title: '3. Acceptable Use',
            content: 'The RSI platform is licensed for personal professional development only. You may not share your login credentials with any other person. You may not screenshot, record, or otherwise capture and distribute platform content. You may not use RSI content for commercial training purposes without a separate written agreement with RSI.'
          },
          {
            title: '4. Subscription Terms',
            content: 'Property subscriptions are billed monthly or annually as selected at the time of purchase. Subscriptions automatically renew unless cancelled. RSI reserves the right to modify pricing with 30 days written notice. Cancellation takes effect at the end of the current billing period — access continues until that date.'
          },
          {
            title: '5. Refund Policy',
            content: 'Due to the digital nature of the RSI platform and curriculum, all purchases are final and non-refundable. If you experience a technical issue that prevents access to the platform, contact RSI directly and we will work to resolve it promptly.'
          },
          {
            title: '6. Certification',
            content: 'RSI Certified Service Professional certificates are issued upon successful completion of the program and passing the final exam. RSI reserves the right to revoke certification if a user is found to have violated these terms, shared exam content, or obtained certification through fraudulent means.'
          },
          {
            title: '7. Limitation of Liability',
            content: 'Refined Service Institute provides educational content and professional training resources. RSI makes no guarantees regarding employment outcomes, gratuity or income increases, or specific business results from completing the program. RSI\'s liability is limited to the amount paid for access to the platform.'
          },
          {
            title: '8. Privacy',
            content: 'RSI collects only the information necessary to provide the platform — your name, email address, and program progress. We do not sell or share your personal information with third parties. Your data is stored securely and used solely to deliver and improve the RSI platform.'
          },
          {
            title: '9. Changes to Terms',
            content: 'RSI reserves the right to update these Terms of Service at any time. Users will be notified of material changes via email. Continued use of the platform after notification constitutes acceptance of the updated terms.'
          },
          {
            title: '10. Governing Law',
            content: 'These Terms of Service are governed by the laws of the State of Arizona. Any disputes arising from use of the RSI platform shall be resolved in the courts of Maricopa County, Arizona.'
          },
          {
            title: '11. Contact',
            content: 'For questions about these terms, contact RSI at refinedserviceinstitute@gmail.com or by phone at 480-438-0390.'
          },
        ].map((section, idx) => (
          <div key={idx} className="mb-10">
            <h2 className="font-serif text-xl text-white mb-3">{section.title}</h2>
            <p className="text-gray-400 leading-relaxed text-sm">{section.content}</p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  )
}