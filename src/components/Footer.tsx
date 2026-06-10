import logo from '../assets/Frame 1 (3).png';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f8fafc] border-t border-slate-200 text-slate-600 pt-16 pb-8 font-sans">
      {/* Upper Footer section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-slate-200">

          {/* Column 1: Company Logo & Description */}
          <div className="flex flex-col space-y-4">
            <img src={logo} alt="SolEarth Energy Logo" className="h-16 w-auto object-contain self-start" />
            <p className="text-sm leading-relaxed text-slate-500">
              Australia's trusted partner in renewable energy. We provide high-efficiency solar panels and battery systems tailored for your needs.
            </p>
          </div>

          {/* Column 2: Contact Us */}
          <div>
            <div className="flex items-center mb-6">
              <span className="w-1.5 h-6 bg-orange-500 rounded-sm mr-3"></span>
              <h3 className="text-lg font-bold text-blue-900">Contact Us</h3>
            </div>
            <div className="space-y-4">
              {/* Phone Link */}
              <a href="tel:1300672194" className="flex items-center group">
                <div className="shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-900 text-white transition-transform duration-300 group-hover:scale-110">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-semibold text-slate-400 tracking-wider">CALL US</p>
                  <p className="text-sm font-bold text-blue-900 group-hover:text-orange-500 transition-colors">1300 672 555</p>
                </div>
              </a>

              {/* Email Link */}
              <a href="mailto:info@solearth-energy.com.au" className="flex items-center group">
                <div className="shrink-0 flex items-center justify-center h-10 w-10 rounded-full bg-blue-900 text-white transition-transform duration-300 group-hover:scale-110">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-xs font-semibold text-slate-400 tracking-wider">EMAIL US</p>
                  <p className="text-sm font-bold text-blue-900 group-hover:text-orange-500 transition-colors break-all">info@solearthenergy.com.au</p>
                </div>
              </a>
            </div>
          </div>

          {/* Column 3: Our Offices */}
          <div>
            <div className="flex items-center mb-6">
              <span className="w-1.5 h-6 bg-orange-500 rounded-sm mr-3"></span>
              <h3 className="text-lg font-bold text-blue-900">Our Offices</h3>
            </div>
            <div className="flex items-start">
              <div className="shrink-0 flex items-center justify-center mt-1 text-orange-500">
                <MapPin className="h-6 w-6" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-bold text-blue-900">New South Wales</p>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                  Damo Road, Kellyville NSW 5550
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <div className="flex items-center mb-6">
              <span className="w-1.5 h-6 bg-orange-500 rounded-sm mr-3"></span>
              <h3 className="text-lg font-bold text-blue-900">Quick Links</h3>
            </div>
            <ul className="grid grid-cols-1 gap-2.5">
              {['Home', 'Products', 'About Us', 'Our Projects', 'Contact Us'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-slate-600 hover:text-orange-500 hover:pl-1 transition-all duration-200 font-medium inline-block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Middle Footer section: Badges & Socials */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-6 gap-6 border-b border-slate-200">

          {/* Smart Energy Council Standard Member Logo placeholder */}
          <div className="flex items-center space-x-3">
            {/* Custom premium SVG representing the Smart Energy Council Standard Member logo */}
            <div className="flex items-center bg-white border border-slate-200 p-2.5 rounded-lg shadow-sm">
              <svg className="h-10 w-10 mr-2" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Geometric diamond facets similar to Smart Energy Council logo */}
                <path d="M50 5L15 40L50 50L50 5Z" fill="#0EA5E9" /> {/* Teal/Blue */}
                <path d="M50 5L50 50L85 40L50 5Z" fill="#10B981" /> {/* Green */}
                <path d="M15 40L50 50L50 95L15 40Z" fill="#3B82F6" /> {/* Blue */}
                <path d="M50 50L85 40L50 95L50 50Z" fill="#8B5CF6" /> {/* Purple */}
                <path d="M50 20L35 40L50 45L50 20Z" fill="#F59E0B" /> {/* Yellow/Orange accent */}
              </svg>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-black text-slate-800 tracking-wider uppercase leading-none">SMART ENERGY</span>
                <span className="text-[10px] font-black text-blue-900 tracking-wider uppercase leading-none">COUNCIL</span>
                <span className="text-[8px] font-bold text-slate-400 mt-0.5 leading-none">STANDARD MEMBER</span>
              </div>
            </div>

            {/* Social Icons Container */}
            <div className="flex space-x-2.5 pl-2">
              {[
                {
                  href: 'https://facebook.com',
                  svg: (
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  )
                },
                {
                  href: 'https://instagram.com',
                  svg: (
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  )
                },
                {
                  href: 'https://linkedin.com',
                  svg: (
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  )
                },
                {
                  href: 'https://youtube.com',
                  svg: (
                    <svg className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.95 1.96C5.12 19.5 12 19.5 12 19.5s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" />
                    </svg>
                  )
                }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center h-9 w-9 rounded-full border border-slate-300 text-slate-500 hover:text-white hover:bg-blue-900 hover:border-blue-900 transition-all duration-300"
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>


        </div>

        {/* Bottom Footer section: Terms & Legal Info */}
        <div className="pt-6 text-slate-500 text-xs">
          {/* Terms & Copyright row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
              <a href="#privacy-policy" className="hover:text-blue-900 font-semibold transition-colors">Privacy Policy</a>
              <a href="#terms-conditions" className="hover:text-blue-900 font-semibold transition-colors">Terms & Conditions</a>
              <a href="#complaints" className="hover:text-blue-900 font-semibold transition-colors">Complaints Handling Policy</a>
            </div>
            <div className="text-center md:text-right font-medium">
              ©2026 <span className="font-bold text-blue-900">SOLEARTH ENERGY PTY LTD</span> ABN 11 111 111 111
            </div>
          </div>

          {/* Disclaimer text */}
          <p className="leading-relaxed text-slate-400 text-[11px] mb-6 text-justify md:text-left">
            This Solar System Promotion is available for standard metropolitan based installations only. Price is after Small Scale Technology Certificates (STCs) have been assigned to SolEarth Energy Pty Ltd or its agents. Any additional extras including but not limited to double storey, roof type, meter box upgrades or three phase power, may attract additional charges. Price beat offer applies to local competitor advertised quotes only and must be for identical goods.
          </p>

          {/* Terms Apply & Developed By row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200/50">
            <div className="font-bold text-blue-900">
              *Terms and conditions apply.
            </div>
            <div className="flex items-center text-slate-400 font-medium">
              <span className="mr-1">&lt;&gt;</span>
              Developed by&nbsp;
              <a
                href="https://digitalwebconnection.com.au"
                target="_blank"
                rel="noreferrer"
                className="font-bold text-blue-900 hover:text-orange-500 transition-colors"
              >
                Digital Web Connection
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
