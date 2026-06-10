import { useState, useRef, useEffect } from 'react';
import { PhoneCall, FileEdit, HardHat, Radio, CheckCircle, ChevronRight, Award, Compass, HeartHandshake, X } from 'lucide-react';
import Stepper, { Step } from './Stepper';

interface StepData {
  num: string;
  icon: any;
  title: string;
  desc: string;
  image: string;
  bulletPoints: string[];
  duration: string;
}

export default function Process() {
  const steps: StepData[] = [
    {
      num: '01',
      icon: PhoneCall,
      title: 'Free Energy Audit',
      desc: 'We analyse your quarterly electricity bills and use satellite mapping to check roof shade.',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80',
      bulletPoints: [
        'Detailed analysis of energy consumption history',
        '3D roof space assessment using satellite imaging',
        'Accurate solar generation estimates',
        'Projected ROI and payback period calculation'
      ],
      duration: 'Takes 15-20 Minutes'
    },
    {
      num: '02',
      icon: FileEdit,
      title: 'Custom Engineering Design',
      desc: 'Our engineers structure a premium system configuration to optimize energy offset.',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
      bulletPoints: [
        'Optimal panel layout for maximum solar absorption',
        'Premium inverter and battery sizing tailored to you',
        'Electrical engineering layout schematic validation',
        'Detailed structural engineering compliance checklist'
      ],
      duration: 'Completed in 2-3 Days'
    },
    {
      num: '03',
      icon: HardHat,
      title: 'Professional Installation',
      desc: 'CEC-accredited local technicians install your systems with absolute structural security.',
      image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80',
      bulletPoints: [
        'CEC-accredited electrical technicians',
        'Premium quality racking and framing mounts',
        'Rigorous safety protocols and onsite inspection',
        'Clean site completion and waste recycling'
      ],
      duration: 'Typically Done in 1 Day'
    },
    {
      num: '04',
      icon: Radio,
      title: 'Grid Connection & Support',
      desc: 'We complete government inspections, connect you to the grid, and configure real-time apps.',
      image: 'https://images.unsplash.com/photo-1498084393753-b411b2d26b34?auto=format&fit=crop&w=600&q=80',
      bulletPoints: [
        'Grid export authorization paperwork handling',
        'Real-time mobile app tracking setup (Wi-Fi/4G)',
        'Full customer handover tutorial session',
        'Ongoing lifetime monitoring support services'
      ],
      duration: 'Within 7-10 Business Days'
    }
  ];

  const [showPopup, setShowPopup] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="process" ref={sectionRef} aria-label="Solar System Installation Process" className="relative overflow-hidden py-10">
     
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header section */}
        <div className="text-center max-w-5xl mx-auto mb-12 space-y-4">
          <div className="flex items-center justify-center space-x-2.5">
            <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
            <span className="text-sm font-bold text-[#1870B8] uppercase tracking-wider">Our Process</span>
            <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-[#202020]">
            Your Seamless Journey To Solar Energy
          </h2>
          <p className="text-slate-900 text-sm sm:text-base leading-relaxed">
            We handle everything from initial consultation and council permissions to post-installation grid commissioning.
          </p>
        </div>

        {/* Stepper implementation */}
        <Stepper
          initialStep={1}
          disableStepIndicators={false}
          backButtonText="Prev Step"
          nextButtonText="Next Step"
          stepCircleContainerClassName="!max-w-7xl"
          onFinalStepCompleted={() => {
            if (isSectionVisible) {
              setShowPopup(true);
            }
          }}
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Step key={step.num}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center text-left py-4">
                  {/* Left Column: Info & Details */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-2xl bg-stone-100 text-[#1870B8] flex items-center justify-center shadow-sm">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#1870B8] uppercase tracking-wider">Phase {step.num}</span>
                        <h3 className="text-xl md:text-2xl font-serif font-semibold leading-snug text-stone-900">{step.title}</h3>
                      </div>
                    </div>

                    <p className="text-slate-600 text-base leading-relaxed">
                      {step.desc}
                    </p>

                    {/* Deliverables / bullet points */}
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
                        <Compass className="h-4 w-4 text-[#F8C000]" />
                        Key Deliverables
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {step.bulletPoints.map((bullet, idx) => (
                          <div key={idx} className="flex items-start gap-2.5">
                            <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                            <span className="text-sm font-semibold text-slate-700 leading-tight">{bullet}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-xs font-bold text-slate-500">
                      <span className="h-2 w-2 rounded-full bg-[#F8C000] animate-ping" />
                      <span>{step.duration}</span>
                    </div>
                  </div>

                  {/* Right Column: Visual illustration */}
                  <div className="lg:col-span-5 relative">
                    <div className="relative rounded-lg  overflow-hidden shadow-2xl border border-slate-300 shadow-black bg-slate-50 aspect-video lg:aspect-square">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full  h-100 object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-blue-950/60 via-transparent to-transparent" />
                      
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <div className="flex items-center gap-2">
                          <Award className="h-5 w-5 text-[#F8C000]" />
                          <span className="text-xs font-bold uppercase tracking-wider">SolEarth Guarantee</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Step>
            );
          })}

          {/* Final Complete Screen */}
          <Step>
            <div className="flex flex-col items-center justify-center text-center py-10 space-y-6 max-w-lg mx-auto">
              <div className="h-20 w-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-lg border border-emerald-100 animate-bounce">
                <HeartHandshake className="h-10 w-10" />
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-blue-950">Ready For Energy Independence?</h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  You have toured our step-by-step process. Let us build your custom solar proposal today.
                </p>
              </div>
              <div className="pt-4">
                <button
                  onClick={() => setShowPopup(true)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-sm sm:text-base rounded-full shadow-lg hover:shadow-orange-500/20 transition-all duration-200"
                >
                  Get Your Free Proposal
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Step>
        </Stepper>

      </div>

      {/* Premium Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowPopup(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-slate-100 overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            {/* Design accents */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-orange-500 to-amber-500" />
            
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center space-y-2 mb-6 mt-2">
              <div className="h-12 w-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center mx-auto shadow-sm">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-blue-950">Get Your Free Proposal</h3>
              <p className="text-sm text-slate-500 leading-normal">
                Submit details below and our CEC engineering team will design your customized energy offset plan.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={(e) => { e.preventDefault(); setShowPopup(false); alert("Thank you! Our engineering team will contact you shortly."); }} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none text-sm font-semibold text-slate-800 bg-slate-50"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none text-sm font-semibold text-slate-800 bg-slate-50"
                  placeholder="e.g. 0400 123 456"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-blue-900 focus:ring-1 focus:ring-blue-900 outline-none text-sm font-semibold text-slate-800 bg-slate-50"
                  placeholder="e.g. john@example.com"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-xl shadow-lg shadow-orange-500/10 transition-colors"
                >
                  Send Proposal Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
