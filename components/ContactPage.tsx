'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

// Floating Label Input Component
interface FloatingInputProps {
    id: string;
    label: string;
    type?: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
}

function FloatingInput({ id, label, type = 'text', required = false, value, onChange }: FloatingInputProps) {
    return (
        <div className="input-group relative">
            <input
                id={id}
                type={type}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="input w-full border-2 border-gray-400 rounded-2xl bg-transparent px-4 py-4 text-base text-gray-100 transition-all duration-150 ease-out focus:outline-none focus:border-blue-500 valid:border-blue-500"
            />
            <label
                htmlFor={id}
                className="user-label absolute left-4 text-gray-300 pointer-events-none transform translate-y-4 transition-all duration-150 ease-out"
            >
                {label}
            </label>
            <style jsx>{`
        .input:focus ~ .user-label,
        .input:valid ~ .user-label {
          transform: translateY(-50%) scale(0.8);
          background-color: #1f2937;
          padding: 0 0.5rem;
          color: #3b82f6;
        }
      `}</style>
        </div>
    );
}

// Floating Label Textarea Component
interface FloatingTextareaProps {
    id: string;
    label: string;
    required?: boolean;
    value: string;
    onChange: (value: string) => void;
    rows?: number;
}

function FloatingTextarea({ id, label, required = false, value, onChange, rows = 4 }: FloatingTextareaProps) {
    return (
        <div className="input-group relative">
            <textarea
                id={id}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                rows={rows}
                className="input w-full border-2 border-gray-400 rounded-2xl bg-transparent px-4 py-4 text-base text-gray-100 transition-all duration-150 ease-out focus:outline-none focus:border-blue-500 valid:border-blue-500 resize-none"
            />
            <label
                htmlFor={id}
                className="user-label absolute left-4 text-gray-300 pointer-events-none transform translate-y-4 transition-all duration-150 ease-out"
            >
                {label}
            </label>
            <style jsx>{`
        .input:focus ~ .user-label,
        .input:valid ~ .user-label {
          transform: translateY(-50%) scale(0.8);
          background-color: #1f2937;
          padding: 0 0.5rem;
          color: #3b82f6;
        }
      `}</style>
        </div>
    );
}

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Breadcrumb Section */}
            <section className="py-4 px-0 bg-[#ecf6fe] pt-[15px]">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-end">
                        <nav className="flex items-center text-sm text-gray-600 font-sans">
                            <Link href="/" className="hover:text-purple-800 flex items-center">
                                <Home className="w-4 h-4 mr-1" />
                                मुख्य पृष्ठ
                            </Link>
                            <span className="mx-2">/</span>
                            <span className="text-gray-600 font-medium">Contact Us</span>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Get In <span className="text-blue-400">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
                            <div className="space-y-6">
                                {/* Address */}
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">Address</h3>
                                        <p className="text-gray-300">
                                            Haripur Municipality-2, Sarlahi<br />
                                            Nepal
                                        </p>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">Phone</h3>
                                        <p className="text-gray-300">046-411109</p>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                                        <p className="text-gray-300">rwua.haripur@rwua.org</p>
                                    </div>
                                </div>

                                {/* Office Hours */}
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
                                            <Clock className="w-6 h-6 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-1">Office Hours</h3>
                                        <p className="text-gray-300">
                                            Sunday - Friday: 10:00 AM - 5:00 PM<br />
                                            Saturday: Closed
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map or Additional Info */}
                        <div className="bg-gray-800 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold text-white mb-4">About RWUA</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Rural Women Upliftment Association (RWUA) is dedicated to empowering rural women and communities
                                through various development programs, education initiatives, and social welfare activities.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-gray-800 rounded-3xl p-8 shadow-2xl">
                        <h2 className="text-3xl font-bold text-white mb-8">Send us a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <FloatingInput
                                id="name"
                                label="Full Name"
                                required
                                value={formData.name}
                                onChange={(value) => setFormData({ ...formData, name: value })}
                            />

                            {/* Email */}
                            <FloatingInput
                                id="email"
                                label="Email Address"
                                type="email"
                                required
                                value={formData.email}
                                onChange={(value) => setFormData({ ...formData, email: value })}
                            />

                            {/* Phone */}
                            <FloatingInput
                                id="phone"
                                label="Phone Number"
                                type="tel"
                                value={formData.phone}
                                onChange={(value) => setFormData({ ...formData, phone: value })}
                            />

                            {/* Subject */}
                            <FloatingInput
                                id="subject"
                                label="Subject"
                                required
                                value={formData.subject}
                                onChange={(value) => setFormData({ ...formData, subject: value })}
                            />

                            {/* Message */}
                            <FloatingTextarea
                                id="message"
                                label="Your Message"
                                required
                                rows={5}
                                value={formData.message}
                                onChange={(value) => setFormData({ ...formData, message: value })}
                            />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
                            >
                                <Send className="w-5 h-5" />
                                <span>Send Message</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}