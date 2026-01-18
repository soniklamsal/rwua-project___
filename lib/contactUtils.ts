import { Phone, Mail, MapPin, Clock } from 'lucide-react';

// WordPress Contact Post interface
export interface WordPressContactPost {
  id: string;
  title: string;
  slug: string;
  menuOrder: number;
  contactCardFields: {
    label: string;
    value: string;
    link?: string;
    icon: string;
  };
}

// Contact Card interface
export interface ContactCard {
  id: string;
  label: string;
  value: string;
  link?: string;
  icon: string;
  order: number;
}

// Icon mapping function
export function getContactIcon(iconString: string) {
  const iconMap = {
    'phone': Phone,
    'mail': Mail,
    'map-pin': MapPin,
    'clock': Clock,
  };
  
  return iconMap[iconString as keyof typeof iconMap] || Phone;
}

// Transform WordPress contact post to ContactCard format
export function transformToContactCard(post: WordPressContactPost): ContactCard {
  console.log(`🔄 Transforming contact card: "${post.title}"`);
  
  const fields = post.contactCardFields;
  
  const transformed: ContactCard = {
    id: post.slug,
    label: fields?.label || post.title,
    value: fields?.value || '',
    link: fields?.link || undefined,
    icon: fields?.icon || 'phone',
    order: post.menuOrder || 0,
  };
  
  console.log(`✅ Contact card transformed:`, {
    label: transformed.label,
    value: transformed.value,
    icon: transformed.icon,
    order: transformed.order,
    hasLink: !!transformed.link
  });
  
  return transformed;
}