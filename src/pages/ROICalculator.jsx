import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ROICalculator() {
    const [form, setForm] = useState({
        servers: '',
        avgNightlyRevenue: '',
        newHiresPerYear: '',
        rampUpWeeks: '3',
        shiftsPerWeek: '7',
        newHireShiftsPerWeek: '4',
    })

  const [result, setResult] = useState(null)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const calculate = (e) => {
    e.preventDefault()

    const servers = parseFloat(form.servers)
    const avgNightlyRevenue = parseFloat(form.avgNightlyRevenue)
    const newHiresPerYear = parseFloat(form.newHiresPerYear)
    const rampUpWeeks = parseFloat(form.rampUpWeeks)
    const shiftsPerWeek = parseFloat(form.shiftsPerWeek)

    // Revenue upside — 10% lift from trained servers
    const annualNightlyRevenue = avgNightlyRevenue * shiftsPerWeek * 52
    const revenueUpside = annualNightlyRevenue * 0.05

    // Training cost — ramp up drag per new hire
    // New hire runs ~60% of full section size AND 70% performance per table
    const revenuePerServer = avgNightlyRevenue / servers
    const newHireShiftsPerWeek = parseFloat(form.newHireShiftsPerWeek)
    const rampUpShifts = rampUpWeeks * newHireShiftsPerWeek
    const fullPerformancePerShift = revenuePerServer
    const newHirePerformancePerShift = revenuePerServer * 0.60 * 0.70
    const lostRevenuePerHire = (fullPerformancePerShift - newHirePerformancePerShift) * rampUpShifts
    const totalRampUpCost = lostRevenuePerHire * newHiresPerYear

    const rsiRampUpContribution = totalRampUpCost * 0.40
    const totalProblemCost = revenueUpside + rsiRampUpContribution
    const rsiAnnualCost = 3500
    const netROI = totalProblemCost - rsiAnnualCost
    const roiMultiple = (totalProblemCost / rsiAnnualCost).toFixed(1)

    setResult({
        revenueUpside,
        totalRampUpCost,
        rsiRampUpContribution: totalRampUpCost * 0.40,
        totalProblemCost,
        rsiAnnualCost,
        netROI,
        roiMultiple,
    })
  }

  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(num)
  }

  const inputBase = "bg-neutral-900 border border-neutral-700 focus:border-gold focus:ring-1 focus:ring-gold/20 text-white placeholder-gray-600 rounded-sm px-4 py-3 text-sm font-sans outline-none transition-all duration-200 w-full"

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero */}
      <div className="pt-40 pb-16 px-6 text-center border-b border-gold/20">
        <p className="text-sm tracking-widest text-gold mb-4 uppercase font-sans">ROI Calculator</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            What Are Undertrained Staff and New Hires Actually Costing You?
        </h1>
        <p className="max-w-2xl mx-auto text-gray-400 text-lg leading-relaxed">
          Enter a few numbers about your property and see the real cost of undertrained servers/new-hires and what RSI returns.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Form */}
          <div>
            <p className="text-xs tracking-widest uppercase text-gold font-sans mb-8">Your Property</p>
            <form onSubmit={calculate} className="flex flex-col gap-6">

              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">Total number of servers on a given night</label>
                <input
                  name="servers"
                  type="number"
                  placeholder="12"
                  value={form.servers}
                  onChange={handleChange}
                  required
                  min="1"
                  className={inputBase}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">Average Nightly Revenue ($)</label>
                <input
                  name="avgNightlyRevenue"
                  type="number"
                  placeholder="8000"
                  value={form.avgNightlyRevenue}
                  onChange={handleChange}
                  required
                  min="1"
                  className={inputBase}
                />
                <p className="text-xs text-gray-600 font-sans">Use your average across a full year</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">New Hires Per Year</label>
                <input
                  name="newHiresPerYear"
                  type="number"
                  placeholder="8"
                  value={form.newHiresPerYear}
                  onChange={handleChange}
                  required
                  min="1"
                  className={inputBase}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">Weeks Until New Hire Runs Full Section</label>
                <select
                  name="rampUpWeeks"
                  value={form.rampUpWeeks}
                  onChange={handleChange}
                  className={inputBase + " appearance-none cursor-pointer"}
                >
                  <option value="2">2 weeks</option>
                  <option value="3">3 weeks</option>
                  <option value="4">4 weeks</option>
                  <option value="5">5 weeks</option>
                  <option value="6">6 weeks</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">New Hire Shifts Per Week</label>
                <select
                  name="newHireShiftsPerWeek"
                  value={form.newHireShiftsPerWeek}
                  onChange={handleChange}
                  className={inputBase + " appearance-none cursor-pointer"}
                >
                  <option value="3">3 shifts</option>
                  <option value="4">4 shifts</option>
                  <option value="5">5 shifts</option>
                </select>
                <p className="text-xs text-gray-600 font-sans">How many shifts per week does a new hire typically work during ramp-up</p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs tracking-widest uppercase text-gray-400 font-sans">Service Days Per Week</label>
                <select
                  name="shiftsPerWeek"
                  value={form.shiftsPerWeek}
                  onChange={handleChange}
                  className={inputBase + " appearance-none cursor-pointer"}
                >
                  <option value="4">4 days</option>
                  <option value="5">5 days</option>
                  <option value="6">6 days</option>
                  <option value="7">7 days</option>
                </select>
              </div>

              <button
                type="submit"
                className="hover-lift bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-10 py-4 transition-opacity mt-2"
              >
                Calculate My ROI
              </button>
            </form>
          </div>

          {/* Results */}
          <div>
            {!result ? (
              <div className="border border-neutral-800 p-8 h-full flex flex-col justify-center items-center text-center">
                <div className="w-12 h-px bg-gold mx-auto mb-6" />
                <p className="text-gray-600 text-sm font-sans leading-relaxed">
                  Enter your property details and click Calculate to see what undertrained staff is costing you annually.
                </p>
                <div className="w-12 h-px bg-gold mx-auto mt-6" />
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <p className="text-xs tracking-widest uppercase text-gold font-sans">Your Results</p>

                {/* Revenue upside */}
                <div className="border border-neutral-800 p-6">
                    <p className="text-xs tracking-widest uppercase text-gray-500 font-sans mb-2">Annual Revenue Upside</p>
                    <p className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                        {formatCurrency(result.revenueUpside)}
                    </p>
                    <div className="border-t border-neutral-800 pt-3 flex flex-col gap-1">
                        <p className="text-xs text-gray-600 font-sans">
                        ${form.avgNightlyRevenue.toLocaleString()} nightly × {form.shiftsPerWeek} days × 52 weeks = {formatCurrency(parseFloat(form.avgNightlyRevenue) * parseFloat(form.shiftsPerWeek) * 52)} annual revenue
                        </p>
                        <p className="text-xs text-gray-600 font-sans">
                        × 5% conservative lift from improved service confidence and beverage knowledge = {formatCurrency(result.revenueUpside)}
                        </p>
                    </div>
                </div>

                {/* Ramp up cost */}
                <div className="border border-neutral-800 p-6">
                    <p className="text-xs tracking-widest uppercase text-gray-500 font-sans mb-2">Annual New Hire Ramp-Up Cost</p>
                    <p className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                        {formatCurrency(result.totalRampUpCost)}
                    </p>
                    <div className="border-t border-neutral-800 pt-3 flex flex-col gap-2">
                        <p className="text-xs text-gray-600 font-sans">
                        {formatCurrency(parseFloat(form.avgNightlyRevenue) / parseFloat(form.servers))} revenue per server per night
                        </p>
                        <p className="text-xs text-gray-600 font-sans">
                        New hire runs 60% of full section at 70% performance = 42% of full output
                        </p>
                        <p className="text-xs text-gray-600 font-sans">
                        Gap of {formatCurrency((parseFloat(form.avgNightlyRevenue) / parseFloat(form.servers)) * 0.58)} per night × {parseFloat(form.rampUpWeeks) * parseFloat(form.newHireShiftsPerWeek)} shifts ({form.rampUpWeeks} weeks × {form.newHireShiftsPerWeek} shifts/week) = {formatCurrency((parseFloat(form.avgNightlyRevenue) / parseFloat(form.servers)) * 0.58 * parseFloat(form.rampUpWeeks) * parseFloat(form.newHireShiftsPerWeek))} per new hire × {form.newHiresPerYear} hires = {formatCurrency(result.totalRampUpCost)}
                        </p>
                        <div className="border-t border-neutral-800 pt-3 mt-1">
                        <p className="text-xs text-gold font-sans mb-1">RSI addresses approximately 40% of this cost {formatCurrency(result.totalRampUpCost * 0.40)} annually by:</p>
                        <p className="text-xs text-gray-500 font-sans">→ Eliminating foundational training so your team focuses only on what your restaurant requires</p>
                        <p className="text-xs text-gray-500 font-sans">→ Removing the headache of teaching basics every new hire should already know</p>
                        <p className="text-xs text-gray-500 font-sans">→ New-hire retention. Filtering out uncommitted hires before they waste your training investment. Only serious candidates complete the program</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gold/20 pt-6">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs tracking-widest uppercase text-gray-400 font-sans">Total Annual Cost of the Problem</p>
                    <p className="text-xl font-bold text-white" style={{ fontFamily: 'Georgia, serif' }}>{formatCurrency(result.totalProblemCost)}</p>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-xs tracking-widest uppercase text-gray-400 font-sans">RSI Annual Cost</p>
                    <p className="text-xl font-bold text-gold" style={{ fontFamily: 'Georgia, serif' }}>{formatCurrency(result.rsiAnnualCost)}</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gold/20 pt-4">
                    <p className="text-xs tracking-widest uppercase text-gold font-sans">Your Net Return</p>
                    <p className="text-2xl font-bold text-gold" style={{ fontFamily: 'Georgia, serif' }}>{formatCurrency(result.netROI)}</p>
                  </div>
                </div>

                {/* ROI callout */}
                <div className="bg-gold/10 border border-gold/30 p-6 text-center">
                  <p className="text-xs tracking-widest uppercase text-gold font-sans mb-2">Return on Investment</p>
                  <p className="text-4xl font-bold text-white mb-1" style={{ fontFamily: 'Georgia, serif' }}>{result.roiMultiple}x</p>
                  <p className="text-gray-400 text-xs font-sans">For every dollar spent on RSI, your property returns {result.roiMultiple} dollars.</p>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contact"
                    className="hover-lift flex-1 bg-gold text-black text-xs tracking-widest uppercase font-sans font-semibold px-8 py-4 text-center transition-opacity"
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/pricing"
                    className="hover-lift flex-1 border border-gold text-gold text-xs tracking-widest uppercase font-sans px-8 py-4 text-center transition-colors hover:bg-gold hover:text-black"
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}