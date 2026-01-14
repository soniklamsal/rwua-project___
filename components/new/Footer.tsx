
import React from 'react';

interface FooterProps {
  onNavigate?: (view: 'home' | 'downloads') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-950 text-white pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-8 md:px-16 lg:px-24">
        <div className="grid md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-2">
            <div className="text-4xl font-black text-white mb-8 tracking-tighter">RWUA<span className="text-vibrant-gold">.</span></div>
            <p className="text-stone-400 max-w-sm mb-10 leading-relaxed text-lg">
              Empowering rural communities through sustainable leadership, education, and vocational training since 1998.
            </p>
            <div className="flex gap-6">
              {['FB', 'TW', 'IG', 'LN'].map(s => (
                <div key={s} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-black uppercase hover:bg-vibrant-gold hover:text-stone-950 transition-all cursor-pointer tracking-tighter">
                  {s}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-vibrant-gold font-black uppercase tracking-widest text-xs mb-8">Navigation</h4>
            <ul className="space-y-5 text-stone-500 text-sm font-medium">
              <li onClick={() => onNavigate?.('home')} className="hover:text-vibrant-gold transition-colors cursor-pointer">Success Stories</li>
              <li onClick={() => onNavigate?.('downloads')} className="hover:text-vibrant-gold transition-colors cursor-pointer">Knowledge Hub</li>
              <li onClick={() => onNavigate?.('downloads')} className="hover:text-vibrant-gold transition-colors cursor-pointer">Resource Center</li>
            </ul>
          </div>

          <div>
            <h4 className="text-vibrant-gold font-black uppercase tracking-widest text-xs mb-8">Contact</h4>
            <ul className="space-y-5 text-stone-500 text-sm font-medium">
              <li className="hover:text-vibrant-gold transition-colors cursor-pointer">info@rwua.org</li>
              <li className="hover:text-vibrant-gold transition-colors cursor-pointer">+977-9854035079</li>
              <li className="hover:text-vibrant-gold transition-colors cursor-pointer">Haripur-2, Sarlahi</li>
              <li className="hover:text-vibrant-gold transition-colors cursor-pointer">Madhesh Province, Nepal</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-stone-600 text-xs font-bold uppercase tracking-widest">
          <div>© {new Date().getFullYear()} Rural Women Upliftment Association.</div>
          <div className="flex gap-10">
            <span className="hover:text-vibrant-gold transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-vibrant-gold transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
