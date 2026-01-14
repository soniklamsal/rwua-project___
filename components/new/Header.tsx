
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onNavigate: (view: 'home' | 'downloads') => void;
  currentView: 'home' | 'downloads';
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (currentView !== 'home') {
      onNavigate('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled || currentView === 'downloads' ? 'bg-deep-purple/95 backdrop-blur-md py-4 shadow-2xl' : 'bg-transparent py-7'
    }`}>
      <div className="container mx-auto px-8 md:px-16 lg:px-24 flex items-center justify-between">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-4 group"
        >
          <div className="text-3xl font-black text-white tracking-tighter transition-all group-hover:scale-105">
            RWUA<span className="text-vibrant-gold">.</span>
          </div>
          <div className="hidden lg:block h-10 w-[1px] bg-white/20 mx-2"></div>
          <div className="hidden lg:block text-[10px] font-nepali text-white/90 text-left leading-tight uppercase tracking-widest font-bold">
            ग्रामीण नारी उत्थान संघ<br/>हरिपुर, सर्लाही
          </div>
        </button>
        
        <div className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => onNavigate('home')}
            className={`${currentView === 'home' ? 'text-vibrant-gold' : 'text-white/80'} hover:text-vibrant-gold font-black text-[10px] uppercase tracking-[0.2em] transition-all relative group`}
          >
            Overview
            {currentView === 'home' && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-vibrant-gold transition-all"></span>}
          </button>

          <button 
            onClick={() => scrollToSection('stories')}
            className="text-white/80 hover:text-vibrant-gold font-black text-[10px] uppercase tracking-[0.2em] transition-all relative group"
          >
            Impact Stories
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-vibrant-gold transition-all group-hover:w-full"></span>
          </button>
          
          <button 
            onClick={() => onNavigate('downloads')}
            className={`${currentView === 'downloads' ? 'text-vibrant-gold' : 'text-white/80'} hover:text-vibrant-gold font-black text-[10px] uppercase tracking-[0.2em] transition-all relative group`}
          >
            Knowledge Hub
            {currentView === 'downloads' && <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-vibrant-gold transition-all"></span>}
          </button>
        </div>

        <button className="bg-vibrant-gold hover:bg-white text-stone-950 font-black py-3 px-8 rounded-full transition-all text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 shadow-xl">
          Donate
        </button>
      </div>
    </nav>
  );
};
