import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Calendar } from 'lucide-react';

interface NavigationProps {
  scrolled: boolean;
}

const Navigation = ({ scrolled }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Review', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  // Track active section on scroll (only on home page)
  useEffect(() => {
    if (!isHome) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Show/hide nav based on scroll direction
      if (scrollY > prevScrollY && scrollY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setPrevScrollY(scrollY);

      // Determine active section
      const sections = navLinks.map(link => link.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY, isHome]);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-morphism-dark shadow-2xl shadow-black/20'
          : 'bg-transparent'
      } ${showNav ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo and Brand Name Section */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/logo.png" 
              alt="ClickInRoom Logo" 
              className="h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="flex flex-col justify-center">
              <span className="text-gradient text-xl font-bold tracking-wider">ClickInRoom</span>
              <span className="text-[10px] text-gray-400 hidden sm:block">Hotel Digital Marketing Agency, Ludhiana</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => {
              const sectionId = link.href.slice(1);
              const isActive = isHome && activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={isHome ? link.href : `/${link.href}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                    isActive
                      ? 'text-yellow-400'
                      : 'text-gray-300 hover:text-yellow-400 hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-yellow-400 rounded-full" />
                  )}
                </a>
              );
            })}
            <Link
              to="/booking"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-yellow-400 hover:bg-white/5 transition-all duration-300"
            >
              Book Consultation
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a 
              href="tel:+917508639613" 
              className="flex items-center text-sm text-gray-300 hover:text-yellow-400 transition-all duration-300 group"
            >
              <Phone className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
              <span>+91 75086 39613</span>
            </a>
            <Link
              to="/booking"
              className="px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-semibold rounded-lg hover:shadow-xl hover:shadow-yellow-500/25 hover:scale-105 transition-all duration-300 flex items-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Book Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg glass-morphism hover:bg-white/10 transition-all duration-300"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-morphism-dark border-t border-white/5">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={isHome ? link.href : `/${link.href}`}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all duration-300 ${
                  isHome && activeSection === link.href.slice(1)
                    ? 'text-yellow-400 bg-yellow-400/10'
                    : 'text-gray-300 hover:text-yellow-400 hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            ))}
            <Link
              to="/booking"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 rounded-lg text-gray-300 hover:text-yellow-400 hover:bg-white/5 transition-all duration-300"
            >
              Book Consultation
            </Link>
            <div className="pt-4 space-y-3 border-t border-white/10">
              <a 
                href="tel:+917508639613" 
                className="flex items-center justify-center px-4 py-3 text-gray-300 hover:text-yellow-400 transition-colors"
              >
                <Phone className="w-4 h-4 mr-2" />
                <span>+91 75086 39613</span>
              </a>
              <Link
                to="/booking"
                className="block px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-semibold rounded-lg text-center hover:shadow-lg transition-all duration-300"
                onClick={() => setIsOpen(false)}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
