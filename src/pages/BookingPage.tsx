import { useState, useEffect, useRef, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Phone, Mail, MapPin, CheckCircle, Loader2, ArrowRight, Calendar, Users, Hotel, Clock, Sparkles, Star, ChevronRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const BookingPage = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      alert('Email config missing. Check Railway Variables.');
      return;
    }
    setIsSubmitting(true);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        formRef.current?.reset();
      }, 5000);
    } catch (error: any) {
      console.error('EmailJS Error:', error);
      alert('Send failed. Please call +91 75086 39613');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (fieldName: string) =>
    `w-full px-4 py-3 bg-white/5 border rounded-lg text-stone-100 placeholder-stone-500 transition-all duration-300 outline-none ${
      focusedField === fieldName
        ? 'border-amber-200/50 ring-2 ring-amber-200/20'
        : 'border-white/10 hover:border-white/20'
    } disabled:opacity-50 disabled:cursor-not-allowed`;

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white min-h-screen">
      <Navigation scrolled={scrolled} />

      {/* Hero Banner */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Hotel Booking" 
            className="w-full h-full object-cover scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-gray-900"></div>
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center mb-6 animate-slide-up">
            <div className="flex items-center px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-amber-400 mr-2" />
              <span className="text-amber-400 text-sm font-semibold tracking-wide uppercase">Book Your Consultation</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slide-up">
            <span className="text-white">Let's Build Your</span>
            <br />
            <span className="bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-200 bg-clip-text text-transparent">Digital Success</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Fill in your details and our team will get back to you within 24 hours with a custom plan tailored for your hotel.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-black"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-10 transition-all duration-300 hover:border-white/20">
                {submitted ? (
                  <div className="text-center py-16 animate-fade-in">
                    <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <CheckCircle className="w-14 h-14 text-green-400" />
                    </div>
                    <h3 className="text-3xl font-bold text-stone-100 mb-4">Thank You!</h3>
                    <p className="text-stone-400 text-lg max-w-md mx-auto mb-8">
                      We've received your booking request and will contact you within 24 hours.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      <button
                        onClick={() => setSubmitted(false)}
                        className="px-6 py-3 bg-gradient-to-r from-amber-200 to-yellow-300 text-stone-900 font-bold rounded-lg hover:shadow-xl transition-all duration-300"
                      >
                        Send Another Request
                      </button>
                      <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/5 transition-all duration-300"
                      >
                        Back to Home
                      </button>
                    </div>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-stone-100 mb-2">Book a Free Consultation</h2>
                      <p className="text-stone-400">Fill out the form and we'll get back to you</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="customer_name"
                          required
                          disabled={isSubmitting}
                          placeholder="John Doe"
                          className={inputClass('name')}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-2">Email Address *</label>
                        <input
                          type="email"
                          name="customer_email"
                          required
                          disabled={isSubmitting}
                          placeholder="john@example.com"
                          className={inputClass('email')}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          name="customer_mobile"
                          required
                          disabled={isSubmitting}
                          placeholder="+91 98765 43210"
                          className={inputClass('phone')}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-2">Hotel Name</label>
                        <input
                          type="text"
                          name="hotel_name"
                          disabled={isSubmitting}
                          placeholder="Your Hotel Name"
                          className={inputClass('hotel')}
                          onFocus={() => setFocusedField('hotel')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-2">Hotel Location</label>
                        <input
                          type="text"
                          name="hotel_location"
                          disabled={isSubmitting}
                          placeholder="City, State"
                          className={inputClass('location')}
                          onFocus={() => setFocusedField('location')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-2">Number of Rooms</label>
                        <select
                          name="room_count"
                          disabled={isSubmitting}
                          defaultValue=""
                          className={`${inputClass('rooms')} appearance-none cursor-pointer bg-[length:12px] bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23a1a1aa%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]`}
                          onFocus={() => setFocusedField('rooms')}
                          onBlur={() => setFocusedField(null)}
                        >
                          <option value="" disabled className="bg-zinc-900">Select room count</option>
                          <option value="1-10" className="bg-zinc-900">1 - 10 Rooms</option>
                          <option value="11-30" className="bg-zinc-900">11 - 30 Rooms</option>
                          <option value="31-50" className="bg-zinc-900">31 - 50 Rooms</option>
                          <option value="51-100" className="bg-zinc-900">51 - 100 Rooms</option>
                          <option value="100+" className="bg-zinc-900">100+ Rooms</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-300 mb-2">Service Interested In *</label>
                      <select
                        name="service_type"
                        required
                        disabled={isSubmitting}
                        defaultValue=""
                        className={`${inputClass('service')} appearance-none cursor-pointer bg-[length:12px] bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23a1a1aa%22%3E%3Cpath%20d%3D%22M7%2010l5%205%205-5z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_12px_center]`}
                        onFocus={() => setFocusedField('service')}
                        onBlur={() => setFocusedField(null)}
                      >
                        <option value="" disabled className="bg-zinc-900">Select a service</option>
                        <option value="Hotel Website Development" className="bg-zinc-900">Hotel Website Development</option>
                        <option value="Hotel SEO" className="bg-zinc-900">Hotel SEO</option>
                        <option value="Hotel Digital Marketing" className="bg-zinc-900">Hotel Digital Marketing</option>
                        <option value="Social Media Marketing" className="bg-zinc-900">Social Media Marketing</option>
                        <option value="Google Business Management" className="bg-zinc-900">Google Business Management</option>
                        <option value="Hotel Photography" className="bg-zinc-900">Hotel Photography</option>
                        <option value="Hotel Booking Engine" className="bg-zinc-900">Hotel Booking Engine</option>
                        <option value="Other Services" className="bg-zinc-900">Other Services</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-stone-300 mb-2">Additional Details</label>
                      <textarea
                        name="message_content"
                        rows={4}
                        disabled={isSubmitting}
                        placeholder="Tell us about your project requirements, timeline, and budget..."
                        className={`${inputClass('message')} resize-none`}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                      />
                    </div>

                    <input type="hidden" name="current_time" value={new Date().toLocaleString()} />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-gradient-to-r from-amber-200 to-yellow-300 text-stone-900 font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-200/20 hover:scale-[1.02] transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 disabled:shadow-none group"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Sending Request...</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-5 h-5" />
                          <span>Book Free Consultation</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/20">
                <h3 className="text-xl font-bold text-stone-100 mb-6 flex items-center">
                  <Clock className="w-5 h-5 text-amber-200 mr-3" />
                  Why Book With Us?
                </h3>
                <ul className="space-y-4">
                  {[
                    { icon: Star, text: 'Free 30-min consultation call' },
                    { icon: Users, text: 'Custom strategy for your hotel' },
                    { icon: Hotel, text: '500+ hotels successfully served' },
                    { icon: Sparkles, text: 'Data-driven marketing approach' },
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-3 group">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <item.icon className="w-5 h-5 text-stone-900" />
                      </div>
                      <p className="text-stone-300 text-sm leading-relaxed pt-2">{item.text}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/20">
                <h3 className="text-xl font-bold text-stone-100 mb-4">Contact Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 group">
                    <Phone className="w-5 h-5 text-amber-200 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <a href="tel:+917508639613" className="text-stone-300 hover:text-amber-200 transition-colors text-sm">+91 75086 39613</a>
                  </div>
                  <div className="flex items-center space-x-3 group">
                    <Mail className="w-5 h-5 text-amber-200 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <a href="mailto:support.clickinroom@gmail.com" className="text-stone-300 hover:text-amber-200 transition-colors text-sm break-all">support.clickinroom@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20 rounded-2xl p-8 text-center">
                <h3 className="text-4xl font-bold text-gradient mb-2">98%</h3>
                <p className="text-stone-300 text-sm mb-4">Client Satisfaction Rate</p>
                <div className="flex items-center justify-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookingPage;
