import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, MapPin, Cpu } from 'lucide-react';

interface Project {
  title: string;
  category: 'residential' | 'commercial';
  location: string;
  systemSize: string;
  savings: string;
  production: string;
  image: string;
  featured?: boolean;
}

const stats = [
  { value: '5,000+', label: 'Installations' },
  { value: '$18M+', label: 'Client Savings' },
  { value: '4.9★', label: 'Customer Rating' },
  { value: '25Y', label: 'Warranty Cover' },
];

const projects: Project[] = [
  {
    title: '6.6kW Smart Solar Panel System',
    category: 'residential',
    location: 'Kellyville, NSW',
    systemSize: '6.6kW Jinko + Fronius inverter',
    savings: '$2,400 / Year',
    production: '98%',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    featured: true,
  },
  {
    title: '30kW Commercial Factory Solar',
    category: 'commercial',
    location: 'Wetherill Park, NSW',
    systemSize: '30kW Trina + Sungrow inverter',
    savings: '$11,200 / Year',
    production: '96%',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsFsfrSWzHm7mfUwLiUwdj9vf-8a78GLaFzg&s',
  },
  {
    title: '10kW Hybrid Solar & Battery Storage',
    category: 'residential',
    location: 'Castle Hill, NSW',
    systemSize: '10.3kW panels + 10kWh Battery',
    savings: '$3,800 / Year',
    production: '99%',
    image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: '15kW Large Residence Multi-Phase',
    category: 'residential',
    location: 'Dural, NSW',
    systemSize: '15.4kW premium + hybrid setup',
    savings: '$5,100 / Year',
    production: '97%',
    image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: '100kW Warehouse Roof Microgrid',
    category: 'commercial',
    location: 'Parramatta, NSW',
    systemSize: '100kW TOPCon + Enphase micro',
    savings: '$36,500 / Year',
    production: '95%',
    image: 'https://img.magnific.com/free-photo/solar-panels-roof-solar-cell_335224-1324.jpg?semt=ais_hybrid&w=740&q=80',
  },
  {
    title: 'Off-Grid Cabin Hybrid System',
    category: 'residential',
    location: 'Hunter Valley, NSW',
    systemSize: '6.6kW + 15kWh Off-grid Battery',
    savings: '100% Off Grid',
    production: '100%',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl5Zf97v1KU_OOQoU7eSe_IxX215zdWVV3RQ&s',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function Projects() {
  const [filter, setFilter] = useState<'all' | 'residential' | 'commercial'>('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" aria-label="Recent Projects Showcase" className="relative py-10 bg-slate-50 overflow-hidden">

      {/* Ambient background blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1870B8]/8 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#28A8E0]/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 text-left">
          <motion.div
            className="space-y-4 max-w-3xl"
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2.5">
              <span className="h-0.5 w-8 bg-[#F8C000] rounded-full" />
              <span className="text-sm font-bold text-[#1870B8] uppercase tracking-wider">Our Recent Projects</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight text-[#202020]">
              Completed Solar Installations Across NSW
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Premium systems designed to match individual household layouts, power budgets, and long-term energy goals.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div
            className="flex gap-2 bg-white p-1.5 rounded-full border border-slate-200 shadow-sm self-start"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'residential', label: 'Residential' },
              { id: 'commercial', label: 'Commercial' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as typeof filter)}
                className={`px-5 py-2 text-xs font-bold rounded-full transition-all duration-200 ${filter === tab.id
                    ? 'bg-[#1870B8] text-white shadow-lg'
                    : 'text-slate-600 hover:text-[#1870B8]'
                  }`}
              >
                {tab.label}
              </button>  
            ))}
          </motion.div>
        </div>

        {/* ── Stats bar ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-white rounded-lg p-6 text-center border border-slate-400 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="text-3xl font-serif font-black text-[#1870B8]">{item.value}</h3>
              <p className="text-sm text-slate-500 mt-1">{item.label}</p>
            </motion.div>
          ))}
        </div>

        {/* ── Project Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                whileHover={{
                  y: -10,
                  rotateX: 2,
                  rotateY: -2,
                  scale: 1.02,
                  boxShadow: '0 30px 60px -12px rgba(0,0,0,0.25)',
                  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                }}
                whileTap={{ scale: 0.98, transition: { duration: 0.15 } }}
                style={{ transformPerspective: 800, transformStyle: 'preserve-3d' }}
                className="group relative bg-white/80  rounded-lg border border-white/10 shadow-lg  shadow-black hover:shadow-2xl overflow-hidden flex flex-col h-full text-left cursor-pointer"
              >
                {/* ── Animated shine sweep ── */}
                <motion.div
                  className="absolute inset-0 z-50 pointer-events-none"
                  initial={{ x: '-100%', opacity: 0 }}
                  whileHover={{ x: '200%', opacity: [0, 0.15, 0] }}
                  transition={{ duration: 0.65, ease: 'easeInOut' }}
                  style={{
                    background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.6) 50%, transparent 60%)',
                  }}
                />

                {/* ── Featured ribbon ── */}
                {project.featured && (
                  <motion.div
                    className="absolute top-4 right-4 z-30"
                    initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: index * 0.08 + 0.3, type: 'spring', stiffness: 260, damping: 16 }}
                  >
                    <div className="bg-[#F8C000] text-stone-900 px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-[#F8C000]/30">
                      Featured
                    </div>
                  </motion.div>
                )}

                {/* ── Floating production badge ── */}
                {!project.featured && (
                  <motion.div
                    className="absolute top-4 right-4 z-20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 + 0.25, duration: 0.4, ease: 'easeOut' }}
                    whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  >
                    <div className="bg-white/90 backdrop-blur-md px-3 py-2 rounded-xl shadow-lg text-center">
                      <p className="text-[10px] uppercase text-slate-500 leading-none">Production</p>
                      <p className="font-bold text-[#1870B8] text-sm leading-tight">{project.production}</p>
                    </div>
                  </motion.div>
                )}

                {/* ── Image + hover overlay ── */}
                <div className="relative h-64 overflow-hidden rounded-t-xl">
                  <motion.img
                    src={project.image}
                    alt={`Solar power installation for ${project.title}`}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  />

                  {/* Category pill */}
                  <motion.div
                    className="absolute top-4 left-4 z-10"
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 + 0.2, duration: 0.4 }}
                  >
                    <span className="bg-[#1870B8] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-md">
                      {project.category}
                    </span>
                  </motion.div>

                  {/* Hover overlay with savings */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <motion.div
                      className="absolute bottom-5 left-5 text-white"
                      initial={{ y: 8, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-sm font-semibold text-slate-200">Annual Savings</p>
                      <p className="text-2xl font-black text-[#F8C000]">{project.savings}</p>
                    </motion.div>
                  </div>
                </div>

                {/* ── Card body ── */}
                <div className="p-6 grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <motion.div
                      className="flex items-center gap-1.5 text-slate-900"
                      whileHover={{ x: 3, transition: { duration: 0.2 } }}
                    >
                      <MapPin className="h-3 w-3 shrink-0" />
                      <p className="text-xs font-bold uppercase tracking-widest">{project.location}</p>
                    </motion.div>
                    <h3 className="text-xl md:text-2xl font-serif font-semibold leading-snug text-[#202020] line-clamp-2 group-hover:text-[#1870B8] transition-colors duration-300">
                      {project.title}
                    </h3>
                    <div className="flex items-start gap-1.5 text-slate-500">
                      <Cpu className="h-3.5 w-3.5 mt-0.5 shrink-0 text-[#1870B8]" />
                      <p className="text-xs font-medium">{project.systemSize}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-wider">Estimated Savings</p>
                      <motion.p
                        className="text-base font-extrabold text-[#1870B8] flex items-center gap-1 mt-0.5"
                        whileHover={{ scale: 1.05, x: 2, transition: { duration: 0.2 } }}
                      >
                        <Sparkles className="h-4 w-4" />
                        {project.savings}
                      </motion.p>
                    </div>
                    <motion.a
                      href="#quote-calculator"
                      aria-label={`Get quote for ${project.title}`}
                      className="h-9 w-9 rounded-full bg-[#F8F8F8] text-[#1870B8] group-hover:bg-[#1870B8] group-hover:text-white flex items-center justify-center shadow-inner"
                      whileHover={{ scale: 1.2, rotate: -10, transition: { type: 'spring', stiffness: 400, damping: 14 } }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>



      </div>
    </section>
  );
}
