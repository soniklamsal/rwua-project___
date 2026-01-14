'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';

const navLinkStyle = {
  display: 'block',
  position: 'relative' as const,
  color: 'rgba(255, 255, 255, 0.7)',
  transition: '0.3s',
  fontSize: '14px',
  padding: '0 3px',
  fontFamily: '"Open Sans", sans-serif'
};

const middleLinkStyle = {
  display: 'block',
  position: 'relative' as const,
  color: '#444444',
  transition: '0.3s',
  fontSize: '14px',
  padding: '0 3px',
  fontFamily: '"Open Sans", sans-serif'
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNewsDropdownOpen, setIsNewsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  return (
    <>
      {/* Top Purple Bar */}
      <div className="text-white overflow-hidden transition-all duration-500" style={{
        backgroundColor: '#432774',
        color: 'rgba(255, 255, 255, 0.8)',
        height: '40px',
        fontSize: '14px'
      }}>
        <div className="mx-auto px-4" style={{ maxWidth: '1160px' }}>
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-2 sm:gap-6">
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline">✉</span>
                <span className="text-xs sm:text-sm">rwua.haripur@rwua.org</span>
              </div>
              <div className="hidden sm:block">☎ 046-411109</div>
              <div className="hidden md:block">Sun-Fri 10am – 5pm</div>
            </div>
            <a
              href="tel:046-411109"
              className="bg-red-600 hover:bg-red-700 px-2 sm:px-4 py-1 sm:py-1.5 rounded-full flex items-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm"
            >
              <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">046-411109</span>
            </a>
          </div>
        </div>
      </div>

      {/* Yellow Middle Bar - Nepali Links */}
      <div className="border-b border-yellow-400 overflow-x-auto" style={{ backgroundColor: '#fff487' }}>
        <div className="mx-auto px-4" style={{ maxWidth: '1160px' }}>
          <div className="flex justify-start items-center h-10 gap-4 sm:gap-8 text-sm font-medium whitespace-nowrap">
            <a href="#" className="middle-nav-link font-medium transition-colors relative" style={middleLinkStyle}>
              सफलताको कथा
            </a>
            <a href="#" className="middle-nav-link font-medium transition-colors relative" style={middleLinkStyle}>
              फेसबुक बाट लाईभमा समाचार
            </a>
            <a href="#" className="middle-nav-link font-medium transition-colors relative" style={middleLinkStyle}>
              ताजा अपडेट
            </a>
            <a href="#" className="middle-nav-link font-medium transition-colors relative" style={middleLinkStyle}>
              पुराना र नयाँ जानकारी
            </a>
            <a href="#" className="middle-nav-link font-medium transition-colors relative" style={middleLinkStyle}>
              दर्ता नं. ८/५०/५१
            </a>
          </div>
        </div>
      </div>

      {/* Main Purple Navbar */}
      <div className="text-white sticky top-0 shadow-md" style={{
        background: 'rgb(64, 38, 113)',
        transition: 'all 0.5s',
        zIndex: 997,
        padding: '10px 0 5px 0',
        position: 'relative' as const,
        fontSize: '14px'
      }}>
        <div className="mx-auto px-4" style={{ maxWidth: '1160px' }}>
          <div className="flex items-center justify-between" style={{ minHeight: '60px' }}>
            {/* Logo */}
            <Link href="/" className="logo" style={{
              fontSize: '32px',
              margin: 0,
              padding: 0,
              lineHeight: 1,
              fontWeight: 400,
              letterSpacing: '2px',
              textTransform: 'uppercase' as const
            }}>
              <Image
                src="https://rwua.com.np/wp-content/uploads/2023/02/cropped-RWUA-Logo-Approval-2.jpg"
                alt="RWUA Logo"
                width={180}
                height={160}
                className="img-fluid"
                style={{
                  maxHeight: '160px',
                  position: 'absolute' as const,
                  top: 0,
                  zIndex: 1200,
                  maxWidth: '100%',
                  height: 'auto',
                  verticalAlign: 'middle',
                  borderStyle: 'none'
                }}
                priority
              />
            </Link>

            {/* Navigation Menu - Desktop */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link
                href="/"
                className="nav-link font-medium transition-colors relative"
                style={navLinkStyle}
              >
                Home
              </Link>
              <Link
                href="/gallery"
                className="nav-link font-medium transition-colors relative"
                style={navLinkStyle}
              >
                Gallery
              </Link>
              <div className="relative group">
                <button
                  className="nav-link font-medium transition-colors relative flex items-center"
                  style={{ ...navLinkStyle, display: 'flex', alignItems: 'center' }}
                >
                  <span>News & Press</span>
                  <ChevronDown className="w-3 h-3 ml-1 transform rotate-180" />
                </button>
                {/* Dropdown - adjust links as needed */}
                <div className="absolute left-0 mt-2 w-48 bg-purple-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link href="/news" className="block px-4 py-2 hover:bg-purple-700">
                    News
                  </Link>
                  <Link href="/press" className="block px-4 py-2 hover:bg-purple-700">
                    Press Releases
                  </Link>
                </div>
              </div>
              <Link
                href="/success-story"
                className="nav-link font-medium transition-colors relative"
                style={navLinkStyle}
              >
                Success Story
              </Link>
              <Link
                href="/vacancy"
                className="nav-link font-medium transition-colors relative"
                style={navLinkStyle}
              >
                All Vacancy
              </Link>
              <Link
                href="/contact"
                className="nav-link font-medium transition-colors relative"
                style={navLinkStyle}
              >
                Contact Us
              </Link>
              <Link
                href="/downloads"
                className="nav-link font-medium transition-colors relative"
                style={navLinkStyle}
              >
                Downloads
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-purple-800 border-t border-purple-700">
          <div className="px-4 py-2 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-white hover:bg-purple-700 rounded-md transition-colors text-right"
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/gallery"
              className="block px-3 py-2 text-white hover:bg-purple-700 rounded-md transition-colors text-right"
              onClick={closeMobileMenu}
            >
              Gallery
            </Link>

            {/* News & Press Dropdown for Mobile */}
            <div>
              <button
                className="w-full flex items-center justify-end px-3 py-2 text-white hover:bg-purple-700 rounded-md transition-colors"
                onClick={() => setIsNewsDropdownOpen(!isNewsDropdownOpen)}
              >
                <span>News & Press</span>
                <ChevronDown className={`w-4 h-4 ml-2 transform transition-transform ${isNewsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isNewsDropdownOpen && (
                <div className="mr-4 mt-1 space-y-1">
                  <Link
                    href="/news"
                    className="block px-3 py-2 text-white hover:bg-purple-700 rounded-md transition-colors text-right"
                    onClick={closeMobileMenu}
                  >
                    News
                  </Link>
                  <Link
                    href="/press"
                    className="block px-3 py-2 text-white hover:bg-purple-700 rounded-md transition-colors text-right"
                    onClick={closeMobileMenu}
                  >
                    Press Releases
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/success-story"
              className="block px-3 py-2 text-white hover:bg-purple-700 rounded-md transition-colors text-right"
              onClick={closeMobileMenu}
            >
              Success Story
            </Link>
            <Link
              href="/vacancy"
              className="block px-3 py-2 text-white hover:bg-purple-700 rounded-md transition-colors text-right"
              onClick={closeMobileMenu}
            >
              All Vacancy
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 text-white hover:bg-purple-700 rounded-md transition-colors text-right"
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
            <Link
              href="/downloads"
              className="block px-3 py-2 text-white hover:bg-purple-700 rounded-md transition-colors text-right"
              onClick={closeMobileMenu}
            >
              Downloads
            </Link>
          </div>
        </div>
      )}
    </>
  );
}