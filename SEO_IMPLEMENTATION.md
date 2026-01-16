# SEO Implementation Guide - RWUA Project

## ✅ What Has Been Implemented

### 1. **Next-SEO Package Installed**
```bash
npm install next-seo
```

### 2. **Global SEO Configuration**
- **File:** `lib/seo.config.ts`
- **Features:**
  - Default title template
  - Global meta tags
  - Open Graph configuration
  - Twitter Card configuration
  - Facebook App ID
  - Robots directives
  - Additional meta tags (theme-color, viewport, etc.)

### 3. **Layout Integration**
- **File:** `app/layout.tsx`
- **Added:** DefaultSeo component with global config
- **Features:**
  - Site-wide SEO defaults
  - Consistent branding
  - Social media optimization

### 4. **Homepage SEO**
- **File:** `app/page.tsx`
- **Features:**
  - Custom NextSeo component
  - Canonical URL
  - Open Graph tags
  - JSON-LD structured data (Organization + Website)

### 5. **Page-Specific Metadata**
Created metadata files for all major pages:
- ✅ `app/success-story/metadata.ts`
- ✅ `app/vacancy/metadata.ts`
- ✅ `app/news/metadata.ts`
- ✅ `app/downloads/metadata.ts`
- ✅ `app/contact/metadata.ts`
- ✅ `app/gallery/metadata.ts`

### 6. **Sitemap Generation**
- **File:** `app/sitemap.ts`
- **Features:**
  - Dynamic sitemap generation
  - Priority levels
  - Change frequency
  - Last modified dates

### 7. **Robots.txt**
- **File:** `public/robots.txt`
- **Features:**
  - Allow all crawlers
  - Disallow admin/API routes
  - Sitemap reference

### 8. **Web Manifest**
- **File:** `public/site.webmanifest`
- **Features:**
  - PWA configuration
  - App icons
  - Theme colors
  - Display mode

### 9. **JSON-LD Structured Data**
- **File:** `lib/jsonld.ts`
- **Schemas:**
  - Organization schema
  - Website schema
  - Breadcrumb schema
  - Article schema
  - Job posting schema

---

## 📋 How to Use

### For Homepage (Already Implemented)
```tsx
import { NextSeo } from 'next-seo';
import { organizationSchema, websiteSchema } from '@/lib/jsonld';

export default function Home() {
  return (
    <>
      <NextSeo
        title="Home - Empowering Rural Women Since 1998"
        description="Your description here"
        canonical="https://rwua.com.np"
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      
      {/* Your content */}
    </>
  );
}
```

### For Individual Pages
```tsx
import { NextSeo } from 'next-seo';

export default function YourPage() {
  return (
    <>
      <NextSeo
        title="Your Page Title"
        description="Your page description"
        canonical="https://rwua.com.np/your-page"
        openGraph={{
          url: 'https://rwua.com.np/your-page',
          title: 'Your Page Title',
          description: 'Your page description',
          images: [
            {
              url: 'https://rwua.com.np/image.jpg',
              width: 1200,
              height: 630,
              alt: 'Image description',
            },
          ],
        }}
      />
      
      {/* Your content */}
    </>
  );
}
```

### For Blog Posts/Articles
```tsx
import { ArticleJsonLd } from 'next-seo';

export default function ArticlePage() {
  return (
    <>
      <ArticleJsonLd
        url="https://rwua.com.np/article/slug"
        title="Article Title"
        images={['https://rwua.com.np/image.jpg']}
        datePublished="2025-01-16T08:00:00+08:00"
        dateModified="2025-01-16T09:00:00+08:00"
        authorName="RWUA Nepal"
        description="Article description"
      />
      
      {/* Your content */}
    </>
  );
}
```

### For Job Postings
```tsx
import { jobPostingSchema } from '@/lib/jsonld';

export default function VacancyPage() {
  const jobSchema = jobPostingSchema({
    title: 'Program Manager',
    description: 'Job description',
    datePosted: '2025-01-16',
    validThrough: '2025-02-16',
    employmentType: 'FULL_TIME',
    location: 'Haripur, Nepal',
    url: 'https://rwua.com.np/vacancy/program-manager',
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />
      
      {/* Your content */}
    </>
  );
}
```

---

## 🎯 SEO Best Practices Implemented

### 1. **Meta Tags**
- ✅ Title tags (unique per page)
- ✅ Meta descriptions (155-160 characters)
- ✅ Keywords (relevant and targeted)
- ✅ Canonical URLs (prevent duplicate content)
- ✅ Viewport meta tag (mobile-friendly)
- ✅ Theme color (brand consistency)

