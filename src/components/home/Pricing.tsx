import { useRef, useState } from 'react';
import { easeOut, motion, useInView } from 'framer-motion';
import { Zap, Shield, Star, ArrowUpRight, Battery, Wifi, Sun, Award, BarChart3, Headphones } from 'lucide-react';

interface PlanFeature {
  icon: React.ElementType;
  text: string;
}

interface PricingPlan {
  badge?: string;
  tier: string;
  kw: string;
  tagline: string;
  investment: string;
  savings: string;
  panelKw: string;
  units: string;
  warranty: string;
  features: PlanFeature[];
  featured: boolean;
  accentColor: string;
  glowColor: string;
}

const plans: PricingPlan[] = [
  {
    tier: 'Residential Essential',
    kw: '6.6kW',
    tagline: 'Intelligent solar architecture for scaling households.',
    investment: '$3,699',
    savings: '~$2.5k',
    panelKw: '6kW',
    units: '15 Units',
    warranty: '25Y PRO',
    features: [
      { icon: Sun, text: 'Tier-1 Mono Perc Panels' },
      { icon: Wifi, text: 'Smart WiFi Monitoring' },
      { icon: Shield, text: 'Standard Installation' },
    ],
    featured: false,
    accentColor: 'from-slate-700 to-slate-800',
    glowColor: 'rgba(148, 163, 184, 0.05)',
  },
  {
    badge: 'Most Appointed',
    tier: 'Family Executive',
    kw: '10.12kW',
    tagline: 'The definitive gold standard for high-consumption estates.',
    investment: '$5,699',
    savings: '~$4.2k',
    panelKw: '8kW',
    units: '25 Units',
    warranty: '30Y PRO',
    features: [
      { icon: Sun, text: 'Premium N-Type Quantum Cells' },
      { icon: Battery, text: 'Battery-Ready Next-Gen Hybrid' },
      { icon: Zap, text: 'Priority Micro-Grid Support' },
    ],
    featured: true,
    accentColor: 'from-[#1870B8] via-[#28A8E0] to-[#F8C000]',
    glowColor: 'rgba(24, 112, 184, 0.25)',
  },
  {
    tier: 'Estate Ultimate',
    kw: '13.2kW',
    tagline: 'Complete, absolute energy independence engineered to last.',
    investment: '$6,199',
    savings: '~$5.5k',
    panelKw: '10kW',
    units: '36 Units',
    warranty: '30Y PRO',
    features: [
      { icon: Sun, text: 'Max-Efficiency Double-Glass' },
      { icon: BarChart3, text: 'Advanced AI Edge Analytics' },
      { icon: Headphones, text: '24/7 Concierge Support' },
    ],
    featured: false,
    accentColor: 'from-[#1870B8] to-slate-800',
    glowColor: 'rgba(40, 168, 224, 0.05)',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: easeOut },
  }),
};

