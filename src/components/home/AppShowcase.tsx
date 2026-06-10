import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Cpu, CheckCircle, RefreshCw, BarChart2, Battery, Wifi, Signal } from 'lucide-react';

export default function AppShowcase() {
  const [activeTab, setActiveTab] = useState<'generation' | 'shifting' | 'battery'>('generation');
  const [toggles, setToggles] = useState([true, true, false]);

  // iPhone 17 Pro Dynamic Island State
  const [islandText, setIslandText] = useState('SolEarth Connected');
  const [islandIcon, setIslandIcon] = useState('☀️');
  const [islandExpanded, setIslandExpanded] = useState(false);

  useEffect(() => {
    let text = 'SolEarth Telemetry';
    let icon = '☀️';
    if (activeTab === 'generation') {
      text = 'Live Solar: 5.42 kW';
      icon = '☀️';
    } else if (activeTab === 'shifting') {
      text = 'AI Load Shift Active';
      icon = '⚙️';
    } else if (activeTab === 'battery') {
      text = 'Battery level: 84%';
      icon = '🔋';
    }
    
    setIslandText(text);
    setIslandIcon(icon);
    setIslandExpanded(true);
    
    const timer = setTimeout(() => {
      setIslandExpanded(false);
    }, 2800);
    
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <section id="app-showcase" aria-label="Smart Energy App Telemetry" className="relative py-14 bg-white text-[#202020] overflow-hidden select-none">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute left-[15%] top-0 w-px h-full bg-stone-200" />
        <div className="absolute right-[15%] top-0 w-px h-full bg-stone-200" />
        <div className="absolute top-[35%] left-0 w-full h-px bg-stone-200" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Premium App Mockup Simulator */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Ambient color-synced background glow */}
            <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
              <div className={`w-80 h-80 rounded-full blur-3xl opacity-20 transition-all duration-700 ${
                activeTab === 'generation' ? 'bg-[#F8C000]' :
                activeTab === 'shifting' ? 'bg-[#1870B8]' : 'bg-[#28A8E0]'
              }`} />
            </div>

            {/* iPhone 17 Pro Outer Frame */}
            <div className="relative z-10 w-80 h-[580px] bg-stone-900 rounded-[52px] p-2.5 shadow-2xl border-10 border-stone-800 flex flex-col justify-between overflow-hidden transition-all duration-500 hover:scale-102">
              
              {/* Outer physical button bumps */}
              {/* Left Action button */}
              <div className="absolute top-24 left-[-2px] w-[4px] h-6 bg-stone-700 rounded-r-md z-40" />
              {/* Left Volume Up button */}
              <div className="absolute top-36 left-[-2px] w-[4px] h-12 bg-stone-700 rounded-r-md z-40" />
              {/* Left Volume Down button */}
              <div className="absolute top-52 left-[-2px] w-[4px] h-12 bg-stone-700 rounded-r-md z-40" />
              {/* Right Power button */}
              <div className="absolute top-36 right-[-2px] w-[4px] h-14 bg-stone-700 rounded-l-md z-40" />
              {/* Right Camera Control Capacitive Inset Button */}
              <div className="absolute top-[320px] -right-px w-[3px] h-16 bg-stone-850 border-y border-stone-600 rounded-l-xs z-40" />

              {/* Dynamic screen content */}
              <div className="flex-1 bg-stone-950 rounded-[42px] overflow-hidden p-5 pt-10 flex flex-col justify-between text-white font-sans text-left relative">
                
                {/* Status Bar */}
                <div className="absolute top-2 left-0 right-0 px-6 flex justify-between items-center text-[10px] font-semibold text-stone-300 z-40 pointer-events-none select-none">
                  <div>9:41</div>
                  
                  {/* Dynamic Island Container */}
                  <div className="flex items-center justify-center flex-1">
                    <motion.div
                      animate={{
                        width: islandExpanded ? 165 : 85,
                        height: islandExpanded ? 24 : 18,
                      }}
                      transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      className="bg-black text-white flex items-center justify-between px-2.5 shadow-lg border border-white/5 rounded-full select-none pointer-events-auto cursor-pointer"
                      onClick={() => setIslandExpanded(!islandExpanded)}
                    >
                      <span className="text-[9px] mr-1">{islandIcon}</span>
                      <AnimatePresence mode="wait">
                        {islandExpanded && (
                          <motion.span
                            key={islandText}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.15 }}
                            className="text-[8px] font-bold tracking-tight text-stone-200 whitespace-nowrap overflow-hidden"
                          >
                            {islandText}
                          </motion.span>
                        )}
                      </AnimatePresence>
                      <span className="w-1 h-1 rounded-full bg-blue-500/85 ml-1 shrink-0 animate-pulse" />
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Signal className="h-2.5 w-2.5 text-stone-300" />
                    <Wifi className="h-2.5 w-2.5 text-stone-300" />
                    <div className="w-5 h-2.5 border border-stone-400 rounded-xs p-px flex items-center">
                      <div className="h-full w-[80%] bg-stone-300 rounded-2xs" />
                    </div>
                  </div>
                </div>

                {/* Simulated Header */}
                <div className="flex justify-between items-center pb-4 border-b border-white/5 mt-1">
                  <div>
                    <p className="text-[10px] text-stone-400 font-mono">SOLAR TELEMETRY</p>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Sun className="h-3.5 w-3.5 text-[#F8C000]" /> SolEarth Live
                    </h4>
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[9px] font-bold text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> Live Sync
                  </div>
                </div>

                {/* Tab dependent widgets */}
                <div className="flex-1 py-6 space-y-4 flex flex-col justify-center">
                  <AnimatePresence mode="wait">
                    {activeTab === 'generation' && (
                      <motion.div
                        key="generation"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div className="text-center bg-white/5 border border-white/5 rounded-2xl p-5 relative overflow-hidden">
                          <p className="text-xs text-stone-400 font-mono">Current Generation</p>
                          <p className="text-5xl font-black text-[#F8C000] mt-1 tracking-tight">
                            5.42<span className="text-xl font-normal"> kW</span>
                          </p>
                          <div className="flex justify-center gap-3 mt-4 text-[10px] text-stone-300">
                            <span className="flex items-center gap-1"><Cpu className="h-3 w-3 text-[#28A8E0]" /> Smart Inverter</span>
                            <span>•</span>
                            <span>98.6% Eff</span>
                          </div>
                        </div>

                        {/* Interactive Solar Yield Graph */}
                        <div className="bg-white/5 border border-white/5 rounded-xl p-3 space-y-2">
                          <div className="flex justify-between items-center text-[9px] font-mono text-stone-400">
                            <span>24H YIELD FORECAST</span>
                            <span className="text-[#F8C000]">Peak 1:00 PM</span>
                          </div>
                          <div className="h-12 flex items-end">
                            <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                              <line x1="0" y1="35" x2="100" y2="35" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                              <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
                              <motion.path
                                d="M 0 35 Q 25 35 40 20 T 60 5 T 80 25 T 100 35"
                                fill="none"
                                stroke="#F8C000"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                              />
                            </svg>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'shifting' && (
                      <motion.div
                        key="shifting"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-3"
                      >
                        <p className="text-[11px] text-stone-400 font-mono uppercase tracking-wider">AI Load shifting (Tap to Toggle)</p>
                        {[
                          { name: 'EV Charger Integration', time: '11:00 AM - Optimal' },
                          { name: 'Pool Filtration Pump', time: '12:30 PM - Scheduled' },
                          { name: 'Water Heating Unit', time: '02:00 PM - Standard' }
                        ].map((item, index) => (
                          <div 
                            key={index}
                            onClick={() => {
                              const updated = [...toggles];
                              updated[index] = !updated[index];
                              setToggles(updated);
                            }}
                            className="flex justify-between items-center bg-white/5 hover:bg-white/10 rounded-xl p-3 border border-white/5 text-xs transition-all cursor-pointer"
                          >
                            <div>
                              <p className="font-bold text-white">{item.name}</p>
                              <p className="text-[10px] text-stone-400 mt-0.5">{item.time}</p>
                            </div>
                            <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 ${toggles[index] ? 'bg-emerald-500' : 'bg-stone-700'}`}>
                              <div className={`h-3 w-3 rounded-full bg-white transition-transform duration-200 ${toggles[index] ? 'translate-x-4' : 'translate-x-0'}`} />
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}

                    {activeTab === 'battery' && (
                      <motion.div
                        key="battery"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <div className="bg-white/5 border border-white/5 rounded-2xl p-5 flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-xs text-stone-400 font-mono">Battery Reserve</p>
                            <p className="text-4xl font-extrabold text-[#28A8E0] tracking-tight">84%</p>
                          </div>
                          <div className="relative h-16 w-16 flex items-center justify-center">
                            <svg className="w-full h-full rotate-270" viewBox="0 0 36 36">
                              <path
                                className="text-stone-800"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              />
                              <motion.path
                                className="text-[#28A8E0]"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="none"
                                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                initial={{ strokeDasharray: "0, 100" }}
                                animate={{ strokeDasharray: "84, 100" }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                              />
                            </svg>
                            <div className="absolute text-[11px] font-mono font-bold text-white mt-0.5">
                              84%
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-xs text-stone-300 leading-relaxed">
                          Battery storage is optimized for peak shaving. System will discharge during high-tariff grid hours (6:00 PM - 9:00 PM).
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Simulated Bottom Navigation */}
                <div className="flex justify-around items-center pt-4 border-t border-white/5 text-stone-500">
                  <button
                    onClick={() => setActiveTab('generation')}
                    className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'generation' ? 'text-[#F8C000]' : 'hover:text-stone-300'}`}
                  >
                    <BarChart2 className="h-5 w-5" />
                    <span className="text-[9px] font-bold">Telemetry</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('shifting')}
                    className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'shifting' ? 'text-[#F8C000]' : 'hover:text-stone-300'}`}
                  >
                    <RefreshCw className="h-5 w-5" />
                    <span className="text-[9px] font-bold">Load Shift</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('battery')}
                    className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'battery' ? 'text-[#F8C000]' : 'hover:text-stone-300'}`}
                  >
                    <Battery className="h-5 w-5" />
                    <span className="text-[9px] font-bold">Battery</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Premium Text Copy */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <div className="flex items-center space-x-2.5">
                <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
                <span className="text-sm font-bold text-[#1870B8] uppercase tracking-wider">SMART TELEMETRY</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-[#202020]">
                Control Your System <br />
                <span className="italic text-[#1870B8]">From Anywhere</span>
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Every SolEarth Energy installation includes integration with our state-of-the-art mobile app. Gain absolute control over your energy production, battery status, and home appliance integration profiles.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: 'generation',
                  title: 'Real-time Generation Telemetry',
                  desc: 'Track every single watt of power your solar panel array produces in real-time, complete with detailed historic charts.'
                },
                {
                  id: 'shifting',
                  title: 'AI Smart Load Shifting',
                  desc: 'Allow our smart algorithms to program your high-draw appliances to turn on when solar generation is at its absolute peak.'
                },
                {
                  id: 'battery',
                  title: 'Hybrid Battery Management',
                  desc: 'Monitor storage capacity, track grid discharge rates, and configure reserve buffers to secure your home against blackouts.'
                }
              ].map((feature) => {
                const isActive = activeTab === feature.id;
                return (
                  <div
                    key={feature.id}
                    onClick={() => setActiveTab(feature.id as any)}
                    className={`flex gap-4 items-start p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'bg-[#1870B8]/5 border-[#1870B8] shadow-md translate-x-2'
                        : 'bg-transparent border-transparent hover:bg-slate-50'
                    }`}
                  >
                    <CheckCircle className={`h-5.5 w-5.5 shrink-0 mt-0.5 transition-colors duration-300 ${isActive ? 'text-[#1870B8]' : 'text-slate-400'}`} />
                    <div className="space-y-1">
                      <h3 className="text-lg md:text-xl font-serif font-semibold leading-snug text-stone-900">{feature.title}</h3>
                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
