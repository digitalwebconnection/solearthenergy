import { ArrowUpRight } from 'lucide-react';
import { useRef, useState, useCallback, useEffect } from 'react';

interface Sector {
  title: string;
  desc: string;
  image: string;
  href: string;
  tag: string;
}

export default function Sectors() {
  const baseSectors: Sector[] = [
    {
      title: 'Residential Solar',
      desc: 'Save thousands on quarterly power bills with custom solar panels tailored for Australian roofs. We design systems that match your exact usage patterns.',
      image: 'https://intersolarsystems.com/wp-content/uploads/2024/02/solar-panels-1.webp',
      href: '#quote-calculator',
      tag: 'Most Popular'
    },
    {
      title: 'Commercial Solar',
      desc: 'Harness the sun to lock in operational savings and meet corporate ESG sustainability metrics. Ideal for warehouses, offices, and retail centres.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF010ct-UPeuoAa9N32ornbakK4YVNDAHMKg&s',
      href: '#quote-calculator',
      tag: 'High ROI'
    },
    {
      title: 'Off-Grid Solutions',
      desc: 'Unplug from the state grid with self-sustaining hybrid power hubs designed for remote areas, farms, and rural properties across Australia.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA3HlqEC0H7-kLx7sG315g15BdKv_zEfOo0w&s',
      href: '#quote-calculator',
      tag: 'Rural'
    },
    {
      title: 'Battery Storage',
      desc: 'Store excess midday solar generation to power your home through blackouts and peak night hours. Maximise self-consumption and grid independence.',
      image: 'https://accredica.com/hs-fs/hubfs/utility-scale-battery-storage.webp?width=725&height=407&name=utility-scale-battery-storage.webp',
      href: '#quote-calculator',
      tag: 'Energy Independence'
    },
    {
      title: 'EV Charging',
      desc: 'Charge your electric vehicle with 100% clean solar energy at home. Integrated smart charging stations that sync with your solar production.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROyaoNMYOaJ1c6-sjbh8WkdWsGp1dvwDrFVA&s',
      href: '#quote-calculator',
      tag: 'EV Ready'
    },
    {
      title: 'Industrial Solar',
      desc: 'Large-scale photovoltaic installations for manufacturing plants, logistics hubs, and industrial facilities with significant energy demands.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqF7uYwwy7hs67yh6OTanmlxD5x5iVyij8NA&s',
      href: '#quote-calculator',
      tag: 'Large Scale'
    },
    {
      title: 'Solar Monitoring',
      desc: 'Real-time performance dashboards and smart alerts to ensure your system is always generating at peak efficiency — accessible from any device.',
      image: 'https://5.imimg.com/data5/SELLER/Default/2024/5/415483937/QC/XX/ER/74280208/solar-energy-monitoring-system-500x500.jpg',
      href: '#quote-calculator',
      tag: 'Smart Tech'
    },
    {
      title: 'Solar Maintenance',
      desc: 'Professional panel cleaning, inverter servicing, and system health checks to keep your solar investment performing for decades to come.',
      image: 'https://australianpremiumsolar.co.in/wp-content/uploads/2024/06/cleaning-solar-panel.jpg',
      href: '#quote-calculator',
      tag: 'Aftercare'
    },
  ];

  // Triple the array: [Set 1] [Set 2 (Active)] [Set 3] to handle infinite scrolling seamlessly
  const sectors = [...baseSectors, ...baseSectors, ...baseSectors];

  const trackRef = useRef<HTMLDivElement>(null);
  const [virtualIndex, setVirtualIndex] = useState(baseSectors.length); 
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dragStart = useRef<{ x: number; scrollLeft: number } | null>(null);

  const CARD_WIDTH = 320;
  const GAP = 24;
  const ITEM_TOTAL_WIDTH = CARD_WIDTH + GAP;

  // Initialize scroll position to the middle set of cards
  useEffect(() => {
    if (trackRef.current) {
      trackRef.current.scrollLeft = baseSectors.length * ITEM_TOTAL_WIDTH;
    }
  }, [baseSectors.length, ITEM_TOTAL_WIDTH]);

  // Handle instant jump reset for infinite loops
  const handleInfiniteBoundary = useCallback(() => {
    if (!trackRef.current) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const currentVirtualIndex = Math.round(scrollLeft / ITEM_TOTAL_WIDTH);

    // Left boundary breakout -> Reset instantly to middle clone
    if (currentVirtualIndex < baseSectors.length) {
      const newIndex = currentVirtualIndex + baseSectors.length;
      trackRef.current.scrollLeft = newIndex * ITEM_TOTAL_WIDTH;
      return newIndex;
    }
    // Right boundary breakout -> Reset instantly to middle clone
    if (currentVirtualIndex >= baseSectors.length * 2) {
      const newIndex = currentVirtualIndex - baseSectors.length;
      trackRef.current.scrollLeft = newIndex * ITEM_TOTAL_WIDTH;
      return newIndex;
    }
    return currentVirtualIndex;
  }, [baseSectors.length, ITEM_TOTAL_WIDTH]);

  const scrollToVirtualIndex = useCallback((index: number, behavior: 'smooth' | 'auto' = 'smooth') => {
    if (trackRef.current) {
      trackRef.current.scrollTo({
        left: index * ITEM_TOTAL_WIDTH,
        behavior,
      });
      setVirtualIndex(index);
    }
  }, [ITEM_TOTAL_WIDTH]);


  // Auto-slide loop
  useEffect(() => {
    if (isHovered || isDragging) return;

    const timer = setInterval(() => {
      if (!trackRef.current) return;
      const fixedIndex = handleInfiniteBoundary() ?? virtualIndex;
      setTimeout(() => scrollToVirtualIndex(fixedIndex + 1), 10);
    }, 3000);

    return () => clearInterval(timer);
  }, [isHovered, isDragging, virtualIndex, handleInfiniteBoundary, scrollToVirtualIndex]);

  // Track regular manual scroll changes (like swipe gestures)
  const handleScroll = useCallback(() => {
    if (!trackRef.current || isDragging) return;
    const scrollLeft = trackRef.current.scrollLeft;
    const newIndex = Math.round(scrollLeft / ITEM_TOTAL_WIDTH);
    setVirtualIndex(newIndex);
  }, [isDragging, ITEM_TOTAL_WIDTH]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Mouse Drag Events
  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    handleInfiniteBoundary();
    setIsDragging(true);
    dragStart.current = { x: e.clientX, scrollLeft: trackRef.current.scrollLeft };
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStart.current || !trackRef.current) return;
    e.preventDefault();
    const dx = e.clientX - dragStart.current.x;
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx * 1.3;
  };

  const onMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    dragStart.current = null;
    
    if (trackRef.current) {
      const snapIndex = Math.round(trackRef.current.scrollLeft / ITEM_TOTAL_WIDTH);
      scrollToVirtualIndex(snapIndex);
      setTimeout(() => handleInfiniteBoundary(), 310);
    }
  };

  // Touch Drag Events
  const onTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    handleInfiniteBoundary();
    setIsDragging(true);
    dragStart.current = { x: e.touches[0].clientX, scrollLeft: trackRef.current.scrollLeft };
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragStart.current || !trackRef.current) return;
    const dx = e.touches[0].clientX - dragStart.current.x;
    trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx * 1.3;
  };

  const onTouchEnd = () => {
    setIsDragging(false);
    dragStart.current = null;
    if (trackRef.current) {
      const snapIndex = Math.round(trackRef.current.scrollLeft / ITEM_TOTAL_WIDTH);
      scrollToVirtualIndex(snapIndex);
      setTimeout(() => handleInfiniteBoundary(), 310);
    }
  };

  // Convert the expanded index (0 to 24) back to a base dot layout index (0 to 7)
  const currentActiveDot = virtualIndex % baseSectors.length;

  return (
    <section id="services" aria-label="Solar Energy Solutions" className="py-10 bg-[#F8F8F8] overflow-hidden">
      <style>{`
        .sectors-track {
          display: flex;
          gap: ${GAP}px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 12px 40px 24px;
          cursor: grab;
        }
        .sectors-track:active {
          cursor: grabbing;
        }
        .sectors-track::-webkit-scrollbar {
          display: none;
        }
        .sector-card {
          flex: 0 0 ${CARD_WIDTH}px;
        }
      `}</style>

      <div className="max-w-7xl justify-center mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div className="text-center max-w-7xl mx-auto justify-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-[#202020]">
              Tailored Solar Energy Solutions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              From smart suburbs to rural outposts, we engineer renewable solar microgrids that deliver absolute energy freedom.
            </p>
          </div>

        </div>
      </div>

      {/* Slider Track */}
      <div
        ref={trackRef}
        className="sectors-track select-none"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); onMouseUp(); }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {sectors.map((sector, index) => (
          <div key={index} className="sector-card ">
            <div className="group relative h-100 rounded-lg shadow-black overflow-hidden shadow-lg border border-slate-100/50 bg-slate-900 transition-all duration-300 transform hover:-translate-y-2">
              <div className="absolute inset-0">
                <img
                  src={sector.image}
                  alt={`${sector.title} installation for renewable energy`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-60"
                  draggable={false}
                />
              </div>

              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-[#1870B8] text-white rounded-full shadow">
                  {sector.tag}
                </span>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 text-left">
                <div className="space-y-3">
                  <h3 className="text-xl md:text-2xl font-serif font-semibold leading-snug text-white group-hover:text-[#F8C000] transition-colors">
                    {sector.title}
                  </h3>
                  <p className="text-sm text-slate-200 line-clamp-3 leading-relaxed">
                    {sector.desc}
                  </p>
                  <div className="pt-2">
                    <a
                      href={sector.href}
                      className="inline-flex items-center text-xs font-bold text-white group-hover:text-[#F8C000] bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2.5 rounded-full border border-white/10 tracking-wider uppercase transition-all duration-300"
                    >
                      Enquire about {sector.title}
                      <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {baseSectors.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              handleInfiniteBoundary();
              setTimeout(() => scrollToVirtualIndex(baseSectors.length + i), 10);
            }}
            aria-label={`Go to sector ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === currentActiveDot
                ? 'w-6 h-2 bg-[#1870B8]'
                : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
            }`}
          />
        ))}
      </div>
    </section>
  );
}