import {
  Globe,
  Search,
  TrendingUp,
  Share2,
  MapPin,
  ClipboardCheck,
  Settings,
  Hotel,
  Camera,
  Users,
  Star,
  CreditCard,
} from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: 'Hotel Website Development',
      description: 'Custom-built, responsive websites that convert visitors into guests with stunning design and seamless booking integration.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Search,
      title: 'Hotel SEO',
      description: 'Dominate search rankings with our proven SEO strategies tailored for the hospitality industry.',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: TrendingUp,
      title: 'Hotel Digital Marketing',
      description: 'Comprehensive digital marketing campaigns that drive bookings and maximize your online revenue.',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: Share2,
      title: 'Social Media Marketing',
      description: 'Engage your audience and build brand loyalty with captivating social media campaigns.',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: MapPin,
      title: 'Google Business Management',
      description: 'Optimize your Google Business Profile to attract more local guests and improve visibility.',
      gradient: 'from-yellow-500 to-amber-500',
    },
    {
      icon: ClipboardCheck,
      title: 'Hotel Audit Express',
      description: 'Comprehensive analysis of your hotel\'s digital presence with actionable improvement strategies.',
      gradient: 'from-teal-500 to-cyan-500',
    },
    {
      icon: Settings,
      title: 'OTA Setup',
      description: 'Complete setup and optimization across major OTAs including Booking.com, Agoda, and Expedia.',
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Hotel,
      title: 'Google Hotels Listing',
      description: 'Get your property featured on Google Hotels with optimized listings that drive direct bookings.',
      gradient: 'from-rose-500 to-pink-500',
    },
    {
      icon: Camera,
      title: 'Hotel Photography',
      description: 'Professional photography that showcases your property in the best light and increases bookings.',
      gradient: 'from-fuchsia-500 to-pink-500',
    },
    {
      icon: Users,
      title: 'Influencer Marketing',
      description: 'Partner with top travel influencers to expand your reach and attract new demographics.',
      gradient: 'from-emerald-500 to-green-500',
    },
    {
      icon: Star,
      title: 'Reputation Management',
      description: 'Monitor and improve your online reputation across review platforms with our expert team.',
      gradient: 'from-amber-500 to-yellow-500',
    },
    {
      icon: CreditCard,
      title: 'Hotel Booking Engine',
      description: 'Powerful, commission-free booking engine that integrates seamlessly with your website.',
      gradient: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-800"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-40 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float-slow"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4 reveal">
            <span className="px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-semibold">
              Our Services
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 reveal" style={{ transitionDelay: '0.1s' }}>
            <span className="text-gradient">Comprehensive Solutions</span>
            <br />
            <span className="text-white">For Every Hotel Need</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto reveal" style={{ transitionDelay: '0.15s' }}>
            From digital marketing to luxury hospitality services, we provide end-to-end solutions
            that drive growth and elevate guest experiences
          </p>
        </div>

        <div className="reveal-stagger reveal" style={{ transitionDelay: '0.2s' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card group glass-morphism rounded-xl p-6 hover:scale-[1.03] hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-500 cursor-pointer"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {service.description}
                </p>

                <div className="flex items-center justify-end pt-4 border-t border-gray-700/50 group-hover:border-yellow-400/20 transition-colors">
                  <a href="#contact" className="text-sm text-gray-400 hover:text-yellow-400 transition-colors flex items-center">
                    Contact Us for More
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12 reveal" style={{ transitionDelay: '0.4s' }}>
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-gradient-to-r from-yellow-400 to-amber-600 text-black font-bold rounded-lg hover:shadow-2xl hover:shadow-yellow-500/25 hover:scale-105 transition-all duration-300"
          >
            Get Custom Package Quote
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
