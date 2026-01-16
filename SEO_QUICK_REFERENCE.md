# 🚀 SEO Quick Reference Guide - RWUA Project

## ✅ Implementation Complete!

Your RWUA website now has **professional SEO** using Next.js 16 built-in Metadata API.

---

## 📋 Quick Checklist

### ✅ What's Done:
- [x] Global SEO configuration in `app/layout.tsx`
- [x] Homepage SEO with JSON-LD in `app/page.tsx`
- [x] Sitemap at `/sitemap.xml`
- [x] Robots.txt at `/robots.txt`
- [x] Web manifest at `/site.webmanifest`
- [x] Page-specific metadata for all major pages
- [x] Open Graph tags for social media
- [x] Twitter Cards configuration
- [x] JSON-LD structured data helpers

---

## 🎯 How to Add SEO to New Pages

### Method 1: Using Metadata Export (Recommended)
```typescript
// app/your-page/page.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Page Title',
  description: 'Your description (155-160 characters)',
  keywords: 'keyword1, keyword2, keyword3',
  openGraph: {
    title: 'Your Page Title | RWUA Nepal',
    description: 'Your description',
    url: 'https://rwua.com.np/your-page',
    images: [{
      url: 'https://rwua.com.np/image.jpg',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Page Title | RWUA Nepal',
    description: 'Your description',
  },
  alternates: {
    canonical: 'https://rwua.com.np/your-page',
  },
};

export default function YourPage() {
  return <div>Your content</div>;
}
```

### Method 2: Dynamic Metadata
```typescript
// For dynamic pages like blog posts
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await fetchPost(params.id);
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}
```

---

## 🏷️ Adding JSON-LD Structured Data

### Organization Schema (Already on Homepage)
```typescript
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: 'RWUA Nepal',
  url: 'https://rwua.com.np',
  // ... more fields
};

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
/>
```

### Article Schema (For Blog Posts)
```typescript
import { articleSchema } from '@/lib/jsonld';

const schema = articleSchema({
  title: 'Article Title',
  description: 'Article description',
  image: 'https://...',
  datePublished: '2025-01-16',
  author: 'RWUA Nepal',
  url: 'https://rwua.com.np/article',
});

<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
/>
```

### Job Posting Schema (For Vacancies)
```typescript
import { jobPostingSchema } from '@/lib/jsonld';

const schema = jobPostingSchema({
  title: 'Program Manager',
  description: 'Job description',
  datePosted: '2025-01-16',
  validThrough: '2025-02-16',
  employmentType: 'FULL_TIME',
  location: 'Haripur, Nepal',
  url: 'https://rwua.com.np/vacancy/program-manager',
});
```

---

## 🔍 Testing Your SEO

### Local Testing:
```bash
# 1. Build the project
npm run build

# 2. Start production server
npm start

# 3. Check these URLs:
http://localhost:3000/sitemap.xml
http://localhost:3000/robots.txt
http://localhost:3000/site.webmanifest
```

### Online Testing (After Deployment):
1. **Google Rich Results**: https://search.google.com/test/rich-results
2. **Facebook Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Validator**: https://cards-dev.twitter.com/validator
4. **PageSpeed Insights**: https://pagespeed.web.dev/

---

## 📊 SEO Best Practices

### Title Tags:
- ✅ Keep under 60 characters
- ✅ Include primary keyword
- ✅ Make it compelling
- ✅ Use template: "Page Title | RWUA Nepal"

### Meta Descriptions:
- ✅ Keep 155-160 characters
- ✅ Include call-to-action
- ✅ Use active voice
- ✅ Include target keywords

### Keywords:
- ✅ 5-10 relevant keywords
- ✅ Mix of short and long-tail
- ✅ Include location (Nepal, Sarlahi)
- ✅ Include service keywords

### Images:
- ✅ Open Graph: 1200x630px
- ✅ Twitter Card: 1200x630px
- ✅ Use descriptive alt text
- ✅ Optimize file size

---

## 🎨 Social Media Preview

### Facebook/LinkedIn Preview:
```
Title: Your Page Title | RWUA Nepal
Description: Your compelling description...
Image: 1200x630px image
URL: https://rwua.com.np/your-page
```

### Twitter Preview:
```
Title: Your Page Title | RWUA Nepal
Description: Your compelling description...
Image: 1200x630px image
Card Type: summary_large_image
```

---

## 📁 File Structure

```
rwua-project___/
├── app/
│   ├── layout.tsx              # Global SEO config
│   ├── page.tsx                # Homepage with JSON-LD
│   ├── sitemap.ts              # Sitemap generator
│   ├── success-story/
│   │   └── metadata.ts         # Page metadata
│   ├── vacancy/
│   │   └── metadata.ts
│   └── ... (other pages)
│
├── lib/
│   └── jsonld.ts               # JSON-LD schemas
│
└── public/
    ├── robots.txt              # Crawler instructions
    ├── site.webmanifest        # PWA config
    └── favicon.ico             # Site icon
```

---

## 🚨 Common Issues & Solutions

### Issue: Metadata not showing
**Solution:** Clear browser cache and rebuild
```bash
npm run build
```

### Issue: Sitemap not accessible
**Solution:** Check file is at `app/sitemap.ts` (not `app/sitemap.xml`)

### Issue: Open Graph not working
**Solution:** Use Facebook Debugger to clear cache

### Issue: Twitter Card not showing
**Solution:** Validate with Twitter Card Validator

---

## 📈 Monitoring SEO Performance

### Google Search Console:
1. Add property: https://rwua.com.np
2. Submit sitemap: https://rwua.com.np/sitemap.xml
3. Monitor: Impressions, clicks, CTR
4. Fix: Coverage issues, mobile usability

### Google Analytics:
1. Track: Organic traffic
2. Monitor: Bounce rate, session duration
3. Analyze: Top landing pages
4. Optimize: Based on data

---

## ✨ Pro Tips

1. **Update Regularly**: Keep content fresh for better rankings
2. **Mobile First**: Test on mobile devices
3. **Speed Matters**: Optimize images and code
4. **Quality Content**: Write for humans, not just search engines
5. **Internal Linking**: Link related pages together
6. **External Links**: Link to authoritative sources
7. **Social Sharing**: Encourage sharing on social media
8. **Local SEO**: Include location keywords (Nepal, Sarlahi)

---

## 🎯 Next Actions

### Immediate (Before Launch):
1. ✅ Add icon files to `public/` folder
2. ✅ Update social media URLs in `lib/jsonld.ts`
3. ✅ Test all pages locally
4. ✅ Verify sitemap and robots.txt

### After Launch:
1. ✅ Submit sitemap to Google Search Console
2. ✅ Submit sitemap to Bing Webmaster Tools
3. ✅ Test with online SEO tools
4. ✅ Monitor search console for errors
5. ✅ Set up Google Analytics

### Ongoing:
1. ✅ Update content regularly
2. ✅ Monitor rankings
3. ✅ Fix any SEO issues
4. ✅ Optimize based on data

---

## 📞 Need Help?

- **Next.js Docs**: https://nextjs.org/docs/app/building-your-application/optimizing/metadata
- **Schema.org**: https://schema.org/
- **Google Search Central**: https://developers.google.com/search

---

**Status:** ✅ SEO Implementation Complete  
**Ready for:** Production Deployment  
**Last Updated:** January 16, 2026
