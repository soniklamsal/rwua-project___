// Modern data models for RWUA website

export interface SuccessStory {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  date: string;
  tags: string[];
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  author: string;
  image: string;
  date: string;
  tags: string[];
  excerpt: string;
}

export interface Vacancy {
  id: string;
  position: string;
  description: string;
  department: string;
  deadline: string;
  location: string;
  tags: string[];
  image?: string;
  status: 'open' | 'closed';
}

// Success Stories Data
export const successStories: SuccessStory[] = [
  {
    id: '1',
    title: 'Empowering Women in Rural Nepal',
    description: 'In the remote villages of Nepal, women have faced many challenges, from lack of education to limited job opportunities in rural Nepal.\n\nOur program provided training and resources to help women challenges, from lack of education to limited job opportunities. Our program provided training and resources to help women develop sustainable businesses. Through workshops and mentorship, these women learned new skills, from handicrafts to agriculture, transforming their communities.\n\nOne such success story is Maya, who started her own tailoring shop with our support. She now employs other women and has become a role model in her village.',
    category: 'Success Story',
    author: 'RWUA Nepal',
    image: '/images/success1.jpg',
    date: '2025-07-20',
    tags: ['women', 'empowerment', 'rural', 'entrepreneurship']
  },
  {
    id: '2',
    title: 'Overcoming Barriers to Education',
    description: 'Education is the foundation of progress, yet many children in rural Nepal face significant barriers to accessing quality schooling. Distance, poverty, and cultural barriers often prevent children from attending school regularly.\n\nThrough our community education program, we established learning centers in remote villages and provided scholarships to underprivileged children. We also worked with parents to understand the importance of education for both boys and girls.\n\nToday, school enrollment in our target communities has increased by 85%, and dropout rates have decreased significantly. Children like Ramesh, who once worked in fields, are now pursuing higher education and dreaming of becoming teachers and doctors.',
    category: 'Success Story',
    author: 'RWUA Nepal',
    image: '/images/success2.jpg',
    date: '2025-06-15',
    tags: ['education', 'children', 'community', 'development']
  },
  {
    id: '3',
    title: 'Small Farms, Big Dreams',
    description: 'Agriculture remains the backbone of Nepal\'s economy, yet many small-scale farmers struggle with traditional farming methods, lack of resources, and market access challenges.\n\nOur agricultural development program introduced modern farming techniques, provided quality seeds and tools, and established direct market linkages for farmers. We organized farmer groups and provided training on sustainable farming practices.\n\nFarmer Sita Devi from Sarlahi district increased her crop yield by 200% after implementing our recommended techniques. She now grows organic vegetables and sells them directly to urban markets, earning three times more than before. Her success has inspired 50 other farmers in her village to adopt similar practices.',
    category: 'Success Story',
    author: 'RWUA Nepal',
    image: '/images/success1.jpg',
    date: '2025-05-10',
    tags: ['agriculture', 'farmers', 'economic', 'development']
  },
  {
    id: '4',
    title: 'Health & Wellness Initiative',
    description: 'Access to healthcare remains a critical challenge in rural Nepal, where the nearest health facility can be hours away on foot. Maternal and child mortality rates were alarmingly high in our target communities.\n\nWe established community health posts and trained local women as health volunteers. These volunteers provide basic healthcare services, conduct health awareness programs, and refer serious cases to nearby hospitals. We also organized regular health camps and vaccination drives.\n\nAs a result, maternal mortality in our program areas has decreased by 60%, and child immunization rates have reached 95%. Community health volunteer Kamala has personally helped deliver over 100 babies safely and has become a trusted healthcare provider in her community.',
    category: 'Success Story',
    author: 'RWUA Nepal',
    image: '/images/success2.jpg',
    date: '2025-04-25',
    tags: ['health', 'community', 'maternal', 'wellness']
  }
];

