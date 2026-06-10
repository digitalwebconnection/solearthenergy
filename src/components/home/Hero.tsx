import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSlider() {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1920&q=80",
      tagline: "CLEAN ENERGY COUNCIL APPROVED RETAILER",
      title: "Premium Solar Engineered for Australian Rooftops",
      subtitle: "High-efficiency Tier-1 solar panels and intelligent hybrid battery storage system integration designed to eliminate your power bills.",
    },
    {
      image: "https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1920&q=80",
      tagline: "SMART ENERGY MANAGEMENT",
      title: "Intelligent Power Grid Ecosystems",
      subtitle: "Seamlessly store, shift, and manage your midday solar generation with advanced AI-driven home automation integrations.",
    },
    {
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=1920&q=80",
      tagline: "GUARANTEED PERFORMANCE",
      title: "25-Year Product & Performance Warranty",
      subtitle: "Experience absolute peace of mind with CEC accredited engineering teams and genuine domestic warranties backed by local support.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === slides.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section 
      id="home"
      aria-label="Hero Showcase"
      className="relative h-[calc(100vh-80px)] lg:h-[calc(100vh-88px)] min-h-[650px] w-full overflow-hidden group bg-stone-950"
    >
      {/* CSS Floating Particles Animation */}
      <style>{`
        @keyframes float-particle {
          0% { transform: translateY(0px) translateX(0px); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
        }
        .particle {
          position: absolute;
          background: rgba(248, 192, 0, 0.4);
          border-radius: 50%;
          pointer-events: none;
          z-index: 20;
        }
      `}</style>

      {/* Floating particles background overlays */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float-particle ${Math.random() * 6 + 6}s infinite linear`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Slider Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
            currentSlide === index ? "opacity-100 z-10 scale-100" : "opacity-0 z-0 scale-105"
          }`}
        >
          {/* Dark Overlay mask */}
          <div className="absolute inset-0 bg-linear-to-r from-stone-950/85 via-stone-950/60 to-transparent z-10" />
          <img
            src={slide.image}
            alt={`Solar power system: ${slide.title}`}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Hero content overlays */}
      <div className="absolute inset-0 z-25 flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full text-left">
          <div className="max-w-3xl space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
                className="space-y-6"
              >
                {/* Accent Tag */}
                <div className="inline-flex items-center gap-2 bg-[#1870B8]/20 border border-[#28A8E0]/30 backdrop-blur-md px-3.5 py-1.5 rounded-full">
                  <Sun className="h-4 w-4 text-[#F8C000]" />
                  <span className="text-[10px] md:text-xs font-mono font-semibold tracking-wider text-slate-100 uppercase">
                    {slides[currentSlide].tagline}
                  </span>
                </div>

                {/* H1 Headline */}
                <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight tracking-tight text-white">
                  {slides[currentSlide].title}
                </h1>

                {/* Subtitle */}
                <p className="text-base md:text-lg text-slate-200/90 leading-relaxed font-light max-w-2xl">
                  {slides[currentSlide].subtitle}
                </p>

                {/* Buttons container */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a
                    href="#quote-calculator"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 border border-transparent text-sm font-bold rounded-full text-white bg-linear-to-r from-[#1870B8] to-[#28A8E0] hover:opacity-90 transition-opacity duration-200 shadow-lg shadow-[#1870B8]/20"
                  >
                    Calculate Solar Potential <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href="#about-us"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border border-white/20 text-sm font-bold rounded-full text-white hover:bg-white/10 backdrop-blur-xs transition-colors duration-200"
                  >
                    Our Technology Profile
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
        }
        className="absolute left-6 top-1/2 z-30 -translate-y-1/2 p-3 rounded-full bg-black/15 text-white hover:bg-black/35 hover:scale-105 border border-white/10 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() =>
          setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
        }
        className="absolute right-6 top-1/2 z-30 -translate-y-1/2 p-3 rounded-full bg-black/15 text-white hover:bg-black/35 hover:scale-105 border border-white/10 backdrop-blur-sm transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Bottom Slider Indicators */}
      <div className="absolute bottom-10 left-1/2 z-30 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-10 bg-[#F8C000]" : "w-3 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}