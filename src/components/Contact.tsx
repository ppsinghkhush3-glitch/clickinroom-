import { useState, useRef, FormEvent } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle, Loader2, ArrowRight, Clock } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

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
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-stone-900 via-zinc-900 to-stone-950"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 right-10 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 left-10 w-60 h-60 bg-yellow-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block mb-4 reveal">
            <span className="px-4 py-2 bg-amber-200/10 border border-amber-200/30 rounded-full text-amber-100 text-sm font-semibold">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 reveal" style={{ transitionDelay: '0.1s' }}>
            <span className="bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 bg-clip-text text-transparent">Let's Transform</span>
            <br />
            <span className="text-stone-100">Your Hotel Business</span>
          </h2>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto reveal" style={{ transitionDelay: '0.15s' }}>Book a free consultation and discover how we can help you achieve your goals</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="reveal" style={{ transitionDelay: '0.2s' }}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/20">
              {submitted ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-12 h-12 text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-100 mb-4">Thank You!</h3>
                  <p className="text-stone-400 max-w-md mx-auto mb-6">We've received your message and will get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-amber-200 hover:text-amber-100 transition-colors text-sm underline underline-offset-4"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-stone-300 mb-2">Your Name *</label>
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
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                    <label className="block text-sm font-medium text-stone-300 mb-2">Message</label>
                    <textarea
                      name="message_content"
                      rows={4}
                      disabled={isSubmitting}
                      placeholder="Tell us about your project..."
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
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="space-y-6 lg:space-y-8 reveal-right" style={{ transitionDelay: '0.3s' }}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/20">
              <h3 className="text-2xl font-bold text-stone-100 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-6 h-6 text-stone-900" />
                  </div>
                  <div>
                    <div className="text-sm text-stone-400 mb-1">Phone</div>
                    <div className="space-y-1">
                      <a href="tel:+917508639613" className="block text-lg font-semibold text-stone-100 hover:text-amber-200 transition-colors">+91 75086 39613</a>
                      <a href="tel:+917710584886" className="block text-lg font-semibold text-stone-100 hover:text-amber-200 transition-colors">+91 77105 84886</a>
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-6 h-6 text-stone-900" />
                  </div>
                  <div>
                    <div className="text-sm text-stone-400 mb-1">Email</div>
                    <a href="mailto:support.clickinroom@gmail.com" className="text-lg font-semibold text-stone-100 hover:text-amber-200 transition-colors break-all">support.clickinroom@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start space-x-4 group hover:translate-x-2 transition-transform duration-200">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-yellow-300 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-6 h-6 text-stone-900" />
                  </div>
                  <div>
                    <div className="text-sm text-stone-400 mb-1">Address</div>
                    <p className="text-lg font-semibold text-stone-100 leading-relaxed">Tajpur Rd, Opp. HDFC Bank<br />Guru Ram Das Nagar, Bhamian Khurd<br />Ludhiana, Punjab 141008</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/20">
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-amber-200" />
                <h3 className="text-2xl font-bold text-stone-100">Business Hours</h3>
              </div>
              <div className="space-y-3 text-stone-300">
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span className="flex items-center">Monday - Friday</span>
                  <span className="text-amber-200 font-semibold">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/10">
                  <span>Saturday</span>
                  <span className="text-amber-200 font-semibold">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between py-3">
                  <span>Sunday</span>
                  <span className="text-stone-500">Closed</span>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 transition-all duration-300 hover:border-white/20">
              <h3 className="text-xl font-bold text-stone-100 mb-3">Free Consultation</h3>
              <p className="text-stone-300 mb-6">Schedule a free 30-minute consultation to discuss your hotel's digital transformation.</p>
              <a href="tel:+917508639613" className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-200 to-yellow-300 text-stone-900 font-bold rounded-lg hover:shadow-2xl hover:shadow-amber-200/20 hover:scale-105 transition-all duration-300 group">
                <span>Call Now</span>
                <Phone className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
