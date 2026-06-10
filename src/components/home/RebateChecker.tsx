import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, CheckCircle, Info, Sparkles, DollarSign } from 'lucide-react';

interface RebateInfo {
  zone: string;
  stcDiscount: number;
  batteryRebate: string;
  localTariff: string;
  bonusSavings: string;
}

const REGION_DATA: { [postcodePrefix: string]: RebateInfo } = {
  '20': { zone: 'Metro Sydney (Zone 3)', stcDiscount: 2350, batteryRebate: 'Eligible ($1,000 Interest-Free Loan)', localTariff: '28.5c / kWh avg', bonusSavings: '$250 SolEarth Seasonal Promo' },
  '21': { zone: 'Hills & Western Sydney (Zone 3)', stcDiscount: 2450, batteryRebate: 'Eligible ($1,000 Interest-Free Loan)', localTariff: '29.2c / kWh avg', bonusSavings: '$300 SolEarth Hills Promo' },
  '22': { zone: 'South Sydney & Illawarra (Zone 3)', stcDiscount: 2400, batteryRebate: 'Eligible (Clean Energy Finance)', localTariff: '28.9c / kWh avg', bonusSavings: '$250 SolEarth South Promo' },
  '25': { zone: 'Wollongong & South Coast (Zone 3)', stcDiscount: 2420, batteryRebate: 'Eligible (Clean Energy Finance)', localTariff: '29.1c / kWh avg', bonusSavings: '$350 Regional Grant Match' },
  '27': { zone: 'Blue Mountains & Central West (Zone 2)', stcDiscount: 2650, batteryRebate: 'Eligible ($1,200 Off Grid-Tied Storage)', localTariff: '31.4c / kWh avg', bonusSavings: '$400 Regional incentive match' },
};

export default function RebateChecker() {
  const [postcode, setPostcode] = useState('');
  const [searched, setSearched] = useState(false);
  const [result, setResult] = useState<RebateInfo | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postcode) return;

    // Check prefix
    const prefix = postcode.trim().substring(0, 2);
    const info = REGION_DATA[prefix];
    
    if (info) {
      setResult(info);
    } else {
      // Default NSW average info
      setResult({
        zone: 'NSW Regional Zone',
        stcDiscount: 2300,
        batteryRebate: 'Eligible (Clean Energy Council scheme)',
        localTariff: '29.8c / kWh avg',
        bonusSavings: '$200 General SolEarth Promo',
      });
    }
    setSearched(true);
  };

  return (
    <section id="rebate-checker" aria-label="Solar Rebate Checker" className="relative py-24 bg-[#F8F8F8] text-[#202020] overflow-hidden select-none">


      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2.5">
            <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
            <span className="text-sm font-bold text-[#1870B8] uppercase tracking-wider">Government Incentives</span>
            <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-[#202020]">
            Check Your Local <span className="italic text-[#1870B8]">Solar Rebates</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Enter your Australian postcode below to find the exact federal rebates, battery loans, and SolEarth discounts available in your suburb.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Postcode Search Box */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 bg-white p-3 rounded-2xl border border-stone-200 shadow-lg">
            <div className="flex-1 flex items-center gap-3 px-3">
              <MapPin className="h-5 w-5 text-[#1870B8] shrink-0" />
              <input
                type="text"
                maxLength={4}
                placeholder="Enter 4-digit postcode (e.g. 2155)"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value.replace(/\D/g, ''))}
                className="w-full bg-transparent border-0 outline-hidden focus:ring-0 text-stone-900 font-mono text-base placeholder-stone-400"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-linear-to-r from-[#1870B8] to-[#28A8E0] hover:opacity-90 text-white font-bold text-xs tracking-wider uppercase px-8 py-4 rounded-full transition-opacity duration-200 flex items-center justify-center gap-2"
            >
              <Search className="h-4 w-4" /> Calculate Rebates
            </button>
          </form>

          {/* Results panel */}
          <div className="mt-8 min-h-[180px]">
            <AnimatePresence mode="wait">
              {!searched ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-stone-50 border border-stone-200/50 rounded-2xl p-6 text-center text-sm text-stone-500"
                >
                  <Info className="h-5 w-5 text-stone-400 mx-auto mb-2" />
                  We support all postcodes across New South Wales (NSW). Typical savings start at $2,200 upfront.
                </motion.div>
              ) : (
                result && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6 text-left"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                      <div>
                        <p className="text-[10px] font-mono text-stone-400 uppercase tracking-widest">SUBURB PROFILE MATCH</p>
                        <h3 className="text-xl md:text-2xl font-serif font-semibold leading-snug text-[#202020] mt-1">{result.zone}</h3>
                      </div>
                      <div className="bg-[#1870B8]/10 text-[#1870B8] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider self-start sm:self-center">
                        Active Rebates Found
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      
                      {/* Metric 1 */}
                      <div className="bg-[#F8F8F8] border border-stone-200/50 rounded-xl p-5 flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                            <DollarSign className="h-3.5 w-3.5 text-emerald-600" /> STC Subsidy Discount
                          </p>
                          <p className="text-2xl font-black text-emerald-600">${result.stcDiscount}</p>
                          <p className="text-[10px] text-stone-400 font-mono">Deducted instantly from quote</p>
                        </div>
                      </div>

                      {/* Metric 2 */}
                      <div className="bg-[#F8F8F8] border border-stone-200/50 rounded-xl p-5 flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-xs text-stone-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
                            <Sparkles className="h-3.5 w-3.5 text-[#F8C000]" /> SolEarth Bonus Discount
                          </p>
                          <p className="text-2xl font-black text-[#1870B8]">{result.bonusSavings}</p>
                          <p className="text-[10px] text-stone-400 font-mono">Exclusive online referral bonus</p>
                        </div>
                      </div>

                    </div>

                    <div className="space-y-3.5 pt-4 border-t border-stone-100 text-sm">
                      <div className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-[#1870B8] shrink-0 mt-0.5" />
                        <p className="text-stone-600 leading-relaxed">
                          <strong>Battery Incentive:</strong> {result.batteryRebate}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-[#1870B8] shrink-0 mt-0.5" />
                        <p className="text-stone-600 leading-relaxed">
                          <strong>Average Grid Feed-in Cost:</strong> {result.localTariff} — battery storage strongly recommended.
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                      <a
                        href="#quote-calculator"
                        className="w-full sm:w-auto inline-flex justify-center items-center bg-linear-to-r from-[#1870B8] to-[#28A8E0] hover:opacity-90 text-white font-bold text-xs tracking-wider uppercase px-6 py-3.5 rounded-full transition-opacity duration-200"
                      >
                        Claim Subsidy Quote
                      </a>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
