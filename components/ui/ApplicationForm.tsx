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
    setSubmitStatus('idle');

    try {
      console.log('🔍 Starting application submission...');
      console.log('Form data:', {
        fullName: formData.fullName,
        email: formData.email,
        message: formData.message,
        cvFile: formData.cv?.name || 'No CV',
        vacancy: vacancy
      });

      // Create FormData for file upload
      const submitFormData = new FormData();
      submitFormData.append('fullName', formData.fullName);
      submitFormData.append('email', formData.email);
      submitFormData.append('message', formData.message);
      submitFormData.append('vacancyId', vacancy.id);
      submitFormData.append('vacancyPosition', vacancy.position);
      submitFormData.append('vacancyDepartment', vacancy.department);
      
      if (formData.cv) {
        submitFormData.append('cv', formData.cv);
        console.log('✅ CV file attached:', formData.cv.name);
      } else {
        console.log('⚠️ No CV file attached');
      }

      console.log('📤 Sending request to /api/apply...');

      const response = await fetch('/api/apply', {
        method: 'POST',
        body: submitFormData
      });

      console.log('📥 Response status:', response.status);
      const result = await response.json();
      console.log('📥 Application API Response:', result);
      
      if (response.ok && result.success === true) {
        console.log('✅ Job application submitted successfully:', result);
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
        }, 3000);
      } else {
        console.error('❌ Job application submission failed:', result);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('💥 Network error submitting job application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      // Keep error message visible longer
      if (submitStatus === 'error') {
        setTimeout(() => setSubmitStatus('idle'), 8000);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-hidden">
      <div className="relative p-6 bg-white rounded-xl shadow-lg w-full max-w-md">
        {/* Decorative Background - Smaller */}
        <div className="absolute inset-0 -z-10 transform rotate-3 bg-core-blue rounded-xl"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        {/* Header - More compact */}
        <h2 className="text-lg font-semibold text-gray-800 mb-3 pr-8">
          <span className="text-core-blue font-bold">Apply for {vacancy.position}</span>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload CV</label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 outline-none text-sm cursor-pointer flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className={formData.cv ? 'text-gray-900' : 'text-gray-500'}>
                  {formData.cv ? formData.cv.name : 'Choose CV file (PDF, DOC, DOCX) - Optional'}
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
            className={`w-full py-2.5 text-white bg-core-blue rounded-md hover:bg-core-blue-light transition-all duration-300 flex items-center justify-center space-x-2 text-sm font-bold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
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
                ✅ Application submitted successfully! Your application has been added to our system and we'll review it soon.
              </p>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-xs font-medium">
                ❌ Failed to submit application. The application could not be added to our system. Please try again or contact us directly.
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