// News Articles Data
export const newsArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'हरिपुरका बिपन्न घरपरिवारलाई न्यानो कम्बल वितरण कार्यक्रम',
    excerpt: 'सर्लाहीको हरिपुर नगरपालिकामा सिमान्तकृत दलित तथा मुसहर समुदायलाई लक्षित गरी न्यानो कम्बल वितरण कार्यक्रम सम्पन्न भएको छ।',
    description: 'सर्लाहीको हरिपुर नगरपालिकामा सिमान्तकृत दलित तथा मुसहर समुदायलाई लक्षित गरी न्यानो कम्बल वितरण कार्यक्रम सम्पन्न भएको छ। यस कार्यक्रमले जाडो मौसममा कमजोर आर्थिक अवस्था भएका परिवारहरूलाई राहत प्रदान गरेको छ। कार्यक्रममा स्थानीय सरकार र समुदायिक संस्थाहरूको सहयोग रहेको थियो।\n\nयो पहल समुदायिक एकताको उदाहरण हो र यसले सामाजिक न्यायको दिशामा महत्वपूर्ण योगदान पुर्याएको छ। कार्यक्रमले ५०० भन्दा बढी परिवारहरूलाई फाइदा पुर्याएको छ।',
    category: 'Community Support',
    author: 'RWUA Nepal',
    image: 'https://rwua.com.np/wp-content/uploads/2025/12/blimket-780x470-1.png',
    date: '2024-12-15',
    tags: ['community', 'support', 'winter', 'relief']
  },
  {
    id: '2',
    title: 'बालक्लब गठन तथा बालबालिकाको अधिकार',
    excerpt: 'सर्लाहीमा विद्यालयको पहुँचमा पुग्न नसकेका २० जना अपाङ्ग बालबालिकालाई घरमै शिक्षा प्रदान हुने भएको छ।',
    description: 'सर्लाहीमा विद्यालयको पहुँचमा पुग्न नसकेका २० जना अपाङ्ग बालबालिकालाई घरमै शिक्षा प्रदान हुने भएको छ। यो पहल बालबालिकाको शिक्षाको अधिकार सुनिश्चित गर्ने दिशामा महत्वपूर्ण कदम हो।\n\nबालक्लब गठनको माध्यमबाट बालबालिकाहरूको अधिकार संरक्षण र सचेतना अभिवृद्धि गर्ने कार्यक्रम सञ्चालन गरिएको छ। यसले समुदायमा बालअधिकारको महत्वलाई उजागर गरेको छ।',
    category: 'Child Rights',
    author: 'RWUA Nepal',
    image: 'https://rwua.com.np/wp-content/uploads/2025/02/shared-image.jpeg',
    date: '2024-11-28',
    tags: ['children', 'rights', 'education', 'disability']
  },
  {
    id: '3',
    title: 'न्यानो कम्मल बितरण कार्यक्रम',
    excerpt: 'Save The Children संस्थाको सहयोगमा न्यानो कम्बल वितरण कार्यक्रम सम्पन्न भएको छ।',
    description: 'Save The Children संस्थाको सहयोगमा न्यानो कम्बल वितरण कार्यक्रम सम्पन्न भएको छ। यो कार्यक्रमले जाडो मौसममा आवश्यकतामा परेका परिवारहरूलाई तत्काल राहत प्रदान गरेको छ।\n\nकार्यक्रममा विशेष गरी बालबालिका र वृद्धवृद्धाहरूलाई प्राथमिकता दिइएको थियो। यसले समुदायिक सहयोगको भावनालाई बलियो बनाएको छ।',
    category: 'Winter Relief',
    author: 'RWUA Nepal',
    image: 'https://rwua.com.np/wp-content/uploads/2020/01/13.jpg',
    date: '2024-11-10',
    tags: ['winter', 'relief', 'partnership', 'community']
  },
  {
    id: '4',
    title: 'समावेशी तथा दिगो ग्रामीण खानेपानी सुविधा कार्यक्रम',
    excerpt: 'स्वच्छ खानेपानी पहुँचका लागि सञ्चालित कार्यक्रमका गतिविधिहरू र समुदायिक सहभागिता।',
    description: 'स्वच्छ खानेपानी पहुँचका लागि सञ्चालित कार्यक्रमका गतिविधिहरू र समुदायिक सहभागिता। यो कार्यक्रमले ग्रामीण क्षेत्रमा खानेपानीको पहुँच बढाउने र जल स्रोतको दिगो व्यवस्थापन गर्ने लक्ष्य राखेको छ।\n\nकार्यक्रमले समुदायिक सहभागितालाई प्राथमिकता दिएको छ र स्थानीय जनताको क्षमता निर्माणमा जोड दिएको छ। यसले दीर्घकालीन समाधान प्रदान गर्ने अपेक्षा गरिएको छ।',
    category: 'Water & Sanitation',
    author: 'RWUA Nepal',
    image: 'https://rwua.com.np/wp-content/uploads/2021/04/11.jpg',
    date: '2024-10-15',
    tags: ['water', 'sanitation', 'rural', 'sustainability']
  },
  {
    id: '5',
    title: 'ग्रामिण नारी उत्थान संघको २९ औं साधारण सभा',
    excerpt: 'ग्रामीण महिलाहरूको सशक्तिकरणका लागि आयोजित वार्षिक साधारण सभाको मुख्य बिन्दुहरू।',
    description: 'ग्रामीण महिलाहरूको सशक्तिकरणका लागि आयोजित वार्षिक साधारण सभाको मुख्य बिन्दुहरू। सभामा विगत वर्षका उपलब्धिहरूको समीक्षा र आगामी योजनाहरूको छलफल गरिएको थियो।\n\nसभाले महिला सशक्तिकरणका क्षेत्रमा संस्थाको भूमिकालाई थप प्रभावकारी बनाउने दिशामा महत्वपूर्ण निर्णयहरू गरेको छ। यसले समुदायिक विकासमा महिलाहरूको नेतृत्वलाई बलियो बनाउने अपेक्षा गरिएको छ।',
    category: 'General Assembly',
    author: 'RWUA Nepal',
    image: 'https://rwua.com.np/wp-content/uploads/2021/10/1.jpg',
    date: '2024-09-20',
    tags: ['assembly', 'women', 'empowerment', 'leadership']
  },
  {
    id: '6',
    title: 'बालबालिकाको अधिकार संरक्षण कार्यक्रम',
    excerpt: 'बालबालिकाको अधिकार संरक्षणका लागि बालक्लब गठन र सचेतना कार्यक्रमहरू।',
    description: 'बालबालिकाको अधिकार संरक्षणका लागि बालक्लब गठन र सचेतना कार्यक्रमहरू। यो कार्यक्रमले बालबालिकाहरूको मौलिक अधिकारहरूको संरक्षण र प्रवर्धनमा महत्वपूर्ण भूमिका खेलेको छ।\n\nकार्यक्रमले समुदायमा बालअधिकारको चेतना फैलाउने र बालबालिकाहरूलाई सुरक्षित वातावरण प्रदान गर्ने दिशामा काम गरेको छ। यसले भविष्यमा बलियो समाज निर्माणमा योगदान पुर्याउने अपेक्षा गरिएको छ।',
    category: 'Child Rights',
    author: 'RWUA Nepal',
    image: 'https://rwua.com.np/wp-content/uploads/2025/02/shared-image.jpeg',
    date: '2024-08-25',
    tags: ['children', 'rights', 'protection', 'awareness']
  }
];

