import { useRef, useState, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Booking = () => {
  const formRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  // ✅ Initialize EmailJS once on mount
  useEffect(() => {
    if (PUBLIC_KEY) emailjs.init(PUBLIC_KEY);
  }, [PUBLIC_KEY]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formRef.current) return;

    // ✅ Guard against missing ENV vars
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      alert('❌ Email config missing. Check Railway Variables.');
      console.error('Missing ENV:', { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY });
      return;
    }

    setIsLoading(true);
    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      alert('✅ Message sent! Check support.clickinroom@gmail.com');
      formRef.current.reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      alert(`❌ Send failed (${error?.text ?? error?.message ?? 'unknown'}). Call +91 75086 39613`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input type="hidden" name="current_time" value={new Date().toLocaleString()} />
      {/* your existing fields */}
    </form>
  );
};

export default Booking;
