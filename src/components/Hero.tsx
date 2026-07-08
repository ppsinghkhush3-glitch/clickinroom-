import { useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, TrendingUp, Headphones, Star } from 'lucide-react';

const Hero = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax effect on background
    const handleParallax = () => {
      if (bgRef.current) {
        const scrollY = window.scrollY;
        bgRef.current.style.transform = `translateY(${scrollY * 0.35}px)`;
      }
    };

    window.addEventListener('scroll', handleParallax, { passive: true });

    // Stats reveal observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const statsEl = statsRef.current;
    if (statsEl) observer.observe(statsEl);

    return () => {
      window.removeEventListener('scroll', handleParallax);
      if (statsEl) observer.unobserve(statsEl);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Layer with Parallax */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <img 
          src="https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="Luxury Hotel Lobby" 
          className="w-full h-full object-cover scale-110"
          style={{ willChange: 'transform' }}
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-gray-900"></div>
        
        {/* Decorative patterns */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #fff 1px, transparent 1px), radial-gradient(circle at 75% 75%, #fff 1px, transparent 1px)', backgroundSize: '60px 60px, 80px 80px' }}></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl animate-float-slow"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-32">
        
        {/* Badge */}
        <div className="inline-flex items-center mb-8 animate-slide-up">
          <div className="flex items-center px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-sm hover:bg-yellow-500/20 transition-colors">
            <Sparkles className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-yellow-400 text-sm font-semibold tracking-wide uppercase">Premium Hospitality Solutions</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight tracking-tight animate-slide-up">
          <span className="text-white">Your Hotel, Now</span>
          <br />
          <span className="gradient-text">
            Trending Everywhere
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light animate-slide-up">
          We combine beautiful design with smart strategies to help your hotel get more direct bookings, better guest experiences, and higher revenue.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-slide-up">
          <a
            href="#contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-black font-bold rounded-lg shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 transform hover:-translate-y-1 transition-all duration-300"
          >
            <span>Start Your Journey</span>
            <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
          </a>
          <a
            href="#services"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-transparent border border-gray-500 text-white font-semibold rounded-lg hover:bg-white/5 hover:border-yellow-400/50 transition-all duration-300"
          >
            View Our Services
          </a>
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto reveal" style={{ transitionDelay: '0.2s' }}>
          {/* Stat 1 */}
          <div className="group p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-yellow-500/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center justify-center mb-3">
               <TrendingUp className="w-6 h-6 text-yellow-400 mr-2 group-hover:scale-110 transition-transform duration-300" />
               <span className="text-4xl font-bold text-white">500+</span>
            </div>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Hotels Optimized</p>
          </div>

          {/* Stat 2 */}
          <div className="group p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-yellow-500/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center justify-center mb-3">
               <Star className="w-6 h-6 text-yellow-400 mr-2 group-hover:scale-110 transition-transform duration-300" />
               <span className="text-4xl font-bold text-white">98%</span>
            </div>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Client Retention</p>
          </div>

          {/* Stat 3 */}
          <div className="group p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md hover:border-yellow-500/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
            <div className="flex items-center justify-center mb-3">
               <Headphones className="w-6 h-6 text-yellow-400 mr-2 group-hover:scale-110 transition-transform duration-300" />
               <span className="text-4xl font-bold text-white">24/7</span>
            </div>
            <p className="text-gray-400 text-sm uppercase tracking-wider">Dedicated Support</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <a href="#about" className="flex flex-col items-center text-gray-400 hover:text-yellow-400 transition-colors group">
          <span className="text-xs uppercase tracking-widest mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">Scroll</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
