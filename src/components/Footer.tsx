import { useState, useEffect } from 'react';
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-black"></div>
      
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1 reveal" style={{ transitionDelay: '0.1s' }}>
            <div className="flex items-center space-x-3 mb-6">
              <img 
                src="/logo.png" 
                alt="ClickInRoom Logo" 
                className="h-16 w-auto object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div className="flex flex-col">
                <span className="text-gradient text-xl font-bold tracking-wider">ClickInRoom</span>
                <span className="text-[10px] text-gray-400">Hotel Digital Marketing Agency, Ludhiana</span>
              </div>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed text-sm">
              India's premier hospitality digital solutions provider, transforming hotels into digital success stories with innovative marketing and technology.
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 glass-morphism rounded-lg flex items-center justify-center hover:bg-yellow-400/20 hover:border-yellow-400/30 transition-all group"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-gray-400 group-hover:text-yellow-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-400 rounded-full"></span>
            </h3>
            <ul className="space-y-3 mt-6">
              {['About Us', 'Our Services', 'Gallery', 'Reviews', 'Contact Us'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, '')}`}
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-yellow-400 transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column */}
          <div className="reveal" style={{ transitionDelay: '0.3s' }}>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Services
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-400 rounded-full"></span>
            </h3>
            <ul className="space-y-3 mt-6">
              {['Website Development', 'SEO & Marketing', 'Social Media', 'Hotel Photography', 'Reputation Management', 'Booking Engine'].map((item) => (
                <li key={item}>
                  <a
                    href="#services"
                    className="text-gray-400 hover:text-yellow-400 transition-colors text-sm flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2 group-hover:bg-yellow-400 transition-colors"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="reveal" style={{ transitionDelay: '0.4s' }}>
            <h3 className="text-white font-bold text-lg mb-6 relative inline-block">
              Get In Touch
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-yellow-400 rounded-full"></span>
            </h3>
            <ul className="space-y-4 mt-6">
              <li className="flex items-start space-x-3 group">
                <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Tajpur Rd, Opp. HDFC Bank<br />
                  Guru Ram Das Nagar, Bhamian Khurd<br />
                  Ludhiana, Punjab 141008
                </span>
              </li>
              <li className="flex items-center space-x-3 group">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+917508639613" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm">
                  +91 75086 39613
                </a>
              </li>
              <li className="flex items-center space-x-3 group">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:support.clickinroom@gmail.com" className="text-gray-400 hover:text-yellow-400 transition-colors text-sm break-all">
                  support.clickinroom@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} ClickInRoom. All rights reserved. | Designed with ❤️
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-yellow-400 transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-4 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full shadow-2xl hover:scale-110 hover:shadow-yellow-500/30 transition-all duration-300 z-50 ${
          showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 text-black" />
      </button>
    </footer>
  );
};

export default Footer;
