'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    needQuickReply: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '', needQuickReply: false });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="w-16 h-[2px] bg-terracotta"></span>
            <span className="text-terracotta font-black uppercase tracking-[0.6em] text-[10px]">Get In Touch</span>
            <span className="w-16 h-[2px] bg-terracotta"></span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-deep-purple mb-6 tracking-tight">
            Let&apos;s Work<br />
            <span className="text-vibrant-gold font-serif-impact italic">Together</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-2xl mx-auto font-medium">
            Connect with RWUA Nepal. We&apos;re here to help and answer any questions about our programs and services.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left Side - Map */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* Google Map */}
                <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14234.270607823926!2d85.0985!3d26.8467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ec7d8b0f4a5c85%3A0x7b2b0a0a0a0a0a0a!2sHaripur%2C%20Nepal!5e0!3m2!1sen!2sus!4v1619524992238!5m2!1sen!2sus"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="rounded-2xl"
                  ></iframe>
                </div>

                {/* Location Pin */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-md">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-terracotta rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-deep-purple">We are here</span>
                  </div>
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 hover:shadow-md hover:border-vibrant-gold/20 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center">
                      <Phone className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500 uppercase tracking-wide font-black">Phone</p>
                      <p className="font-bold text-deep-purple">046-411109</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 hover:shadow-md hover:border-vibrant-gold/20 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500 uppercase tracking-wide font-black">Email</p>
                      <p className="font-bold text-deep-purple">info@rwua.org</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 hover:shadow-md hover:border-vibrant-gold/20 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500 uppercase tracking-wide font-black">Address</p>
                      <p className="font-bold text-deep-purple">Haripur, Nepal</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 hover:shadow-md hover:border-vibrant-gold/20 transition-all">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-black/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-black" />
                    </div>
                    <div>
                      <p className="text-sm text-stone-500 uppercase tracking-wide font-black">Hours</p>
                      <p className="font-bold text-deep-purple">10AM - 5PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div className="order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-4 border-0 border-b-2 border-stone-200 bg-transparent text-lg placeholder-stone-400 focus:border-deep-purple focus:outline-none transition-colors font-medium"
                    placeholder="Your Name"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-4 border-0 border-b-2 border-stone-200 bg-transparent text-lg placeholder-stone-400 focus:border-deep-purple focus:outline-none transition-colors font-medium"
                    placeholder="Your e-Mail"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-4 border-0 border-b-2 border-stone-200 bg-transparent text-lg placeholder-stone-400 focus:border-deep-purple focus:outline-none transition-colors resize-none font-medium"
                    placeholder="Your message to us"
                  />
                </div>

                {/* Quick Reply Checkbox */}
                <div className="flex items-center space-x-3 py-4">
                  <input
                    type="checkbox"
                    name="needQuickReply"
                    id="needQuickReply"
                    checked={formData.needQuickReply}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-deep-purple bg-stone-100 border-stone-300 rounded focus:ring-indigo-200 focus:ring-2"
                  />
                  <label htmlFor="needQuickReply" className="text-stone-700 font-bold cursor-pointer">
                    I need a quick reply
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 text-white bg-deep-purple rounded-2xl hover:bg-black transition-all flex items-center justify-center space-x-3 group font-black uppercase tracking-[0.3em] text-sm shadow-[0_30px_70px_-15px_rgba(76,29,149,0.35)] hover:scale-105 active:scale-95 ${isSubmitting ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                    }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send the message</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="p-4 bg-vibrant-gold/10 border border-vibrant-gold/20 rounded-2xl">
                    <p className="text-vibrant-gold text-sm font-bold">Message sent successfully! We&apos;ll get back to you soon.</p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="p-4 bg-terracotta/10 border border-terracotta/20 rounded-2xl">
                    <p className="text-terracotta text-sm font-bold">Failed to send message. Please try again.</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}