import { useState, useEffect } from 'react';
import logo from '../assets/Frame 1 (3).png';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  dropdownItems?: { label: string; href: string }[];
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  // Nav items based on the user's mockup
  const navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about-us' },
    {
      label: 'Services',
      href: '#services',
      dropdownItems: [
        { label: 'Residential Solar', href: '#residential-solar' },
        { label: 'Commercial Solar', href: '#commercial-solar' },
        { label: 'Battery Storage', href: '#battery-storage' },
        { label: 'System Maintenance', href: '#maintenance' },
      ],
    },
    {
      label: 'Products',
      href: '#products',
      dropdownItems: [
        { label: 'Solar Panels', href: '#solar-panels' },
        { label: 'Inverters', href: '#inverters' },
        { label: 'Solar Batteries', href: '#batteries' },
        { label: 'EV Chargers', href: '#ev-chargers' },
      ],
    },
    { label: 'Our Projects', href: '#projects' },
    { label: 'Contact Us', href: '#contact-us' },
  ];

  const [visible, setVisible] = useState(true);

  // Add scroll listener for active shadow/blur state and smart hide/show
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Smart navbar: hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 80 && !isOpen) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 transform ${
        visible ? 'translate-y-0' : '-translate-y-full'
      } ${
        scrolled
          ? 'bg-white backdrop-blur-md shadow-md py-3'
          : 'bg-white py-4 border-b border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="shrink-0 flex items-center">
            <a href="#home" className="flex items-center">
              <img
                src={logo}
                alt="SolEarth Energy Logo"
                className="h-12 md:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 items-center">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.dropdownItems && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.dropdownItems ? (
                  <button
                    className={`flex items-center text-sm font-semibold text-slate-700 hover:text-blue-900 focus:outline-none transition-colors duration-200 py-2 ${
                      activeDropdown === item.label ? 'text-blue-900' : ''
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:rotate-180 text-slate-400" />
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className={`relative py-2 text-sm font-semibold text-slate-700 hover:text-blue-900 transition-colors duration-200 ${
                      item.label === 'Home'
                        ? 'text-orange-500' // Custom orange for active "Home" link
                        : ''
                    }`}
                  >
                    {item.label}
                    {item.label === 'Home' && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full" />
                    )}
                  </a>
                )}

                {/* Dropdown Menu */}
                {item.dropdownItems && (
                  <div
                    className={`absolute left-0 mt-1 w-52 rounded-xl bg-white shadow-xl ring-1 ring-black/5 transition-all duration-200 origin-top-left ${
                      activeDropdown === item.label
                        ? 'opacity-100 scale-100 pointer-events-auto visible'
                        : 'opacity-0 scale-95 pointer-events-none invisible'
                    }`}
                  >
                    <div className="py-2 px-1">
                      {item.dropdownItems.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-900 rounded-lg transition-colors duration-150"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden lg:flex items-center">
            <a
              href="#contact-us"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-full text-white bg-yellow-500 hover:bg-yellow-500 shadow-lg shadow-yellow-500/20 hover:shadow-yellow-600/30 transition-all duration-200 transform hover:-translate-y-0.5 group"
            >
              Get A Quote
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-blue-900 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 z-50 w-full max-w-sm h-full bg-white shadow-2xl p-6 transition-transform duration-300 ease-in-out transform lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mb-8">
          <img src={logo} alt="SolEarth Energy Logo" className="h-10 w-auto" />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-slate-500 hover:text-blue-900 hover:bg-slate-50 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex flex-col space-y-4">
          {navItems.map((item) => (
            <div key={item.label} className="border-b border-slate-100 pb-2">
              {item.dropdownItems ? (
                <div>
                  <button
                    onClick={() =>
                      setActiveDropdown(activeDropdown === item.label ? null : item.label)
                    }
                    className="flex items-center justify-between w-full text-base font-semibold text-slate-800 py-2 hover:text-blue-900"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`mt-1 pl-4 space-y-2 overflow-hidden transition-all duration-300 ${
                      activeDropdown === item.label ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}
                  >
                    {item.dropdownItems.map((subItem) => (
                      <a
                        key={subItem.label}
                        href={subItem.href}
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-sm font-medium text-slate-600 hover:text-blue-900"
                      >
                        {subItem.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-base font-semibold text-slate-800 py-2 hover:text-blue-900 ${
                    item.label === 'Home' ? 'text-orange-500' : ''
                  }`}
                >
                  {item.label}
                </a>
              )}
            </div>
          ))}

          <div className="pt-4">
            <a
              href="#contact-us"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center w-full px-6 py-3.5 text-base font-bold rounded-full text-white bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all duration-200"
            >
              Get A Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
