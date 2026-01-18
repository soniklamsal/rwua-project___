'use client';

import { ContactCard, getContactIcon } from '@/lib/contactUtils';

interface ContactCardProps {
  card: ContactCard;
}

export default function ContactCardComponent({ card }: ContactCardProps) {
  const IconComponent = getContactIcon(card.icon);
  
  const CardContent = () => (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-stone-200 hover:shadow-md hover:border-impact-red/20 transition-all">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-core-blue/10 rounded-lg flex items-center justify-center">
          <IconComponent className="w-4 h-4 text-core-blue" />
        </div>
        <div>
          <p className="text-sm text-stone-500 uppercase tracking-wide font-black">{card.label}</p>
          <p className="font-bold text-core-blue truncate min-w-0">{card.value}</p>
        </div>
      </div>
    </div>
  );

  // If there's a link, wrap in an anchor tag
  if (card.link) {
    return (
      <a 
        href={card.link} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block hover:scale-105 transition-transform"
      >
        <CardContent />
      </a>
    );
  }

  // Otherwise, just return the card
  return <CardContent />;
}