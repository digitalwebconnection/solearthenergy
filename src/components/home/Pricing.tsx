import { useRef, useState } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Zap, Shield, Star, Battery, Wifi, Sun, Award,
  BarChart3, Headphones, ChevronDown, ArrowRight,
  CheckCircle2, HelpCircle, Phone,
} from 'lucide-react';

/* ─────────────────────────── DATA ─────────────────────────── */
const plans = [
  {
    id: 'essential',
    badge: null,
    tier: 'Residential Essential',
    kw: '6.6 kW',
    subtitle: 'Intelligent solar architecture for scaling households.',
    investment: '$3,699',
    savings: '~$2,500 / yr',
    featured: false,
    accentFrom: '#28A8E0',
    accentTo: '#1870B8',
    specs: [
      { label: 'Inverter Capacity', val: '6 kW' },
      { label: 'Panel Array', val: '15 Units' },
      { label: 'Warranty', val: '25Y PRO' },
    ],
    features: [
      { icon: Sun, text: 'Tier-1 Mono PERC Panels' },
      { icon: Wifi, text: 'Smart WiFi Cloud Monitoring' },
      { icon: Shield, text: 'CEC-Accredited Installation' },
      { icon: BarChart3, text: 'Real-time Performance Analytics' },
      { icon: Award, text: 'Government STC Rebate Included' },
    ],
    benefits: [
      'Slash your quarterly electricity bill by up to 60%',
      'Increase property market value by an estimated 4–6%',
      'Qualifies for Federal STC (Small-scale Technology Certificates)',
      'Fully owned system with zero ongoing lease obligations',
    ],
    faqs: [
      {
        q: 'What happens on cloudy days?',
        a: 'Solar panels still produce electricity in diffuse light conditions. Your system automatically sources any shortfall from the grid, so you\'re never without power.',
      },
      {
        q: 'How long until I break even?',
        a: 'Most residential Essential customers see full system payback in 3–4 years, depending on your household usage and local feed-in tariff rates.',
      },
      {
        q: 'Can I add battery storage later?',
        a: 'Absolutely. The Essential system ships with a hybrid-ready inverter so you can seamlessly add a battery at any time with no additional rewiring.',
      },
    ],
  },
  {
    id: 'executive',
    badge: 'Most Popular',
    tier: 'Family Executive',
    kw: '10.12 kW',
    subtitle: 'The definitive gold standard for high-consumption estates.',
    investment: '$5,699',
    savings: '~$4,200 / yr',
    featured: true,
    accentFrom: '#1870B8',
    accentTo: '#F8C000',
    specs: [
      { label: 'Inverter Capacity', val: '8 kW' },
      { label: 'Panel Array', val: '25 Units' },
      { label: 'Warranty', val: '30Y PRO' },
    ],
    features: [
      { icon: Sun, text: 'Premium N-Type HJT Quantum Cells' },
      { icon: Battery, text: 'Battery-Ready Hybrid Inverter' },
      { icon: Zap, text: 'Priority Micro-Grid Emergency Backup' },
      { icon: BarChart3, text: 'AI-Powered Load-Shift Scheduling' },
      { icon: Headphones, text: 'Dedicated Account Manager' },
      { icon: Award, text: 'Priority STCs + State Rebate Filing' },
    ],
    benefits: [
      'Up to 80% reduction on electricity bills for large families',
      'Battery-ready architecture for future energy independence',
      'AI load-shifting automatically times appliance usage to solar peak',
      'Dedicated account manager for lifetime support',
    ],
    faqs: [
      {
        q: 'What battery options are compatible?',
        a: 'The Executive inverter is certified for leading brands: Tesla Powerwall 3, BYD HVM, Sungrow SBR, and Enphase IQ — all available as add-ons.',
      },
      {
        q: 'Does the AI load-shift require internet?',
        a: 'It uses a local edge-compute chip for scheduling, so appliance timing still works offline. Cloud sync adds advanced weather-based forecasting.',
      },
      {
        q: 'Is financing available?',
        a: 'Yes. We offer $0 upfront, no-interest solar payment plans that are structured to cost less than your current electricity bill from day one.',
      },
    ],
  },
  {
    id: 'ultimate',
    badge: null,
    tier: 'Estate Ultimate',
    kw: '13.2 kW',
    subtitle: 'Complete, absolute energy independence — engineered to last.',
    investment: '$6,199',
    savings: '~$5,500 / yr',
    featured: false,
    accentFrom: '#1870B8',
    accentTo: '#28A8E0',
    specs: [
      { label: 'Inverter Capacity', val: '10 kW' },
      { label: 'Panel Array', val: '36 Units' },
      { label: 'Warranty', val: '30Y PRO' },
    ],
    features: [
      { icon: Sun, text: 'Max-Efficiency Double-Glass BiPV' },
      { icon: BarChart3, text: 'Advanced AI Edge Analytics Hub' },
      { icon: Headphones, text: '24/7 White-Glove Concierge Support' },
      { icon: Battery, text: '20kWh Battery Storage Expansion Ready' },
      { icon: Zap, text: 'Three-Phase Grid & EV Charger Ready' },
      { icon: Award, text: 'Complete Government Rebate Management' },
    ],
    benefits: [
      'Achieve full household energy independence with battery add-on',
      'Three-phase capability for high-draw appliances and EV charging',
      '24/7 white-glove concierge support with 4-hour response SLA',
      'Maximum ROI — payback achieved faster due to peak system output',
    ],
    faqs: [
      {
        q: 'Can this power an EV as well?',
        a: 'Yes. The Estate Ultimate includes three-phase wiring support and our EV charger integration kit for Level 2 AC charging directly from solar.',
      },
      {
        q: 'What does White-Glove support include?',
        a: '24/7 remote monitoring, annual on-site performance audits, priority dispatch for any service call, and a dedicated concierge phone line.',
      },
      {
        q: 'Is roof type a factor?',
        a: 'Our engineering team conducts a full structural and azimuth assessment for every Estate installation to optimise panel layout and maximise yield.',
      },
    ],
  },
];

