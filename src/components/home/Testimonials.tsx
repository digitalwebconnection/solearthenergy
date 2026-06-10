import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

interface Review {
  name: string;
  location: string;
  rating: number;
  date: string;
  system: string;
  savings: string;
  comment: string;
  avatar: string;
  verified: boolean;
}

const reviews: Review[] = [
  {
    name: 'Sarah Jenkins',
    location: 'Kellyville, NSW',
    rating: 5,
    date: 'April 2026',
    system: '6.6kW Residential',
    savings: '$2,400 / yr',
    comment: 'From the initial satellite consultation to final grid connection, SolEarth was outstanding. Our quarterly bill dropped from $850 to under $120. Highly recommend!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    verified: true,
  },
  {
    name: 'Michael Chen',
    location: 'Castle Hill, NSW',
    rating: 5,
    date: 'March 2026',
    system: '10kW Hybrid + Battery',
    savings: '$3,800 / yr',
    comment: 'The crew was incredibly efficient and clean. They walked me through the inverter app and battery scheduling. Stress-free process, could not ask for better.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    verified: true,
  },
  {
    name: 'David Ross',
    location: 'Dural, NSW',
    rating: 5,
    date: 'May 2026',
    system: '15kW Premium',
    savings: '$5,100 / yr',
    comment: 'Most transparent pricing I found after checking four quotes. Zero-upfront payment plan makes it simple to pay using my power savings. Exceptional value.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    verified: true,
  },
  {
    name: 'Priya Sharma',
    location: 'Parramatta, NSW',
    rating: 5,
    date: 'February 2026',
    system: '6.6kW + Smart Monitor',
    savings: '$2,200 / yr',
    comment: 'SolEarth handled everything from council approval to final CEC certificate. The live monitoring app is fantastic — I can see exactly what my panels produce in real time.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80',
    verified: true,
  },
  {
    name: 'James O\'Brien',
    location: 'Wetherill Park, NSW',
    rating: 5,
    date: 'January 2026',
    system: '30kW Commercial',
    savings: '$11,200 / yr',
    comment: 'Our factory electricity costs halved in the first month. The commercial team was professional and finished the 30kW install in just two days. Remarkable result.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    verified: true,
  },
  {
    name: 'Linda Nguyen',
    location: 'Bella Vista, NSW',
    rating: 5,
    date: 'May 2026',
    system: '10.12kW Family Executive',
    savings: '$4,200 / yr',
    comment: 'After getting burned by another company, SolEarth restored my faith. Full CEC accreditation, Tier-1 panels, and genuine aftercare support. Worth every cent.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    verified: true,
  },
  {
    name: 'Tom Whitfield',
    location: 'Hills District, NSW',
    rating: 5,
    date: 'March 2026',
    system: '6.6kW Smart Entry',
    savings: '$2,400 / yr',
    comment: 'Friendly team, very knowledgeable. They explained every single component and why it was chosen for my roof orientation. No upselling, just honest advice.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    verified: true,
  },
  {
    name: 'Aisha Patel',
    location: 'Norwest, NSW',
    rating: 5,
    date: 'April 2026',
    system: '13.2kW Estate Ultimate',
    savings: '$5,500 / yr',
    comment: 'Absolutely premium experience. The AI monitoring caught an inverter efficiency issue before I even noticed — their support team resolved it within hours. Phenomenal.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    verified: true,
  },
];

/* Split reviews into two rows */
const row1 = reviews.slice(0, 4);

/* Duplicate each row for seamless infinite scroll */
const marqueeRow1 = [...row1, ...row1];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-[#F8C000] text-[#F8C000]" />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="shrink-0 w-80 bg-white rounded-2xl border border-slate-400 shadow-md p-6 mx-3 flex flex-col justify-between gap-4 relative group shadow-black hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
      {/* Quote icon */}
      <Quote className="absolute top-5 right-5 h-7 w-7 text-[#1870B8]/10 group-hover:text-[#1870B8]/20 transition-colors" />

      {/* Stars + system badge */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <StarRow count={review.rating} />
          <span className="text-[9px] font-bold text-[#1870B8] uppercase tracking-wider bg-[#1870B8]/8 border border-[#1870B8]/15 px-2 py-0.5 rounded-full">
            {review.system}
          </span>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">
          "{review.comment}"
        </p>
      </div>

      {/* Savings chip + avatar row */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <img
            src={review.avatar}
            alt={`Customer ${review.name} testimonial avatar`}
            className="h-9 w-9 rounded-full object-cover border-2 border-white shadow"
          />
          <div>
            <p className="text-xs font-extrabold text-[#202020] leading-tight flex items-center gap-1">
              {review.name}
              {review.verified && (
                <span className="h-3.5 w-3.5 bg-[#1870B8] rounded-full text-white text-[7px] font-black flex items-center justify-center">✓</span>
              )}
            </p>
            <p className="text-[10px] text-slate-400 font-medium">{review.location} · {review.date}</p>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Saving</p>
          <p className="text-sm font-black text-[#1870B8]">{review.savings}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="testimonials" aria-label="Customer Testimonials" className="py-10  overflow-hidden relative">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#1870B8]/8 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#28A8E0]/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 text-center mb-10 space-y-4"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65 }}
      >
        <div className="flex items-center justify-center gap-2.5">
          <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
          <span className="text-sm font-bold text-[#1870B8] uppercase tracking-wider">Customer Stories</span>
          <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
        </div>

        <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-[#202020]">
          Real Australians.
          <span className="text-[#1870B8]">Real Savings.</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-slate-500 font-semibold">
          <span className="flex items-center gap-0.5 text-[#F8C000]">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-[#F8C000] text-[#F8C000]" />)}
          </span>
          <span>4.9 / 5 Average · 320+ Verified Google Reviews</span>
        </div>
      </motion.div>

      {/* ── Marquee row 1 (left → right) ── */}
      <div className="relative max-w-7xl mx-auto mb-5">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <style>{`
          @keyframes marquee-ltr {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marquee-rtl {
            0%   { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-marquee-ltr {
            display: flex;
            animation: marquee-ltr 38s linear infinite;
          }
          .animate-marquee-rtl {
            display: flex;
            animation: marquee-rtl 42s linear infinite;
          }
          .animate-marquee-ltr:hover,
          .animate-marquee-rtl:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="overflow-hidden py-8">
          <div className="animate-marquee-ltr">
            {marqueeRow1.map((review, i) => (
              <ReviewCard key={`r1-${i}`} review={review} />
            ))}
          </div>
        </div>
      </div>




      {/* Bottom trust strip */}
      <motion.div
        className="max-w-4xl mx-auto px-4 sm:px-6 mt-14 flex flex-wrap items-center justify-center gap-8 text-sm text-slate-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {[
          { label: '320+ Reviews', sub: 'Google Verified' },
          { label: '4.9 ★', sub: 'Average Rating' },
          { label: '5,000+', sub: 'Installations' },
          { label: '$18M+', sub: 'Customer Savings' },
        ].map(({ label, sub }) => (
          <div key={label} className="text-center">
            <p className="text-xl font-black text-[#1870B8]">{label}</p>
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mt-0.5">{sub}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
