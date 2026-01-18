// JSON-LD Structured Data for SEO

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'Rural Women Upliftment Association (RWUA)',
  alternateName: 'RWUA Nepal',
  url: 'https://rwua.com.np',
  logo: 'https://rwua.com.np/wp-content/uploads/2023/02/cropped-RWUA-Logo-Approval-2.jpg',
  description: 'Empowering rural women through education, skill development, and sustainable livelihood opportunities in Nepal since 1998.',
  foundingDate: '1998',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Haripur Municipality-2',
    addressLocality: 'Haripur',
    addressRegion: 'Sarlahi',
    addressCountry: 'NP',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+977-46-411109',
    contactType: 'Customer Service',
    email: 'rwua.haripur@rwua.org',
    availableLanguage: ['English', 'Nepali'],
  },
  sameAs: [
    'https://www.facebook.com/rwuanepal',
    'https://twitter.com/rwuanepal',
  ],
  areaServed: {
    '@type': 'Place',
    name: 'Sarlahi District, Nepal',
  },
  knowsAbout: [
    'Women Empowerment',
    'Rural Development',
    'Education',
    'Skill Development',
    'Community Development',
    'Child Rights',
    'Health Programs',
  ],
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'RWUA Nepal',
  url: 'https://rwua.com.np',
  description: 'Official website of Rural Women Upliftment Association Nepal',
  publisher: {
    '@type': 'Organization',
    name: 'RWUA Nepal',
    logo: {
      '@type': 'ImageObject',
      url: 'https://rwua.com.np/wp-content/uploads/2023/02/cropped-RWUA-Logo-Approval-2.jpg',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://rwua.com.np/search?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const articleSchema = (article: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: article.title,
  description: article.description,
  image: article.image,
  datePublished: article.datePublished,
  dateModified: article.dateModified || article.datePublished,
  author: {
    '@type': 'Organization',
    name: article.author,
  },
  publisher: {
    '@type': 'Organization',
    name: 'RWUA Nepal',
    logo: {
      '@type': 'ImageObject',
      url: 'https://rwua.com.np/wp-content/uploads/2023/02/cropped-RWUA-Logo-Approval-2.jpg',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': article.url,
  },
});

export const jobPostingSchema = (job: {
  title: string;
  description: string;
  datePosted: string;
  validThrough: string;
  employmentType: string;
  location: string;
  url: string;
}) => ({
  '@context': 'https://schema.org',
  '@type': 'JobPosting',
  title: job.title,
  description: job.description,
  datePosted: job.datePosted,
  validThrough: job.validThrough,
  employmentType: job.employmentType,
  hiringOrganization: {
    '@type': 'Organization',
    name: 'RWUA Nepal',
    sameAs: 'https://rwua.com.np',
    logo: 'https://rwua.com.np/wp-content/uploads/2023/02/cropped-RWUA-Logo-Approval-2.jpg',
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: job.location,
      addressCountry: 'NP',
    },
  },
  url: job.url,
});
