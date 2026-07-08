import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonials = [
    {
      name: "Rahul Gupta",
      role: "Owner, Jaipur Heritage Hotel",
      rating: 5,
      text: "ClickInRoom helped us increase our direct bookings within a few months. Their team understands the Indian hotel market very well.",
    },
    {
      name: "Anita Kapoor",
      role: "Manager, Goa Beach Stay",
      rating: 5,
      text: "Our new website looks amazing and works perfectly for bookings. We are getting more guests directly from Google.",
    },
    {
      name: "Sandeep Malhotra",
      role: "Director, Delhi City Hotel",
      rating: 5,
      text: "Professional team with great digital marketing skills. Our hotel visibility online has improved a lot.",
    },
    {
      name: "Vikas Sharma",
      role: "Owner, Shimla Mountain Retreat",
      rating: 5,
      text: "They helped us reduce OTA dependency and get more direct bookings from our website.",
    },
    {
      name: "Neha Patel",
      role: "Marketing Head, Ahmedabad Boutique Hotel",
      rating: 5,
      text: "Their SEO and marketing strategies helped our hotel appear higher in search results and attract more guests.",
    },
  ];

  const nextSlide = useCallback(() => {
    setSlideDirection("right");
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setSlideDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, []);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, nextSlide]);

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-black to-gray-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-80 h-80 bg-yellow-500/5 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-1/4 w-60 h-60 bg-amber-500/5 rounded-full blur-3xl animate-float-slow"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 reveal">
            <span className="px-4 py-2 bg-yellow-400/10 border border-yellow-400/30 rounded-full text-yellow-400 text-sm font-semibold">
              Client Reviews
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6 reveal" style={{ transitionDelay: '0.1s' }}>
            <span className="text-white">Trusted by</span>
            <br />
            <span className="text-gradient">Hotels Across India</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto reveal" style={{ transitionDelay: '0.15s' }}>
            Real feedback from hotel owners and managers we work with
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto reveal" style={{ transitionDelay: '0.2s' }}>
          <div 
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="glass-morphism rounded-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Background shimmer */}
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-transparent"></div>
              
              <div
                key={currentIndex}
                className="animate-fade-in"
              >
                <Quote className="w-12 h-12 md:w-16 md:h-16 text-yellow-400/20 mb-6" />

                <div className="flex items-center mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed italic font-light">
                  &ldquo;{testimonials[currentIndex].text}&rdquo;
                </p>

                <div className="flex items-center space-x-4">
                  {/* Avatar placeholder */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center text-white font-bold text-xl">
                    {testimonials[currentIndex].name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-white">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevSlide}
              className="p-3 glass-morphism rounded-full hover:bg-yellow-400/20 transition-all group"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
            </button>

            <div className="flex items-center space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSlideDirection(index > currentIndex ? "right" : "left");
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    index === currentIndex
                      ? "w-8 bg-yellow-400 shadow-lg shadow-yellow-400/50"
                      : "w-2 bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 glass-morphism rounded-full hover:bg-yellow-400/20 transition-all group"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-yellow-400 transition-colors" />
            </button>
          </div>
          
          {/* Auto-play indicator */}
          <div className="text-center mt-4">
            <span className="text-xs text-gray-500 flex items-center justify-center">
              <Sparkles className="w-3 h-3 mr-1" />
              {isPaused ? 'Paused' : 'Auto-rotating'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto reveal" style={{ transitionDelay: '0.3s' }}>
          <div className="text-center group">
            <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">200+</div>
            <div className="text-gray-400">Hotels Served</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">95%</div>
            <div className="text-gray-400">Client Satisfaction</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">500+</div>
            <div className="text-gray-400">Projects Delivered</div>
          </div>
          <div className="text-center group">
            <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
