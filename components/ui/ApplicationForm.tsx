'use client';

import { useState, useEffect } from 'react';
import { X, Send, Upload } from 'lucide-react';

interface ApplicationFormProps {
  vacancy: {
    id: string;
    position: string;
    department: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplicationForm({ vacancy, isOpen, onClose }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: '',
    cv: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, cv: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setTimeout(() => {
        onClose();
        setFormData({
          fullName: '',
          email: '',
          message: '',
          cv: null
        });
        setSubmitStatus('idle');
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-hidden">
      <div className="relative p-6 bg-white rounded-xl shadow-lg w-full max-w-md">
        {/* Decorative Background - Smaller */}
        <div className="absolute inset-0 -z-10 transform rotate-3 bg-deep-purple rounded-xl"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        {/* Header - More compact */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3 pr-8">
          <span className="text-blue-600 font-bold">Apply for {vacancy.position}</span>
        </h2>
        <p className="text-sm text-gray-600 mb-4">Please fill out the form below to submit your application.</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="Enter your full name"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="Enter your email address"
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload CV*</label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                required
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className={formData.cv ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.cv ? formData.cv.name : 'Choose CV file (PDF, DOC, DOCX)'}
                </span>
                <Upload className="w-4 h-4 text-gray-400" />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter*</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Tell us why you're interested in this position..."
              rows={3}
              className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 text-white bg-deep-purple rounded-md hover:bg-black transition flex items-center justify-center space-x-2 text-sm font-bold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </>
            )}
          </button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="p-2.5 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-xs font-medium">
                Application submitted successfully! We'll review your application and get back to you soon.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-xs font-medium">
                Failed to submit application. Please try again.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}