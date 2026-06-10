import { useState, useEffect, useRef } from 'react';
import { Check, Award, FileText } from 'lucide-react';
import CardSwap, { Card } from './CardSwap';

interface ProductTab {
  id: string;
  label: string;
  title: string;
  subtitle: string;
  image: string;
  specs: { label: string; value: string }[];
  features: string[];
}

export default function Products() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const tabs: ProductTab[] = [
    {
      id: 'panels',
      label: 'Solar Panels',
      title: 'N-Type High-Efficiency Solar Panels',
      subtitle: 'Premium tier-1 panels with cutting-edge TOPCon technology and superior low-light performance.',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      specs: [
        { label: 'Max Output', value: '440W - 475W' },
        { label: 'Panel Efficiency', value: 'Up to 22.8%' },
        { label: 'Degradation', value: '< 0.4% Annually' },
        { label: 'Product Warranty', value: '25 Years Product & Power' },
      ],
      features: [
        'PID-resistant cell technology',
        'Exceptional temperature coefficient (-0.30%/°C)',
        'Heavy snow load resistance (5400 Pa)',
        'Sleek all-black aesthetics available',
      ],
    },
    {
      id: 'inverters',
      label: 'Smart Inverters',
      title: 'Hybrid Single & Three Phase Inverters',
      subtitle: 'Industry-leading intelligent inverters for safe, reliable grid connection and real-time monitoring.',
      image: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=800&q=80',
      specs: [
        { label: 'Phase Type', value: 'Single / Three Phase' },
        { label: 'Max Efficiency', value: 'Up to 98.4%' },
        { label: 'Safety Cutoff', value: 'Arc Fault Circuit Interrupter (AFCI)' },
        { label: 'Warranty', value: '10 Years Extendable' },
      ],
      features: [
        'Real-time mobile app tracking (Wi-Fi/4G)',
        'Zero export capability configuration',
        'Fanless natural cooling (extremely quiet)',
        'IP66 dustproof & waterproof enclosure',
      ],
    },
    {
      id: 'batteries',
      label: 'Solar Batteries',
      title: 'Lithium Iron Phosphate (LFP) Battery Storage',
      subtitle: 'Modular smart battery banks to store excess daytime solar for backup security and overnight use.',
      image: 'https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&w=800&q=80',
      specs: [
        { label: 'Capacity Range', value: '5 kWh - 30 kWh' },
        { label: 'Battery Type', value: 'LiFePO4 (Cobalt-Free)' },
        { label: 'Cycle Life', value: '6,000+ Cycles (90% DoD)' },
        { label: 'Backup Transfer', value: '< 20ms Auto-switchover' },
      ],
      features: [
        'Blackout protection (EPS backup mode)',
        'Modular expandable stack design',
        'Smart energy scheduling (Time of Use)',
        '10-Year product warranty support',
      ],
    },
    {
      id: 'chargers',
      label: 'EV Chargers',
      title: 'Smart EV Charging Stations',
      subtitle: 'Charge your electric vehicle directly from your home solar panels with automated solar matching.',
      image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
      specs: [
        { label: 'Charge Speed', value: '7.2 kW - 22 kW' },
        { label: 'Connector Type', value: 'Universal Type 2 Tethered' },
        { label: 'Charging Modes', value: 'Eco, Eco+ & Fast Modes' },
        { label: 'Warranty', value: '3 Years Replacement' },
      ],
      features: [
        'Surplus solar integration (charge via 100% green energy)',
        'Dynamic load balancing protects home fuses',
        'RFID cards & mobile app access control',
        'Scheduled off-peak charging utility configuration',
      ],
    },
  ];

  /* ── auto-advance ───────────────────────────────────────── */
  const goTo = (index: number) => {
    const next = ((index % tabs.length) + tabs.length) % tabs.length;
    if (next === activeIndex) return;
    setIsAnimating(true);
    setTimeout(() => { setActiveIndex(next); setIsAnimating(false); }, 280);
  };

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActiveIndex(prev => {
        const next = (prev + 1) % tabs.length;
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 280);
        return next;
      });
    }, 5000);
  };

  useEffect(() => {
    if (!isHovered) startInterval();
    else if (intervalRef.current) clearInterval(intervalRef.current);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isHovered]);

  const currentTab = tabs[activeIndex];

  return (
    <section
      id="products"
      aria-label="Solar Products Catalog"
      className="py-10 bg-white overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .product-animate { animation: fadeSlideIn 0.35s ease forwards; }
        .product-exit    { opacity: 0; transform: translateY(18px); transition: opacity .28s ease, transform .28s ease; }
        @keyframes tabProgress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ─────────────────────────────────────────── */}
        <div className="text-center max-w-5xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center space-x-2.5">
            <span className="h-0.5 w-8 bg-[#F8C000] rounded-full"></span>
            <span className="text-sm font-bold text-[#1870B8] uppercase tracking-wider">PREMIUM HARDWARE</span>
            <span className="h-0.5 w-8 bg-[#F8C000] rounded-full"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-[#202020]">
            Engineered For Performance &amp; Durability
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We supply and commission only high-efficiency tier-1 equipment featuring comprehensive Australian warranties.
          </p>
        </div>

        {/* ── Tab pills ──────────────────────────────────────── */}
        <div className="flex flex-wrap justify-center gap-2 mb-14 border-b border-slate-100 pb-4">
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => goTo(i)}
              className={`relative px-6 py-3 text-sm font-bold rounded-full transition-all duration-300 overflow-hidden ${
                activeIndex === i
                  ? 'bg-[#1870B8] text-white shadow-md'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab.label}
              {activeIndex === i && !isHovered && (
                <span
                  key={`prog-${activeIndex}`}
                  className="absolute bottom-0 left-0 h-[3px] bg-[#F8C000] rounded-full"
                  style={{ animation: 'tabProgress 5s linear forwards' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* ── Content grid ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

          {/* LEFT: CardSwap stack */}
          <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px]">
            <CardSwap
              activeIndex={activeIndex}
              width={340}
              height={340}
              cardDistance={25}
              verticalDistance={25}
              skewAmount={3}
              easing="elastic"
              onCardClick={(idx) => goTo(idx)}
            >
              {tabs.map((tab, i) => (
                <Card
                  key={tab.id}
                  style={{
                    backgroundImage: `url(${tab.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {/* Tier-1 badge inside each card */}
                  <div className="absolute top-4 left-4 z-20 bg-[#F8C000] text-stone-900 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                    <Award className="h-3 w-3" />
                    <span>Tier-1 Brand</span>
                  </div>

                  {/* Gradient label on each card */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(32,32,32,0.9) 30%, transparent)',
                      borderRadius: 'inherit',
                      display: 'flex',
                      alignItems: 'flex-end',
                      padding: '20px',
                    }}
                  >
                    <div>
                      <p style={{ color: '#F8C000', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>
                        {tab.label}
                      </p>
                      <p style={{ color: '#fff', fontSize: 14, fontWeight: 600, lineHeight: 1.4, maxWidth: 260 }}>
                        {tab.title}
                      </p>
                    </div>
                  </div>

                  {/* Active ring */}
                  {i === activeIndex && (
                    <div style={{ position: 'absolute', inset: 0, borderRadius: 'inherit', boxShadow: '0 0 0 3px #1870B8' }} />
                  )}
                </Card>
              ))}
            </CardSwap>
          </div>

          {/* RIGHT: Spec details */}
          <div
            key={currentTab.id}
            className={`lg:col-span-7 space-y-6 text-left ${isAnimating ? 'product-exit' : 'product-animate'}`}
          >
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-serif font-semibold leading-snug text-[#202020]">{currentTab.title}</h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">{currentTab.subtitle}</p>
            </div>

            {/* Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              {currentTab.specs.map((spec, i) => (
                <div key={i} className="flex justify-between border-b border-stone-200/60 pb-2">
                  <span className="text-sm font-semibold text-slate-500">{spec.label}</span>
                  <span className="text-sm font-bold text-[#1870B8]">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentTab.features.map((feat, i) => (
                <div key={i} className="flex items-center space-x-2.5">
                  <div className="h-5 w-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="h-3.5 w-3.5 stroke-3" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href="#quote-calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-sm font-bold rounded-full text-white bg-linear-to-r from-[#1870B8] to-[#28A8E0] hover:opacity-90 shadow-md shadow-[#1870B8]/15 transition-opacity duration-200"
              >
                Request Systems Pricing
              </a>
              <a
                href="#quote-calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-slate-200 text-sm font-bold rounded-full text-slate-700 bg-white hover:bg-slate-50 transition-all duration-200 gap-1.5"
              >
                <FileText className="h-4 w-4 text-slate-400" />
                Download Brochure
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
