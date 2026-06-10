import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Sparkles, Cpu, ArrowUpRight } from 'lucide-react';

export default function PremiumAbout() {
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });

  const structuralNodes = [
    { 
      icon: Cpu, 
      tag: '01 // ANALYSIS MODULE',
      title: 'Tailored System Matrix Arrays', 
      desc: 'We mathematically compute configurations aligned precisely to specific roof structural pitch variations and telemetry consumer files.' 
    },
    { 
      icon: Shield, 
      tag: '02 // INTEGRITY NODE',
      title: 'CEC Accredited Engineering Specialists', 
      desc: 'Every physical installer within our structural network holds premium elite accreditation, securing complete risk mitigation.' 
    },
    { 
      icon: Sparkles, 
      tag: '03 // ARCHITECTURE SPEC',
      title: 'Elite Hardware Specification Matrix', 
      desc: 'We build exclusively with certified Tier-1 component lines to assure robust domestic grid longevity parameters.' 
    }
  ];

  return (
    <section
      id="about-us"
      ref={containerRef}
      aria-label="About SolEarth Energy"
      className="relative py-14 bg-[#F8F8F8] text-stone-900 overflow-hidden select-none"
    >
      {/* Background Fine Blueprint Layout Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-35">
        <div className="absolute left-[8%] top-0 w-px h-full bg-stone-200/60" />
        <div className="absolute right-[8%] top-0 w-px h-full bg-stone-200/60" />
        <div className="absolute top-[18%] left-0 w-full h-px bg-stone-200/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Editorial Intro Line Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 pb-16  ">
          <div className="lg:col-span-12 space-y-4">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#1870B8]" />
              <p className="text-[10px] font-bold tracking-[0.25em] text-[#1870B8] uppercase">
                Corporate Portfolio Profile
              </p>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 25 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl md:text-5xl font-serif font-bold leading-tight text-stone-900"
            >
              Australia's premium integration partner for <span className="italic text-[#1870B8]">sustainable assets.</span>
            </motion.h2>
          </div>
       
        </div>

        {/* Content Layout Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-14 items-start">

          {/* Left Column: Image Stack and Performance Analytics */}
          <div className="lg:col-span-5 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.215, 0.61, 0.355, 1] }}
              className="relative rounded-lg overflow-hidden bg-stone-100 border border-stone-200/80 shadow-lg shadow-black"
            >
              <img
                src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1200&q=80"
                alt="SolEarth Energy custom architectural solar design array deployment"
                className="w-full h-[400px] object-cover grayscale-15 contrast-102 hover:scale-102 transition-transform duration-700 ease-out"
              />
              
              {/* Floating Frame Label */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border border-stone-200 text-[9px] font-mono tracking-wider text-stone-800 uppercase shadow-sm">
                Active Deployment Matrix
              </div>
            </motion.div>

            {/* Premium Industrial Stats Array */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-2 text-left"
            >
              {[
                { value: '10K+', sub: '[01]', label: 'Allocated Estates' },
                { value: '15MW+', sub: '[02]', label: 'Deployed Output' },
                { value: '100%', sub: '[03]', label: 'CEC Compliance' }
              ].map((metric, i) => (
                <div key={i} className="space-y-2.5 group cursor-default">
                  <div className="flex justify-between items-baseline border-b border-stone-300 pb-2.5 group-hover:border-[#1870B8] transition-colors duration-300">
                    <p className="text-3xl font-serif font-black tracking-tight text-[#1870B8]">
                      {metric.value}
                    </p>
                    <span className="text-[8px] font-mono text-stone-500 group-hover:text-[#1870B8] transition-colors duration-300">
                      {metric.sub}
                    </span>
                  </div>
                  <p className="text-[9px] font-mono font-medium text-stone-600 uppercase tracking-wider">
                    {metric.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Premium High-End Component Matrix Blocks */}
          <div className="lg:col-span-7 space-y-4">
            {structuralNodes.map((node, i) => {
              const Icon = node.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 25 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: 'easeOut' }}
                  whileHover={{ x: 6, y: -2, transition: { duration: 0.3 } }}
                  className="group relative bg-white border border-stone-200 rounded-lg p-6 sm:p-8 flex gap-6 items-start transition-all duration-400 hover:shadow-xl shadow-md hover:border-[#1870B8]"
                >
                  {/* Internal Left Technical Identifier */}
                  <div className="p-3 rounded-xl border shrink-0 transition-colors duration-300 bg-stone-50 border-stone-200 text-stone-700 group-hover:bg-[#1870B8] group-hover:border-[#1870B8] group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </div>

                  {/* Core Value Text Cluster */}
                  <div className="space-y-2 flex-1 text-left">
                    <div className="flex justify-between items-baseline">
                      <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest block">
                        {node.tag}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 text-stone-300 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-serif font-semibold leading-snug text-stone-900">
                      {node.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-light leading-relaxed max-w-2xl">
                      {node.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}