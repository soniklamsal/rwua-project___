'use client';

import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  Twitter,
  Youtube,
  Facebook,
  Heart,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="text-white" style={{
      background: '#0F172A',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Organization Info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">RWUA</h2>
            <p className="text-gray-300 leading-relaxed">
              ग्रामीण नारी उत्थान संघ हरिपुरले २०५०/५१ सालदेखि विपन्न समुदाय र ग्रामीण भेगका नागरिकहरुको सशक्तिकरण एवं शिक्षण सम्बन्धि कार्यक्रमहरू सञ्चालन गर्दै आएको छ।
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-white transition duration-300 flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-white transition duration-300 flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition duration-300 flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  News & Press
                </Link>
              </li>
              <li>
                <Link href="/success-story" className="hover:text-white transition duration-300 flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition duration-300 flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Programs */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Our Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/news" className="hover:text-white transition duration-300 flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Women Empowerment
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition duration-300 flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Skill Development
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition duration-300 flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Community Support
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition duration-300 flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Education Programs
                </Link>
              </li>
              <li>
                <Link href="/vacancy" className="hover:text-white transition duration-300 flex items-center group">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  Career Opportunities
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mt-1 mr-3 text-blue-400 flex-shrink-0" />
                <span className="text-sm">
                  Haripur Municipality-2<br />
                  Sarlahi, Nepal
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                <a href="tel:046-411109" className="text-sm hover:text-white transition duration-300">
                  046-411109
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-blue-400 flex-shrink-0" />
                <a href="mailto:rwua.haripur@rwua.org" className="text-sm hover:text-white transition duration-300">
                  rwua.haripur@rwua.org
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="text-lg font-medium text-white mb-3">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-3">
                हाम्रा नवीनतम कार्यक्रमहरूको जानकारी पाउनुहोस्
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-r-lg text-white font-medium transition duration-300 flex items-center"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm">
                &copy; 2025 Rural Women Upliftment Association (RWUA). All rights reserved.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Registration No: ८/५०/५१ | Made with <Heart className="inline w-3 h-3 text-red-400 mx-1" /> by Sarbatra Inc
              </p>
            </div>
            <div className="flex space-x-6">
              <Link href="#" className="text-gray-400 hover:text-white transition duration-300 text-sm">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition duration-300 text-sm">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition duration-300 text-sm">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}