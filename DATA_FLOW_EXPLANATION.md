# News Data Flow - RWUA Project

## 📊 Data Source Overview

Your news data is coming from **WordPress** using **GraphQL** through the **Faust.js** framework and **Apollo Client**.

---

## 🔄 Complete Data Flow

```
WordPress (Backend)
    ↓
WPGraphQL Plugin
    ↓
GraphQL Endpoint: http://localhost/wordpress/graphql
    ↓
Apollo Client (configured in FaustClientProvider.tsx)
    ↓
React Components (NewsPress.tsx, CategoryNewsPageSimple.tsx)
    ↓
User Interface (News Pages)
```

---

## 🔧 Configuration Files

### 1. **Environment Variables** (`.env.local`)
```env
NEXT_PUBLIC_WORDPRESS_URL=http://localhost/wordpress
WORDPRESS_URL=http://localhost/wordpress
FAUST_SECRET_KEY=58c1b51b-a23d-4d2e-b3a4-6c30446b0149
```

### 2. **Faust Configuration** (`faust.config.ts`)
- Connects Next.js to WordPress
- Sets up the WordPress URL
- Configures API authentication

### 3. **Apollo Client Setup** (`FaustClientProvider.tsx`)
- Creates GraphQL client
- Endpoint: `http://localhost/wordpress/graphql`
- Wraps the entire app with ApolloProvider

---

## 📡 GraphQL Queries

### News Press Page (`NewsPress.tsx`)
```graphql
query GetPosts {
  posts(first: 50) {
    nodes {
      id
      title
      content
      excerpt
      date
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      author {
        node {
          name
        }
      }
      categories {
        nodes {
          name
        }
      }
    }
  }
}
```

### Category Pages (`CategoryNewsPageSimple.tsx`)
```graphql
query GetPosts {
  posts(first: 20, where: { 
    orderby: { field: DATE, order: DESC },
    status: PUBLISH
  }) {
    nodes {
      id
      title
      excerpt
      date
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
    }
  }
}
```

---

## 🗂️ WordPress Setup Required

### Prerequisites:
1. **WordPress Installation** running at `http://localhost/wordpress`
2. **WPGraphQL Plugin** installed and activated
3. **Posts** created in WordPress with:
   - Title
   - Content/Excerpt
   - Featured Image
   - Categories assigned

### Categories Used:
- `recent-news` - Latest Updates page
- `success-story` - Success Stories page
- `facebook-post` - Facebook News page

---

## 📄 News Pages Structure

### Main News Page
- **Route:** `/news`
- **Component:** `NewsPress.tsx`
- **Shows:** All posts with featured article, latest news, popular news

### Category Pages
1. **Latest Updates**
   - Route: `/news/latest-updates`
   - Category: `recent-news`
   - Shows: 6 most recent posts

2. **Success Stories**
   - Route: `/news/success-stories`
   - Category: `success-story`
   - Shows: Posts in success-story category

3. **Facebook News**
   - Route: `/news/facebook`
   - Category: `facebook-post`
   - Shows: Posts in facebook-post category

---

## 🔍 How It Works

1. **User visits a news page** (e.g., `/news`)
2. **Component loads** and executes GraphQL query via Apollo Client
3. **Apollo Client sends request** to `http://localhost/wordpress/graphql`
4. **WordPress WPGraphQL plugin** processes the query
5. **WordPress returns data** (posts, images, categories, etc.)
6. **Apollo Client caches** the response
7. **Component transforms data** (cleans HTML, formats dates)
8. **React renders** the news articles on the page

---

## 🖼️ Image Handling

Images are fetched from WordPress and configured in `next.config.ts`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'http',
      hostname: 'localhost',
      pathname: '/wordpress/wp-content/uploads/**',
    },
    {
      protocol: 'https',
      hostname: 'rwua.com.np',
      pathname: '/wp-content/uploads/**',
    }
  ]
}
```

---

## 🚀 Production Setup

For production, you would:
1. Change `NEXT_PUBLIC_WORDPRESS_URL` to your live WordPress URL
2. Update image remote patterns in `next.config.ts`
3. Ensure WPGraphQL is installed on production WordPress
4. Configure proper CORS settings

---

## 🛠️ Troubleshooting

### No posts showing?
- Check WordPress is running at `http://localhost/wordpress`
- Verify WPGraphQL plugin is installed and active
- Ensure posts are published (not drafts)
- Check posts have categories assigned

### Images not loading?
- Verify posts have featured images set
- Check image URLs in WordPress media library
- Ensure `next.config.ts` has correct image domains

### GraphQL errors?
- Visit `http://localhost/wordpress/graphql` in browser
- Check WordPress admin is accessible
- Verify WPGraphQL plugin version is compatible

---

## 📚 Tech Stack Summary

- **Backend:** WordPress + WPGraphQL Plugin
- **API:** GraphQL
- **Frontend Framework:** Next.js 15
- **Data Fetching:** Apollo Client
- **WordPress Integration:** Faust.js
- **Styling:** Tailwind CSS

---

**Current WordPress URL:** `http://localhost/wordpress`  
**GraphQL Endpoint:** `http://localhost/wordpress/graphql`
