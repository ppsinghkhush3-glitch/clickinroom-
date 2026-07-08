import { useEffect, useRef, useState } from 'react';
import { Award, Users, Globe, TrendingUp } from 'lucide-react';

const CountUp = ({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          const startTime = Date.now();
          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-zinc-900 to-stone-950"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl animate-float-slow"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block mb-4 reveal">
              <span className="px-4 py-2 bg-amber-200/10 border border-amber-200/30 rounded-full text-amber-100 text-sm font-semibold">
                About ClickInRoom
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 reveal" style={{ transitionDelay: '0.1s' }}>
              <span className="text-stone-100">Transforming Hotels Into</span>
              <br />
              <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">
                Digital Success Stories
              </span>
            </h2>

            <p className="text-stone-300 text-lg mb-4 leading-relaxed reveal" style={{ transitionDelay: '0.15s' }}>
              ClickInRoom is a leading hospitality digital solutions provider in India, dedicated to helping hotels grow, perform, and stand out in the digital world. We specialize in hotel marketing, website development, and revenue optimization—delivering smart, result-driven strategies tailored for the hospitality industry.
            </p>

            <p className="text-stone-300 text-lg mb-4 leading-relaxed reveal" style={{ transitionDelay: '0.2s' }}>
              With a perfect blend of advanced technology and deep industry expertise, we help hotels increase their online visibility, drive more direct bookings, and build strong, lasting relationships with guests.
            </p>

            <p className="text-stone-400 mb-6 leading-relaxed reveal" style={{ transitionDelay: '0.25s' }}>
              Having successfully partnered with over 500 hotels across India—from boutique stays to luxury resorts—we are committed to delivering measurable growth and exceptional ROI through data-driven solutions.
            </p>

            <p className="text-stone-400 mb-8 leading-relaxed reveal" style={{ transitionDelay: '0.3s' }}>
              Join us to elevate your hotel and make it truly exceptional.
            </p>

            <div className="grid grid-cols-2 gap-6 reveal-stagger reveal" style={{ transitionDelay: '0.35s' }}>
              <div className="flex items-start space-x-3 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6 text-stone-900" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-100 mb-1">
                    <CountUp end={500} suffix="+" />
                  </div>
                  <div className="text-stone-400 text-sm">Hotels Served</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-stone-900" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-100 mb-1">
                    <CountUp end={50} suffix="+" />
                  </div>
                  <div className="text-stone-400 text-sm">Expert Team</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Globe className="w-6 h-6 text-stone-900" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-100 mb-1">Pan India</div>
                  <div className="text-stone-400 text-sm">Coverage</div>
                </div>
              </div>

              <div className="flex items-start space-x-3 group hover:translate-x-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-stone-900" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-stone-100 mb-1">
                    <CountUp end={300} suffix="%" />
                  </div>
                  <div className="text-stone-400 text-sm">Avg ROI Growth</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative reveal-right" style={{ transitionDelay: '0.2s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
              <img
                src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Luxury Hotel"
                className="w-full h-[600px] object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            {/* Floating Card 1 */}
            <div className="absolute -bottom-8 -left-4 lg:-left-8 bg-stone-900/80 backdrop-blur-md border border-white/10 p-6 rounded-xl max-w-xs animate-float">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-stone-100">Live Project Success</span>
              </div>
              <p className="text-stone-400 text-sm">
                Helping The Oberoi achieve 45% increase in direct bookings
              </p>
            </div>

            {/* Floating Card 2 */}
            <div className="absolute -top-8 -right-4 lg:-right-8 bg-stone-900/80 backdrop-blur-md border border-white/10 p-6 rounded-xl animate-float-slow">
              <div className="text-3xl font-bold bg-gradient-to-r from-amber-200 to-yellow-100 bg-clip-text text-transparent mb-1">98%</div>
              <p className="text-stone-400 text-sm">Client Retention Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