// Vacancies Data
export const vacancies: Vacancy[] = [
  {
    id: '1',
    position: 'Program Manager - Community Development',
    description: 'Lead community development initiatives in rural areas. Responsible for program planning, implementation, and monitoring.',
    department: 'Programs',
    deadline: '2025-06-15',
    location: 'Haripur, Nepal',
    tags: ['management', 'community', 'development', 'leadership'],
    image: '/images/vacancy1.jpeg',
    status: 'open'
  },
  {
    id: '2',
    position: 'Finance and Admin Coordinator',
    description: 'Manage financial operations and administrative functions. Oversee budget planning and financial reporting.',
    department: 'Finance',
    deadline: '2025-05-28',
    location: 'Head Office, Nepal',
    tags: ['finance', 'administration', 'budgeting', 'compliance'],
    image: '/images/vacancy2.jpeg',
    status: 'open'
  },
  {
    id: '3',
    position: 'Monitoring & Evaluation Officer',
    description: 'Design and implement M&E frameworks for programs. Conduct regular monitoring visits and prepare evaluation reports.',
    department: 'M&E',
    deadline: '2025-07-20',
    location: 'Regional Office',
    tags: ['monitoring', 'evaluation', 'reporting', 'quality'],
    image: '/images/vacancy1.jpeg',
    status: 'open'
  },
  {
    id: '4',
    position: 'Project Coordinator - Education',
    description: 'Coordinate education and literacy programs in rural communities. Manage project activities and liaise with schools.',
    department: 'Programs',
    deadline: '2025-06-25',
    location: 'Sarlahi District',
    tags: ['education', 'coordination', 'literacy', 'community'],
    image: '/images/vacancy3.jpg',
    status: 'open'
  },
  {
    id: '5',
    position: 'Communications Specialist',
    description: 'Develop communication strategies and manage public relations. Create content for social media and publications.',
    department: 'Communications',
    deadline: '2024-12-15',
    location: 'Head Office, Nepal',
    tags: ['communications', 'social media', 'content', 'public relations'],
    image: '/images/vacancy2.jpeg',
    status: 'closed'
  },
  {
    id: '6',
    position: 'Field Operations Manager',
    description: 'Oversee field operations and coordinate with local communities. Manage field staff and ensure program quality.',
    department: 'Field Operations',
    deadline: '2024-11-30',
    location: 'Multiple Districts',
    tags: ['field operations', 'management', 'community', 'coordination'],
    image: '/images/vacancy1.jpeg',
    status: 'closed'
  },
  {
    id: '7',
    position: 'Senior Finance Officer',
    description: 'Handle complex financial transactions and donor reporting. Ensure compliance with financial regulations.',
    department: 'Finance',
    deadline: '2024-10-20',
    location: 'Head Office, Nepal',
    tags: ['finance', 'donor reporting', 'compliance', 'senior level'],
    image: '/images/vacancy3.jpg',
    status: 'closed'
  }
];

// Filter categories
export const storyCategories = [
  'All',
  'Community Development',
  'Women Empowerment',
  'Education',
  'Health'
];

export const newsCategories = [
  'All',
  'Community Support',
  'Child Rights',
  'Winter Relief',
  'Water & Sanitation',
  'General Assembly'
];

export const vacancyDepartments = [
  'All',
  'Open Positions',
  'Closed Positions',
  'Programs',
  'Finance',
  'Field Operations',
  'M&E',
  'Communications'
];