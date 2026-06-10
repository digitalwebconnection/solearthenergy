import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem { q: string; a: string; }

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      q: 'How much money can I actually save with solar?',
      a: 'Most Australian households save between 60% and 80% on their quarterly electricity bills after switching. For a standard 6.6kW system, this equates to roughly $1,500 to $2,500 in yearly savings, meaning the system fully pays for itself in 3 to 4 years.'
    },
    {
      q: 'What happens on cloudy days or during grid blackouts?',
      a: 'Solar panels still generate electricity on cloudy days, though their output is reduced by about 50–70%. During a grid blackout, standard grid-tied solar systems shut down automatically for safety. If you install a hybrid battery system, your backup circuit will activate in under 20 milliseconds, keeping your lights and fridge running.'
    },
    {
      q: 'How long does a solar installation take?',
      a: 'A standard residential solar system (6.6kW to 10kW) is fully installed, safety tested, and commissioned in a single day. Larger commercial installations or complex off-grid battery configurations typically take between 2 to 5 days.'
    },
    {
      q: 'What warranties are included with SolEarth Energy systems?',
      a: 'We only supply premium Tier-1 hardware, carrying a 25-Year performance warranty on solar panels, a 10-Year manufacturer warranty on smart hybrid inverters, and a 10-Year warranty on lithium battery modules, alongside our 10-Year workmanship guarantee.'
    },
    {
      q: 'Are government solar rebates still available in NSW?',
      a: 'Yes! The federal government provides upfront subsidy discounts through Small-scale Technology Certificates (STCs), which can reduce your initial purchase cost by up to $2,500. We calculate and deduct this rebate discount directly from your quote sheet.'
    }
  ];

  return (
    <section id="faq" aria-label="Frequently Asked Questions" className="py-10 ">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center space-x-2.5">
            <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
            <span className="text-sm font-bold text-[#1870B8] uppercase tracking-wider">Questions & Answers</span>
            <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-[#202020]">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Everything you need to know about switching to solar energy, warranties, and bill reduction.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-slate-600/60 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="flex items-center justify-between w-full p-6 text-left hover:bg-[#F8F8F8] transition-colors"
                >
                  <span className="flex items-center space-x-3">
                    <HelpCircle className="h-5 w-5 text-[#1870B8] shrink-0" />
                    <h3 className="text-lg md:text-xl font-serif font-semibold leading-snug text-[#202020]">
                      {faq.q}
                    </h3>
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 text-[#1870B8] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-60 border-t border-slate-100' : 'max-h-0 pointer-events-none'
                  } overflow-hidden`}
                >
                  <div className="p-6 text-sm text-slate-600 leading-relaxed bg-white text-left">
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
