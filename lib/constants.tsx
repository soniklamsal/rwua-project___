
// Add React import to resolve namespace issues in type definitions
import React from 'react';
import { ImpactStory, ProjectLocation, NewsUpdate } from './types';

export const CORE_VISION = "Establishment of Quality and Equitable and Prosperous Society.";
export const CORE_MISSION = "To transform the community by mobilizing and empowering the target group, improving economic, social and healthy life.";
export const CORE_GOAL = "A dignified life will be built by improving the quality of education healthy life and income of the Community.";

export const OBJECTIVES = [
  "To ensure child rights by protecting and promoting children.",
  "To increase access to basic health and hygiene for the target community.",
  "To improve living standards by increasing participation in income generating activities.",
  "To advocate, empower women, and build networks for community services.",
  "To prepare for and execute emergency and recovery work efficiently.",
  "To create conducive Agroecological based Livelihoods and mitigate climate risk.",
  "To emphasize sustainable development goals with Nepal government policy."
];

export interface OrgMember {
  id: string;
  name: string;
  role: string;
  nepaliName: string;
  quote: React.ReactNode;
  imageUrl: string;
  contactPerson?: string;
  phone?: string;
}

export const ORG_MEMBERS: OrgMember[] = [
  {
    id: 'm1',
    name: 'Goma Devi Neupane',
    nepaliName: 'गोमा देवी न्यौपाने',
    role: 'CHAIRPERSON, RWUA',
    imageUrl: 'https://rwua.com.np/wp-content/uploads/2014/12/goma.jpg',
    contactPerson: 'Bishnu Prasad Chalise',
    phone: '9854035079',
    quote: (
      <>
        ग्रामीण नारी उत्थान संघ हरिपुरले विगत लामो समय देखि ग्रामीण भेगका नागरिकहरुको ज्ञान एवं शिपसाग सम्बन्धित विविध किसिमका सशक्तिकरणको कार्यलाई अगाडि बढाउादै आएको छ । लोकतन्त्रको सम्बद्र्वन र सुशासनको अभिवृद्विका लागि सामाीजक तथा नागरिक समूह एवं संगठनहरुको महत्वपुर्ण भूमिका हुन्छ । प्रजातन्त्रको विकास सगै <span className="bg-blue-700 px-1">जनउत्तरदायी</span> व्यवस्थाको विकासमा बल पुग्ने हुादा यसका अति आवश्यक संयन्त्रहरु र अवलम्बन गरिएका प्रक्रियाहरु जब मजबुत र फलदायी हुदैनन तब सम्म नागरिक तथा सामाजिक संगठनहरुले प्रभाकारी र रचनात्मक भूमिका निर्वाह गर्न सक्दैनन् ।
      </>
    )
  },
  {
    id: 'm2',
    name: 'Bishnu Parshad Chalise',
    nepaliName: 'बिष्णु प्रसाद चालिसे',
    role: 'SECRETARY, RWUA',
    imageUrl: 'https://rwua.com.np/wp-content/uploads/2023/03/Bishnu-chalise-scaled.jpg',
    contactPerson: 'Technical Team',
    phone: '९८५४०३५०७९',
    quote: (
      <>
        हाम्रो अभियान भनेको महिलाहरूलाई आर्थिक र सामाजिक रूपमा सक्षम बनाउनु हो। जबसम्म <span className="bg-blue-700 px-1">महिला नेतृत्व</span> समाजको हरेक तहमा पुग्दैन, तबसम्म वास्तविक विकास सम्भव छैन। हामीले स्थानीय स्रोत र साधनको अधिकतम परिचालन गर्दै समुदायमा सकारात्मक परिवर्तन ल्याउने प्रयास गरिरहेका छौं।
      </>
    )
  },
];

export const SUCCESS_STORIES: ImpactStory[] = [
  {
    id: '1',
    name: 'Leading the Future',
    location: 'Haripur, Sarlahi',
    category: 'Leadership',
    content: 'Mobilizing rural women to take leadership roles in local cooperatives and community governance.',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '2',
    name: 'Sustainable Harvests',
    location: 'Musahar Settlement',
    category: 'Agriculture',
    content: 'Implementing agroecological techniques to build resilience against climate change and disaster risks.',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: '3',
    name: 'Home-Based Education',
    location: 'Sarlahi District',
    category: 'Education',
    content: 'Providing tailored educational support for children with disabilities directly in their homes.',
    imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800',
  }
];

export const PROJECT_LOCATIONS: ProjectLocation[] = [
  { id: 'loc1', name: 'Haripur Municipality', lat: 26.8, lng: 85.5, impactCount: 4500, description: 'Core base for women empowerment and social mobilization.' },
  { id: 'loc2', name: 'Dalit Settlement Area', lat: 26.9, lng: 85.6, impactCount: 1200, description: 'Focused health, hygiene, and emergency recovery outreach.' },
];

export const NEWS_UPDATES: NewsUpdate[] = [
  {
    id: 'n1',
    date: '२०८१ फागुन ३ गते',
    category: 'Education',
    title: 'विद्यालयको पहुँचमा पुग्न नसकेका अपाङ्ग बालबालिकालाई घरमै शिक्षा प्रदान गरिने',
    content: 'Assisting children with disabilities who cannot attend regular schools through home-based learning initiatives.'
  },
  {
    id: 'n2',
    date: '२०८१ माघ ३० गते',
    category: 'Training',
    title: 'LCRC र स्थानीय सरोकारवालाहरु लाइ बाल भेला सञ्चालन तालिम',
    content: 'Two-day training on conducting local level child assemblies for stakeholders and LCRC members.'
  },
  {
    id: 'n3',
    date: '२०७४ माघ २० गते',
    category: 'Welfare',
    title: '४४२ घरधुरीलाई न्यानो कम्बल वितरण',
    content: 'Distributed warm blankets to 442 households in marginalized Dalit and Musahar communities of Haripur.'
  },
  {
    id: 'n4',
    date: '२०८१ माघ १५ गते',
    category: 'Health',
    title: 'स्वास्थ्य शिविर र स्वच्छता कार्यक्रम सञ्चालन',
    content: 'Organized health camps and hygiene awareness programs in rural communities to improve basic health access.'
  },
  {
    id: 'n5',
    date: '२०८१ पुष २५ गते',
    category: 'Livelihood',
    title: 'महिला सशक्तिकरण र आय आर्जन तालिम',
    content: 'Conducted income generation training programs for women to enhance their participation in economic activities.'
  },
  {
    id: 'n6',
    date: '२०८१ पुष १० गते',
    category: 'Agriculture',
    title: 'जलवायु अनुकूल कृषि प्रविधि प्रशिक्षण',
    content: 'Training on climate-resilient agricultural techniques and agroecological practices for sustainable farming.'
  },
  {
    id: 'n7',
    date: '२०८१ मंसिर २० गते',
    category: 'Child Rights',
    title: 'बाल अधिकार संरक्षण र प्रवर्द्धन कार्यक्रम',
    content: 'Programs focused on protecting and promoting child rights through community awareness and advocacy.'
  },
  {
    id: 'n8',
    date: '२०८१ मंसिर ५ गते',
    category: 'Emergency',
    title: 'आपतकालीन प्रतिकार्य तयारी तालिम',
    content: 'Emergency preparedness and disaster response training for community volunteers and local stakeholders.'
  },
  {
    id: 'n9',
    date: '२०८१ कार्तिक २५ गते',
    category: 'Women Empowerment',
    title: 'महिला नेतृत्व विकास कार्यक्रम',
    content: 'Leadership development program empowering women to take active roles in local governance and cooperatives.'
  }
];
