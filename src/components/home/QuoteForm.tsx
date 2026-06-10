import { useState } from 'react';
import { CheckCircle, Calculator, PhoneCall } from 'lucide-react';

export default function QuoteForm() {
  const [step, setStep] = useState(1);
  const [bill, setBill] = useState('500-1000');
  const [systemSize, setSystemSize] = useState('6.6');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !postcode) {
      alert('Please fill out all contact fields.');
      return;
    }
    setSubmitted(true);
  };

  // Savings estimates based on choices
  const getProjections = () => {
    const size = parseFloat(systemSize);
    if (isNaN(size)) {
      return { panels: 22, offset: '$3,800', rebate: '$2,400' }; // battery hybrid fallback
    }
    const panelsCount = Math.round(size * 1000 / 440); // 440W panels
    let offsetVal = '$1,950';
    let rebateVal = '$2,150';

    if (size === 6.6) {
      offsetVal = '$1,950';
      rebateVal = '$2,150';
    } else if (size === 10) {
      offsetVal = '$2,900';
      rebateVal = '$3,200';
    } else if (size === 13.2) {
      offsetVal = '$3,850';
      rebateVal = '$4,100';
    }
    return { panels: panelsCount, offset: offsetVal, rebate: rebateVal };
  };

  const projections = getProjections();

  return (
    <section id="quote-calculator" aria-label="Solar Savings Quote Form" className="py-20 bg-linear-to-br from-blue-950 to-slate-900 text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(24,112,184,0.15),transparent_40%)]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context Copy */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="inline-flex items-center space-x-2.5 bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#F8C000]">
              <Calculator className="h-4 w-4" />
              <span>Free Savings Calculator</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              Get Your Custom Solar Savings Report
            </h2>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              Enter your details to calculate your estimated annual bill savings, required panel count, and eligible government rebates.
            </p>

            {/* Quick Benefits Checklist */}
            <div className="space-y-4 pt-2">
              {[
                'Instant bill reduction projection',
                'Custom satellite layout matching your roof space',
                'No obligation, completely free consultation'
              ].map((text, i) => (
                <div key={i} className="flex items-center space-x-3 text-slate-300">
                  <div className="shrink-0 h-5 w-5 rounded-full bg-[#1870B8]/20 text-[#28A8E0] flex items-center justify-center">
                    <svg className="h-3 w-3 stroke-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold">{text}</span>
                </div>
              ))}
            </div>

            {/* Contact call badge */}
            <div className="pt-4 border-t border-white/10 flex items-center gap-4">
              <a href="tel:1300672194" className="flex items-center justify-center h-12 w-12 rounded-full bg-[#1870B8] text-white shadow-lg">
                <PhoneCall className="h-5.5 w-5.5" />
              </a>
              <div>
                <p className="text-xs text-slate-100 font-bold uppercase tracking-wider">Talk to an Engineer</p>
                <p className="text-lg font-black text-white hover:text-[#28A8E0] transition-colors">
                  <a href="tel:1300672194">1300 672 555</a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Calculator Interactive Form */}
          <div className="lg:col-span-7">
            <div className="bg-white text-slate-800  rounded-lg p-4 sm:p-6 shadow-2xl border border-slate-100 text-left">
              
              {submitted ? (
                /* Success Screen */
                <div className="py-8 text-center space-y-6">
                  <div className="mx-auto h-16 w-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 stroke-[1.5]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-serif font-semibold leading-snug text-blue-950">Assessment Requested!</h3>
                    <p className="text-slate-500 text-sm max-w-sm mx-auto leading-relaxed">
                      Thank you, <strong className="text-blue-900">{name}</strong>. One of our CEC accredited engineers will run a satellite model of your roof and call you in 2 hours.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                      setName('');
                      setEmail('');
                      setPhone('');
                      setPostcode('');
                    }}
                    className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold rounded-full text-white bg-linear-to-r from-[#1870B8] to-[#28A8E0] hover:opacity-90 shadow-md shadow-[#1870B8]/15 transition-opacity duration-200"
                  >
                    Calculate Another Roof
                  </button>
                </div>
              ) : (
                /* Main Interactive Wizard Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Step Indicators */}
                  <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-4">
                    <span>Step {step} of 3</span>
                    <span className="text-[#1870B8]">
                      {step === 1 && 'Electricity Usage'}
                      {step === 2 && 'System Preference'}
                      {step === 3 && 'Contact Details'}
                    </span>
                  </div>

                  {step === 1 && (
                    /* Step 1: Quarterly bill range */
                    <div className="space-y-4">
                      <label className="text-base font-extrabold text-blue-950 block">
                        What is your average quarterly electricity bill?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: 'under-500', label: 'Under $500' },
                          { id: '500-1000', label: '$500 - $1,000' },
                          { id: '1000-1500', label: '$1,000 - $1,500' },
                          { id: 'over-1500', label: 'Over $1,500' }
                        ].map((opt) => (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => {
                              setBill(opt.id);
                              setStep(2);
                            }}
                            className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                              bill === opt.id
                                ? 'border-[#1870B8] bg-[#1870B8]/5 text-[#1870B8] font-bold shadow-inner'
                                : 'border-slate-200 hover:border-blue-900/40 text-slate-600'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    /* Step 2: System size preference */
                    <div className="space-y-4">
                      <label className="text-base font-extrabold text-blue-950 block">
                        Which system size are you interested in?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { id: '6.6', label: '6.6kW System', desc: '15 Panels • Small families' },
                          { id: '10', label: '10.0kW System', desc: '22 Panels • Large families' },
                          { id: '13.2', label: '13.2kW System', desc: '30 Panels • High consumption' },
                          { id: 'battery-hybrid', label: 'Solar & Battery Pack', desc: 'Backup security + Storage' }
                        ].map((opt) => (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => {
                              setSystemSize(opt.id);
                              setStep(3);
                            }}
                            className={`p-5 rounded-2xl border text-left transition-all duration-200 ${
                              systemSize === opt.id
                                ? 'border-[#1870B8] bg-[#1870B8]/5 text-[#1870B8] font-bold shadow-inner'
                                : 'border-slate-200 hover:border-blue-900/40 text-slate-600'
                            }`}
                          >
                            <p className="text-sm font-bold block">{opt.label}</p>
                            <p className="text-xs text-slate-400 mt-1">{opt.desc}</p>
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-xs font-bold text-slate-400 hover:text-blue-950 block mt-2"
                      >
                        ← Back to bill range
                      </button>
                    </div>
                  )}

                  {step === 3 && (
                    /* Step 3: Contact Details fields */
                    <div className="space-y-4">
                      <label className="text-base font-extrabold text-blue-950 block">
                        Where should we send your savings report?
                      </label>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</span>
                          <input
                            type="text"
                            required
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1870B8] bg-slate-50 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Email Address</span>
                          <input
                            type="email"
                            required
                            placeholder="john@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1870B8] bg-slate-50 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Phone Number</span>
                          <input
                            type="tel"
                            required
                            placeholder="0412 345 678"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1870B8] bg-slate-50 text-sm"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Postcode</span>
                          <input
                            type="text"
                            required
                            placeholder="2155"
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1870B8] bg-slate-50 text-sm"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="px-8 py-4 border border-slate-200 text-sm font-bold rounded-full text-slate-600 hover:bg-slate-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="grow inline-flex items-center justify-center px-8 py-4 border border-transparent text-sm font-bold rounded-full text-white bg-linear-to-r from-[#1870B8] to-[#28A8E0] hover:opacity-90 shadow-md shadow-[#1870B8]/15 transition-opacity duration-200"
                        >
                          Request Savings Report
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Summary / Projections Footer Card */}
                  <div className="bg-stone-50 border border-stone-200/60 rounded-2xl p-5 mt-6 grid grid-cols-3 gap-2 text-center text-stone-800">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Required Panels</p>
                      <p className="text-base font-extrabold text-[#1870B8] mt-1">{projections.panels} Panels</p>
                    </div>
                    <div className="border-x border-slate-200">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Est. Bill Offset</p>
                      <p className="text-base font-extrabold text-emerald-600 mt-1">{projections.offset} / yr</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider">Govt. Rebate</p>
                      <p className="text-base font-extrabold text-[#1870B8] mt-1">{projections.rebate} off</p>
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