### 2. **Open Graph (Social Media)**
- ✅ og:title
- ✅ og:description
- ✅ og:image (1200x630px recommended)
- ✅ og:url
- ✅ og:type
- ✅ og:site_name

### 3. **Twitter Cards**
- ✅ twitter:card (summary_large_image)
- ✅ twitter:title
- ✅ twitter:description
- ✅ twitter:image

### 4. **Structured Data (JSON-LD)**
- ✅ Organization schema
- ✅ Website schema
- ✅ Breadcrumb schema
- ✅ Article schema
- ✅ Job posting schema

### 5. **Technical SEO**
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ Mobile-friendly
- ✅ Fast loading (Next.js optimization)
- ✅ HTTPS ready

---

## 🔍 Testing Your SEO

### 1. **Google Rich Results Test**
```
https://search.google.com/test/rich-results
```
Test your structured data

### 2. **Facebook Sharing Debugger**
```
https://developers.facebook.com/tools/debug/
```
Test Open Graph tags

### 3. **Twitter Card Validator**
```
https://cards-dev.twitter.com/validator
```
Test Twitter Cards

### 4. **Google Search Console**
```
https://search.google.com/search-console
```
Submit sitemap and monitor performance

### 5. **PageSpeed Insights**
```
https://pagespeed.web.dev/
```
Test page speed and Core Web Vitals

---

## 📊 SEO Checklist

### ✅ Completed
- [x] Install next-seo package
- [x] Create global SEO config
- [x] Add DefaultSeo to layout
- [x] Add NextSeo to homepage
- [x] Create page-specific metadata
- [x] Generate sitemap.xml
- [x] Create robots.txt
- [x] Add JSON-LD structured data
- [x] Configure Open Graph tags
- [x] Configure Twitter Cards
- [x] Add canonical URLs
- [x] Create web manifest

### 🔄 To Do (Optional)
- [ ] Add breadcrumb navigation with schema
- [ ] Implement article schema for blog posts
- [ ] Add job posting schema for vacancies
- [ ] Create custom 404 page with SEO
- [ ] Add hreflang tags for multi-language (if needed)
- [ ] Implement FAQ schema (if applicable)
- [ ] Add video schema (if applicable)
- [ ] Set up Google Analytics
- [ ] Set up Google Tag Manager
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

---

## 🚀 Next Steps

### 1. **Update Social Media Links**
Edit `lib/seo.config.ts` and `lib/jsonld.ts`:
```typescript
sameAs: [
  'https://www.facebook.com/your-actual-page',
  'https://twitter.com/your-actual-handle',
  'https://www.instagram.com/your-actual-profile',
]
```

### 2. **Add Facebook App ID**
If you have a Facebook App ID, update `lib/seo.config.ts`:
```typescript
facebook: {
  appId: 'YOUR_ACTUAL_APP_ID',
}
```

### 3. **Create Icon Files**
Add these files to `public/`:
- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)
- `apple-touch-icon.png` (180x180px)

### 4. **Test Everything**
```bash
# Build the project
npm run build

# Start production server
npm start

# Test all pages
# Visit: http://localhost:3000
```

### 5. **Submit to Search Engines**
- Google Search Console: https://search.google.com/search-console
- Bing Webmaster Tools: https://www.bing.com/webmasters

---

## 📈 Expected SEO Benefits

### 1. **Better Search Rankings**
- Proper meta tags and structured data
- Mobile-friendly and fast loading
- Clear site structure with sitemap

### 2. **Rich Search Results**
- Organization info in Google
- Job postings in Google Jobs
- Article cards in search results

### 3. **Social Media Optimization**
- Beautiful link previews on Facebook
- Engaging Twitter Cards
- Consistent branding across platforms

### 4. **User Experience**
- Fast page loads
- Mobile-optimized
- Clear navigation
- Accessible content

---

## 🛠️ Maintenance

### Regular Tasks
1. **Update sitemap** when adding new pages
2. **Monitor Search Console** for errors
3. **Update meta descriptions** for better CTR
4. **Check broken links** regularly
5. **Update structured data** when content changes

### Monthly Tasks
1. Review Google Analytics data
2. Check page speed scores
3. Update keywords based on performance
4. Review and update old content

---

## 📞 Support

For SEO-related questions or issues:
- Check Next-SEO docs: https://github.com/garmeeh/next-seo
- Google Search Central: https://developers.google.com/search
- Schema.org: https://schema.org/

---

**Implementation Date:** January 16, 2026  
**Implemented By:** Kiro AI Assistant  
**Project:** RWUA Website