/* ─────────────────────── FAQ ACCORDION ─────────────────────── */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-3.5 text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-slate-200 leading-snug">{q}</span>
        <HelpCircle
          className={`h-4 w-4 shrink-0 transition-colors duration-200 ${open ? 'text-[#F8C000]' : 'text-slate-500'}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-sm text-slate-400 leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ───────────────────── PLAN ROW COMPONENT ───────────────────── */
function PlanRow({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: true, margin: '-60px' });

  const gradient = `linear-gradient(135deg, ${plan.accentFrom}, ${plan.accentTo})`;

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className={`relative rounded-2xl border overflow-hidden transition-all duration-500 ${
        plan.featured
          ? 'border-[#1870B8]/40 bg-linear-to-br from-[#0d1a2d] to-[#060d19]'
          : 'border-white/8 bg-white/3'
      }`}
      style={{
        boxShadow: plan.featured
          ? '0 0 60px -20px rgba(24,112,184,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
          : 'none',
      }}
    >
      {/* Featured top accent */}
      {plan.featured && (
        <div
          className="absolute top-0 inset-x-0 h-[2px]"
          style={{ background: gradient }}
        />
      )}

      {/* ── COLLAPSED ROW ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8">
        {/* Left: Identity */}
        <div className="flex items-center gap-5 flex-1 min-w-0">
          {/* Glow icon orb */}
          <div
            className="shrink-0 h-14 w-14 rounded-2xl flex items-center justify-center shadow-xl"
            style={{ background: gradient }}
          >
            <Sun className="h-6 w-6 text-white" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <p
                className="text-[10px] font-black uppercase tracking-[0.2em]"
                style={{ color: plan.accentFrom }}
              >
                {plan.tier}
              </p>
              {plan.badge && (
                <span className="inline-flex items-center gap-1 bg-[#F8C000]/10 border border-[#F8C000]/30 px-2.5 py-0.5 rounded-full">
                  <Star className="h-2.5 w-2.5 fill-[#F8C000] text-[#F8C000]" />
                  <span className="text-[9px] font-black text-[#F8C000] uppercase tracking-widest">
                    {plan.badge}
                  </span>
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">{plan.kw}</h3>
            <p className="text-slate-400 text-xs mt-1 leading-relaxed">{plan.subtitle}</p>
          </div>
        </div>

        {/* Centre: Price */}
        <div className="flex items-center gap-8 shrink-0">
          <div className="text-center">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">From</p>
            <p className="text-3xl font-serif font-bold text-white">{plan.investment}</p>
            <p className="text-[10px] text-slate-500 mt-0.5">after STC rebate</p>
          </div>
          <div className="text-center hidden sm:block">
            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Annual Yield</p>
            <p
              className="text-xl font-bold"
              style={{ color: plan.featured ? '#F8C000' : plan.accentFrom }}
            >
              {plan.savings}
            </p>
          </div>
        </div>

        {/* Right: View Details Button */}
        <div className="shrink-0 flex items-center gap-3">
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
              expanded
                ? 'bg-white/10 border-white/20 text-white'
                : plan.featured
                ? 'text-stone-900 border-transparent shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
            style={
              !expanded && plan.featured
                ? { background: gradient }
                : {}
            }
          >
            <span>{expanded ? 'Close' : 'View Details'}</span>
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-flex"
            >
              <ChevronDown className="h-3.5 w-3.5" />
            </motion.span>
          </button>
        </div>
      </div>

      {/* ── EXPANDED DETAILS ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.08] mx-6 sm:mx-8" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 sm:p-8 pt-6">

              {/* Column 1: Specs + Features */}
              <div className="space-y-6">
                {/* Spec tiles */}
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">System Specifications</p>
                  <div className="grid grid-cols-3 gap-2">
                    {plan.specs.map((s) => (
                      <div
                        key={s.label}
                        className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-3 text-center"
                      >
                        <p className="text-sm font-bold text-white">{s.val}</p>
                        <p className="text-[9px] text-slate-500 uppercase tracking-wide mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Included Features</p>
                  <ul className="space-y-2.5">
                    {plan.features.map((f) => {
                      const Icon = f.icon;
                      return (
                        <li key={f.text} className="flex items-center gap-3">
                          <div
                            className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                            style={{ background: `${plan.accentFrom}15` }}
                          >
                            <Icon className="h-3.5 w-3.5" style={{ color: plan.accentFrom }} />
                          </div>
                          <span className="text-slate-300 text-sm">{f.text}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* Column 2: Benefits */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Key Benefits</p>
                <ul className="space-y-3">
                  {plan.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 mt-0.5"
                        style={{ color: plan.featured ? '#F8C000' : plan.accentFrom }}
                      />
                      <span className="text-sm text-slate-300 leading-relaxed">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* Mobile Annual Yield (shown only on mobile since desktop shows in header) */}
                <div
                  className="sm:hidden mt-4 rounded-xl p-4 border border-white/10"
                  style={{ background: `${plan.accentFrom}10` }}
                >
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-1">Estimated Annual Savings</p>
                  <p className="text-2xl font-bold" style={{ color: plan.featured ? '#F8C000' : plan.accentFrom }}>
                    {plan.savings}
                  </p>
                </div>
              </div>

              {/* Column 3: FAQs + CTA */}
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Frequently Asked</p>
                  <div className="space-y-1">
                    {plan.faqs.map((faq) => (
                      <FaqItem key={faq.q} q={faq.q} a={faq.a} />
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2 space-y-3">
                  <a
                    href="#contact-us"
                    className="group w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                    style={{
                      background: gradient,
                      color: plan.featured ? '#0d1117' : '#fff',
                    }}
                  >
                    Get a Free Quote
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="tel:1300672194"
                    className="group w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-slate-400 border border-white/[0.08] hover:border-white/20 hover:text-white transition-all duration-300"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call 1300 672 194
                  </a>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ─────────────────────── MAIN SECTION ─────────────────────── */
export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      id="pricing"
      ref={sectionRef}
      aria-label="Solar System Pricing"
      className="relative py-20 bg-[#030712] text-slate-100 overflow-hidden"
    >
      {/* Ambient background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#1870B8]/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F8C000]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#28A8E0]/5 rounded-full blur-[100px]" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          className="text-center mb-14 space-y-5"
          initial={{ opacity: 0, y: -20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F8C000] animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.25em]">
              2026 Solar Portfolio
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-white max-w-3xl mx-auto">
            Investment-grade solar.{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(135deg, #28A8E0, #F8C000)' }}
            >
              Precision-built.
            </span>
          </h2>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Every system is meticulously deployed by CEC-accredited specialists. Click{' '}
            <span className="text-[#28A8E0] font-semibold">View Details</span> on any package to explore full specifications, benefits, and frequently asked questions.
          </p>
        </motion.div>

        {/* Plans — Accordion Rows */}
        <div className="space-y-4">
          {plans.map((plan, i) => (
            <PlanRow key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* Compliance Strip */}
        <motion.div
          className="mt-10 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          animate={headerInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-6">
            {['SAA Certified', 'ISO 9001 Standard', 'Net Zero 2050'].map((badge) => (
              <div key={badge} className="flex items-center gap-2">
                <Award className="h-4 w-4 text-[#F8C000]/70" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                  {badge}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-600 text-center md:text-right max-w-md leading-relaxed">
            Pricing is indicative after STC assignment. Final investment subject to roof assessment and local grid conditions.
          </p>
        </motion.div>

      </div>
    </section>
  );
}