export default function Pricing() {
  const containerRef = useRef<HTMLElement>(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Luxury dynamic flashlight tracking effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - left, y: e.clientY - top });
  };

  return (
    <section
      id="pricing"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      aria-label="Solar System Pricing Plan"
      className="relative py-10 bg-[#030712] text-slate-100 overflow-hidden select-none"
    >
      {/* Premium Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full bg-radial from-[#1870B8]/10 to-transparent blur-3xl transition-transform duration-300"
          style={{ transform: `translate(${mousePos.x - 400}px, ${mousePos.y - 400}px)` }}
        />
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#28A8E0]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#F8C000]/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Luxury Header */}
        <motion.div
          className="text-center mb-14 space-y-5"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-3 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1870B8] animate-pulse" />
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-[0.25em]">
              Portfolio Architecture 2026
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-white max-w-4xl mx-auto">
            Uncompromising power.<br />
            <span className="bg-linear-to-r from-slate-200 via-[#28A8E0] to-[#F8C000] bg-clip-text text-transparent">
              Precision engineered.
            </span>
          </h2>

          <p className="text-white text-sm sm:text-base max-w-5xl mx-auto font-light leading-relaxed">
            Every architectural portfolio is meticulously deployed by CEC-accredited elite specialists. Built to generate, guaranteed to sustain.
          </p>
        </motion.div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.tier}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className={`group relative flex flex-col rounded-xl border backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-white/20 ${
                plan.featured
                  ? 'border-[#1870B8]/30 bg-linear-to-b from-slate-900/90 to-black/95 md:-translate-y-4'
                  : 'border-white/[0.07] bg-white/2'
              }`}
              style={{
                boxShadow: plan.featured ? `0 25px 60px -15px ${plan.glowColor}` : 'none',
              }}
            >
              {/* Top Accent Lines */}
              {plan.featured && (
                <div className="absolute top-0 inset-x-0 h-[2px] bg-linear-to-r from-transparent via-[#1870B8] to-transparent" />
              )}

              {/* Unique Badge Style */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 bg-linear-to-r from-[#1870B8] to-[#F8C000] text-stone-900 text-[9px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                    <Star className="h-2.5 w-2.5 fill-stone-900 text-stone-900" />
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="flex flex-col flex-1 p-8 sm:p-10 space-y-8">
                {/* Header Content */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-[#28A8E0] uppercase tracking-[0.2em]">
                    {plan.tier}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <h3 className="text-5xl font-serif font-bold tracking-tight text-white">
                      {plan.kw}
                    </h3>
                  </div>
                  <p className="text-slate-400/90 text-xs font-light leading-relaxed pt-2">
                    {plan.tagline}
                  </p>
                </div>

                {/* Investment Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/2 border border-white/5 rounded-2xl p-4">
                    <span className="block text-[9px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Capital Investment
                    </span>
                    <span className="text-2xl font-normal text-white tracking-tight">
                      {plan.investment}
                    </span>
                  </div>
                  <div className={`rounded-2xl p-4 border ${
                    plan.featured 
                      ? 'bg-[#1870B8]/5 border-[#1870B8]/20' 
                      : 'bg-white/2 border-white/5'
                  }`}>
                    <span className="block text-[9px] font-medium text-slate-500 uppercase tracking-wider mb-1">
                      Yield Generation
                    </span>
                    <span className={`text-2xl font-semibold tracking-tight ${
                      plan.featured ? 'text-[#F8C000]' : 'text-white'
                    }`}>
                      {plan.savings}
                      <span className="text-xs font-light text-slate-500">/yr</span>
                    </span>
                  </div>
                </div>

                {/* Core Architectural Details */}
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-white/6 text-center">
                  {[
                    { val: plan.panelKw, label: 'Inverter Cap' },
                    { val: plan.units, label: 'Array Matrices' },
                    { val: plan.warranty, label: 'Assurance' },
                  ].map((spec, index) => (
                    <div key={index} className="space-y-0.5">
                      <p className="text-xs font-semibold text-slate-200">{spec.val}</p>
                      <p className="text-[9px] text-slate-500 uppercase tracking-wide">{spec.label}</p>
                    </div>
                  ))}
                </div>

                {/* High-End Feature Matrix */}
                <div className="space-y-4 flex-1">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Included Specifications
                  </p>
                  <ul className="space-y-3.5">
                    {plan.features.map((f) => {
                      const Icon = f.icon;
                      return (
                        <li key={f.text} className="flex items-center gap-3">
                          <div className={`p-1 rounded-md ${plan.featured ? 'bg-[#1870B8]/10' : 'bg-white/5'}`}>
                            <Icon className={`h-3.5 w-3.5 ${plan.featured ? 'text-[#F8C000]' : 'text-slate-400'}`} />
                          </div>
                          <span className="text-slate-300 text-xs font-light">{f.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* Ultimate Luxury CTA Button */}
                <a
                  href="#contact"
                  className={`group relative mt-auto flex items-center justify-center gap-2 w-full py-4 rounded-xl font-medium text-xs tracking-widest uppercase transition-all duration-300 ${
                    plan.featured
                      ? 'bg-linear-to-r from-[#1870B8] to-[#F8C000] text-stone-900 hover:opacity-90 shadow-xl shadow-[#1870B8]/10'
                      : 'bg-white/4 border border-white/10 text-white hover:bg-white/8'
                  }`}
                >
                  <span>Build Asset Model</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Compliance / Verification Strip */}
        <motion.div
          className="mt-4 pt-8 border-t border-white flex flex-col md:flex-row items-center justify-between gap-1"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8">
            {['SAA Certified Deployment', 'ISO 9001 Structural Standard', 'Net Zero Horizon 2050'].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#F8C000]/80" />
                <span className="text-[9px] font-bold text-white uppercase tracking-[0.15em]">
                  {badge}
                </span>
              </div>
            ))}
          </div>
          <p className="text-sm text-white text-center md:text-right max-w-xl font-light leading-relaxed">
            Financial estimations rely upon pristine metro context assumptions and updated STC financial metrics. Binding technical parameters requires absolute roof architecture scans.
          </p>
        </motion.div>
      </div>
    </section>
  );
}