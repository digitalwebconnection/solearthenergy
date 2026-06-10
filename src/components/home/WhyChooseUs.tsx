import { Shield, Sparkles, DollarSign, Award, Star } from 'lucide-react';

export default function WhyChooseUs() {
  const highlights = [
    {
      icon: Award,
      title: 'CEC Approved Solar Retailer',
      desc: 'We strictly adhere to the Clean Energy Council guidelines, ensuring honest sales practices and verified safety standards.'
    },
    {
      icon: Shield,
      title: '25-Year Performance Guarantee',
      desc: 'Our premium tier-1 panels carry comprehensive long-term product and performance warranties backed by local support.'
    },
    {
      icon: DollarSign,
      title: 'Zero Upfront Financing',
      desc: 'Start saving from day one with smart solar payment plans that are designed to offset your current power bills.'
    },
    {
      icon: Sparkles,
      title: 'Premium Craftsmanship',
      desc: 'Our in-house engineers design optimized electrical layouts to maximize solar production even on complex roofs.'
    }
  ];

  return (
    <section id="why-choose-us" aria-label="Why Choose SolEarth" className="py-20 bg-[#F8F8F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Strengths Grid */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <div className="flex items-center space-x-2.5">
                <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
                <span className="text-sm font-bold text-[#1870B8] uppercase tracking-wider">Why Choose Us</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-[#202020]">
                Setting The Gold Standard In Renewable Solar Energy
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                SolEarth Energy combines premium equipment, qualified engineers, and exceptional customer support to deliver a flawless solar transition.
              </p>
            </div>

            {/* Strengths List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {highlights.map((item, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="shrink-0 h-12 w-12 rounded-xl bg-[#1870B8] text-white flex items-center justify-center shadow-lg shadow-[#1870B8]/20">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-lg md:text-xl font-serif font-semibold leading-snug text-[#202020]">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Stats Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#1870B8] text-white p-8 rounded-xl shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 border border-[#28A8E0]/20 overflow-hidden">
              <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-[#F8C000]/10 rounded-full blur-xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/15">
                <div>
                  <p className="text-xs font-bold text-[#F8C000] uppercase tracking-wider">SolEarth Energy</p>
                  <p className="text-lg font-black mt-1">Track Record of Success</p>
                </div>
                <div className="flex items-center space-x-1 bg-white/10 border border-white/15 px-3 py-1.5 rounded-full text-xs font-semibold">
                  <Star className="h-3.5 w-3.5 fill-[#F8C000] text-[#F8C000]" />
                  <span className="font-bold text-[#F8C000]">4.9 / 5</span>
                  <span className="text-white/70">Google Reviews</span>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-6 pt-6">
                {[
                  { label: 'CO2 Greenhouse Gas Avoided', value: '45,200 Tonnes', progress: 85 },
                  { label: 'Accredited Energy Installers', value: '48 Professionals', progress: 70 },
                  { label: 'Total Residential Savings', value: '$12.4M Saved', progress: 90 },
                  { label: 'Battery Capacity Commissioned', value: '8.5 MWh Storage', progress: 60 }
                ].map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-white/80">{stat.label}</span>
                      <span className="font-black text-[#F8C000]">{stat.value}</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/15 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${stat.progress}%`, background: 'linear-gradient(to right, #F8C000, #28A8E0)' }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Trust badges */}
              <div className="mt-8 pt-6 border-t border-white/15 flex justify-around items-center text-[10px] text-white/60 font-bold uppercase tracking-widest text-center">
                <div>
                  <p className="text-white text-lg">100%</p>
                  <p className="mt-0.5">Approved Retailer</p>
                </div>
                <div className="w-px h-6 bg-white/15" />
                <div>
                  <p className="text-white text-lg">25Y</p>
                  <p className="mt-0.5">Panel Warranty</p>
                </div>
                <div className="w-px h-6 bg-white/15" />
                <div>
                  <p className="text-white text-lg">10Y</p>
                  <p className="mt-0.5">Workmanship</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
