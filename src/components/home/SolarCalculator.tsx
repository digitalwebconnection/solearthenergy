import { useState } from 'react';
import { Calculator, Sun, DollarSign, Leaf, Zap, ArrowRight } from 'lucide-react';

export default function SolarCalculator() {
  const [monthlyBill, setMonthlyBill] = useState<number>(350);

  // Simple calculation metrics
  const recommendedSystemSize = (monthlyBill * 0.022).toFixed(1);
  const estimatedAnnualSavings = Math.round(monthlyBill * 0.72 * 4);
  const paybackYears = (4.2 - (monthlyBill > 500 ? 0.7 : monthlyBill < 200 ? -0.5 : 0)).toFixed(1);
  const panelsRequired = Math.round(parseFloat(recommendedSystemSize) * 1000 / 440); // 440W panels
  const carbonOffset = (parseFloat(recommendedSystemSize) * 1.35).toFixed(1); // Tonnes/year

  return (
    <section id="solar-calculator" aria-label="Solar Potential Calculator" className="relative py-10 bg-[#F8F8F8] text-[#202020] overflow-hidden select-none">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute left-[12%] top-0 w-px h-full bg-stone-300/40" />
        <div className="absolute right-[12%] top-0 w-px h-full bg-stone-300/40" />
        <div className="absolute top-[25%] left-0 w-full h-px bg-stone-300/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-5xl mx-auto mb-10 space-y-4">
          <div className="flex items-center justify-center gap-2.5">
            <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
            <span className="text-sm font-bold text-[#1870B8] uppercase tracking-wider">ROI simulator</span>
            <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-[#202020]">
            Calculate Your <span className="italic text-[#1870B8]">Solar Potential</span>
          </h2>
          <p className="text-slate-900 text-sm sm:text-base max-w-7xl mx-auto leading-relaxed">
            Adjust the slider to match your current average monthly electricity bill and see your projected savings immediately.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12  items-stretch">
          
          {/* Left Panel: The Input Slider */}
          <div className="lg:col-span-5 bg-white border border-stone-300  p-8 shadow-lg flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-widest text-[#1870B8] uppercase flex items-center gap-2">
                  <Calculator className="h-4 w-4" /> Bill Parameter
                </span>
                <span className="text-[10px] font-mono text-stone-400">INPUT MODULE v1.8</span>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <label htmlFor="bill-range" className="text-sm font-medium text-stone-700">Monthly Power Bill</label>
                  <span className="text-4xl font-extrabold text-[#1870B8] tracking-tight">
                    ${monthlyBill}
                  </span>
                </div>
                <input
                  id="bill-range"
                  type="range"
                  min="100"
                  max="1200"
                  step="50"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(Number(e.target.value))}
                  className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#1870B8]"
                />
                <div className="flex justify-between text-[10px] font-mono text-stone-400">
                  <span>$100 / mo</span>
                  <span>$600 / mo</span>
                  <span>$1,200 / mo</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 border-t border-stone-100 pt-6">
              <h4 className="text-sm font-bold text-stone-800">System Recommendation</h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Based on your current consumption, we recommend installing a minimum of a <span className="font-semibold text-stone-800">{recommendedSystemSize}kW Array Matrix</span> to achieve maximum grid offset.
              </p>
              <div className="flex items-center gap-4 bg-[#F8F8F8] p-4 rounded-xl border border-stone-200/50">
                <Sun className="h-6 w-6 text-[#F8C000] shrink-0" />
                <div>
                  <p className="text-[10px] font-mono text-stone-400 uppercase leading-none">Suggested Array</p>
                  <p className="text-sm font-bold text-stone-900 mt-1">{panelsRequired}x 440W Tier-1 Panels</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel: Simulated Output Dashboard */}
          <div className="lg:col-span-7 bg-[#1870B8] text-white  p-8 lg:p-10 shadow-xl relative overflow-hidden flex flex-col justify-between ">
            {/* Ambient subtle glow background */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
              
              {/* Stat 1 */}
              <div className="space-y-2 border-l-2 border-[#F8C000] pl-5">
                <div className="flex items-center gap-2 text-[#F8C000] text-xs font-mono tracking-wider uppercase">
                  <DollarSign className="h-3.5 w-3.5" /> Estimated Annual Yield
                </div>
                <p className="text-4xl font-extrabold tracking-tight">${estimatedAnnualSavings}</p>
                <p className="text-xs text-white/70 font-light">Direct offset from retail grid rates</p>
              </div>

              {/* Stat 2 */}
              <div className="space-y-2 border-l-2 border-[#28A8E0] pl-5">
                <div className="flex items-center gap-2 text-[#28A8E0] text-xs font-mono tracking-wider uppercase">
                  <Zap className="h-3.5 w-3.5" /> Estimated Payback
                </div>
                <p className="text-4xl font-extrabold tracking-tight">~{paybackYears} Years</p>
                <p className="text-xs text-white/70 font-light">Expected timeline for 100% amortization</p>
              </div>

              {/* Stat 3 */}
              <div className="space-y-2 border-l-2 border-emerald-400 pl-5">
                <div className="flex items-center gap-2 text-emerald-300 text-xs font-mono tracking-wider uppercase">
                  <Leaf className="h-3.5 w-3.5" /> Carbon Offset
                </div>
                <p className="text-4xl font-extrabold tracking-tight">{carbonOffset} Tons</p>
                <p className="text-xs text-white/70 font-light">Equivalent CO2 removed per annum</p>
              </div>

              {/* Stat 4 */}
              <div className="space-y-2 border-l-2 border-purple-400 pl-5">
                <div className="flex items-center gap-2 text-purple-300 text-xs font-mono tracking-wider uppercase">
                  <Sun className="h-3.5 w-3.5" /> Est. Lifetime Savings
                </div>
                <p className="text-4xl font-extrabold tracking-tight">${estimatedAnnualSavings * 25}</p>
                <p className="text-xs text-white/70 font-light">Calculated over a 25-year lifespan</p>
              </div>

            </div>

            <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <p className="text-xs text-white/80 leading-relaxed max-w-md text-left">
                *Simulations calculated assuming standard daily solar access index of 4.2 hours and NSW feed-in tariffs.
              </p>
              <a
                href="#contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-linear-to-r from-[#1870B8] to-[#28A8E0] hover:opacity-90 text-white px-6 py-3.5 rounded-full font-bold text-xs tracking-wider uppercase transition-opacity duration-200 shrink-0 shadow-lg shadow-black/10"
              >
                Request Custom Audit <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
