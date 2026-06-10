import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TreePine, Flame, Car } from 'lucide-react';

export default function SustainabilityMetrics() {
  const [metricTab, setMetricTab] = useState<'trees' | 'coal' | 'cars'>('trees');
  const tabs: ('trees' | 'coal' | 'cars')[] = ['trees', 'coal', 'cars'];

  useEffect(() => {
    const interval = setInterval(() => {
      setMetricTab((prev) => {
        const nextIndex = (tabs.indexOf(prev) + 1) % tabs.length;
        return tabs[nextIndex];
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [metricTab]);

  return (
    <section id="sustainability" aria-label="Sustainability Metrics" className="relative py-10 bg-white text-[#202020] overflow-hidden select-none">
     

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-7xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2.5">
            <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
            <span className="text-sm font-bold text-[#1870B8] uppercase tracking-wider">ECO IMPACT REPORT</span>
            <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-[#202020]">
            Our Environmental <span className=" text-[#1870B8]">Footprint Offset</span>
          </h2>
          <p className="text-slate-900 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Every solar array deployed by SolEarth contributes directly to the reduction of global carbon output. View our collective ecological impact.
          </p>
        </div>

        {/* Toggles */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {[
            { id: 'trees', label: 'Forest Equivalence', icon: TreePine },
            { id: 'coal', label: 'Coal Offset', icon: Flame },
            { id: 'cars', label: 'Automotive Emission', icon: Car },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = metricTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setMetricTab(tab.id as typeof metricTab)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'bg-[#1870B8] text-white shadow-lg shadow-[#1870B8]/15 border border-[#1870B8]'
                    : 'bg-[#F8F8F8] text-stone-600 hover:text-[#1870B8] border border-stone-200'
                }`}
              >
                <Icon className="h-4 w-4" /> {tab.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Visual impact visualization card */}
          <div className="lg:col-span-6">
            <div className="p-8 lg:p-12 relative overflow-hidden text-left min-h-[380px] flex flex-col justify-between ">
              
              <AnimatePresence mode="wait">
                {metricTab === 'trees' && (
                  <motion.div
                    key="trees"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="h-14 w-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-emerald-600">
                      <TreePine className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-4xl font-serif font-black text-stone-900 tracking-tight">1.2 Million</h3>
                      <p className="text-base font-bold text-[#1870B8]">Equivalent Mature Trees Planted</p>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Our installed solar capacity offsets the amount of carbon dioxide equivalent to growing over 1.2 million mature forest trees for 10 consecutive years.
                    </p>
                  </motion.div>
                )}

                {metricTab === 'coal' && (
                  <motion.div
                    key="coal"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="h-14 w-14 bg-[#F8C000]/10 border border-[#F8C000]/30 rounded-2xl flex items-center justify-center text-[#F8C000]">
                      <Flame className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-4xl font-serif font-black text-stone-900 tracking-tight">45,200 Tons</h3>
                      <p className="text-base font-bold text-[#1870B8]">Of Standard Coal Burn Offset</p>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      By shifting energy generation source matrices to clean PV configurations, we have successfully prevented the ignition of 45,200 metric tons of high-emission fossil coal.
                    </p>
                  </motion.div>
                )}

                {metricTab === 'cars' && (
                  <motion.div
                    key="cars"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 15 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <div className="h-14 w-14 bg-[#28A8E0]/10 border border-[#28A8E0]/30 rounded-2xl flex items-center justify-center text-[#28A8E0]">
                      <Car className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-4xl font-serif font-black text-stone-900 tracking-tight">18,500 Cars</h3>
                      <p className="text-base font-bold text-[#1870B8]">Removed From Passenger Roads</p>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      Equivalent to permanently removing 18,500 standard fossil fuel powered combustion vehicles from general roads, based on average annual travel stats.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="border-t border-stone-200/80 pt-6 mt-8 flex justify-between items-center text-xs text-stone-400 font-mono">
                <span>ESTIMATED IMPACT RATE</span>
                <span>METRICS REPORT 2026</span>
              </div>
            </div>
          </div>

          {/* Right Block: Core metrics counters */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {[
              { title: 'Global Grid Clean Index', desc: 'Continuous carbon monitoring algorithms tracking output metrics to sync with state clean transition milestones.', val: '99.9%' },
              { title: 'Local Micro-grid Savings', desc: 'Collective household retail cost elimination realized by homeowners across our state installer hubs.', val: '$18.4M' },
              { title: 'Commissioned Storage Buffers', desc: 'Robust off-grid backup batteries deployed to protect critical medical, residential and commercial circuits.', val: '8.5MWh' }
            ].map((metric, index) => (
              <div key={index} className="flex justify-between items-start border-b border-stone-200 pb-5">
                <div className="space-y-1 pr-6">
                  <h3 className="text-xl md:text-2xl font-serif font-semibold leading-snug text-stone-950">{metric.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-md">{metric.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-serif font-black text-[#1870B8] tracking-tight">{metric.val}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
