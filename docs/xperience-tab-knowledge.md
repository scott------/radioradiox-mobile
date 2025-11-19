# Xperience Tab - Technical Knowledge Document

## Overview
The Xperience tab displays blog content from RadioRadioX's website at `https://radioradiox.com/blog/` within the mobile app.

## Current Implementation

### Technology Stack
- **Component**: `XperienceScreen.js` located in `src/screens/`
- **Method**: React Native WebView
- **Source URL**: `https://radioradiox.com/blog/`

### Current Approach
The tab currently loads the **entire webpage** using a WebView component, which includes:
- Full website header/navigation
- Sidebar widgets
- Footer
- All page chrome and layout elements
- Blog content (posts, archives, etc.)

### Custom Styling Applied
We inject CSS to improve the mobile experience:
```javascript
// Current CSS injection in XperienceScreen.js
- Dark theme (black background #000000)
- Brand color links (#dd3333 red)
- Improved readability (16px font, 1.6 line-height)
- Styled blog posts with borders and rounded corners
- Hidden some elements (sidebar, ads) with display:none
- Button styling with brand colors
```

### Limitations of Current Approach

#### 1. **Performance Issues**
- Loading entire webpage is heavy (HTML, CSS, JS, images)
- Includes unnecessary assets (navigation scripts, widgets, etc.)
- Slower initial load time
- More data usage for mobile users

#### 2. **User Experience Problems**
- Header/navigation takes up screen real estate
- Footer content may not be relevant in app context
- Some web elements don't translate well to mobile
- CSS hiding is a workaround, not a solution
- User sees full page layout before CSS injection

#### 3. **Maintenance Concerns**
- Dependent on website structure staying the same
- CSS selectors can break if website updates
- Limited control over content presentation
- Difficult to customize for app-specific features

#### 4. **Content Issues**
- Cannot filter or prioritize content
- Cannot add app-specific features (bookmarks, favorites)
- Cannot cache content for offline viewing
- Cannot implement custom navigation within blog

## Recommended Improvements

### Option 1: WordPress REST API (Recommended)
RadioRadioX appears to use WordPress based on web search results. We can use the WordPress REST API:

**Endpoint**: `https://radioradiox.com/wp-json/wp/v2/posts`

**Advantages**:
- Get pure JSON data without HTML/CSS
- Only fetch what we need (title, content, date, author, featured image)
- Implement native UI components (better performance)
- Add pagination, infinite scroll
- Enable offline caching
- Full control over presentation
- Can add features like search, categories, favorites

**Implementation**:
```javascript
// Fetch posts from WordPress REST API
const fetchPosts = async () => {
  const response = await fetch('https://radioradiox.com/wp-json/wp/v2/posts?per_page=10');
  const posts = await response.json();
  return posts;
};
```

### Option 2: Parse HTML Content (Intermediate)
Use a library to parse the webpage and extract just blog content:

**Libraries**: 
- `react-native-html-parser` or similar
- `cheerio-without-node-native` for React Native

**Advantages**:
- More control than full WebView
- Can extract specific elements
- Still works if no API available

**Disadvantages**:
- More fragile than API approach
- Requires parsing and maintenance
- Still loads full page initially

### Option 3: Enhanced WebView with Better Injection (Quick Fix)
Improve current approach with more aggressive content filtering:

**Advantages**:
- Quick to implement
- Works with current setup
- No API dependency

**Disadvantages**:
- Still has fundamental WebView limitations
- Not as performant as native solution

## Technical Requirements for API Approach

### 1. Check API Availability
```bash
# Test if WordPress REST API is enabled
curl https://radioradiox.com/wp-json/wp/v2/posts
```

### 2. Data Structure We Need
```typescript
interface BlogPost {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  author: number;
  featured_media: number; // Featured image ID
  categories: number[];
  link: string; // Permalink to original post
}
```

### 3. UI Components to Build
- Post list (FlatList with cards)
- Post detail view
- Pull-to-refresh
- Infinite scroll/pagination
- Loading states
- Error handling
- HTML rendering for post content (react-native-render-html)

### 4. Additional Dependencies Needed
```json
{
  "react-native-render-html": "^6.x", // Render HTML content
  "date-fns": "^2.x" // Format dates nicely
}
```

## Implementation Phases

### Phase 1: Verify API Access (30 min)
- Test WordPress REST API endpoint
- Verify we can fetch posts
- Check what data is available
- Test featured images endpoint

### Phase 2: Build Post List UI (2-3 hours)
- Create BlogPostCard component
- Implement FlatList with posts
- Add pull-to-refresh
- Add loading states
- Style with brand colors

### Phase 3: Build Post Detail View (1-2 hours)
- Create BlogPostDetail component
- Render HTML content properly
- Add back navigation
- Handle images, links, embedded content

### Phase 4: Add Enhanced Features (Optional)
- Search functionality
- Category filtering
- Bookmarks/favorites
- Offline caching
- Share posts

## Current Code Location

### Files Involved
```
src/
├── screens/
│   └── XperienceScreen.js    // Current WebView implementation
└── constants/
    └── colors.js              // Brand colors used in styling
```

### Navigation Integration
```javascript
// App.js - Tab navigation
<Tab.Screen name="Xperience" component={XperienceScreen} />
```

## Decision Points

### Questions to Answer:
1. **Does RadioRadioX's WordPress have REST API enabled?**
   - Need to test the endpoint
   - May need site owner to enable it

2. **What content do we want to show?**
   - All blog posts?
   - Filtered by category?
   - Limited to recent posts?

3. **What features are most important?**
   - Simple reading experience?
   - Search and filtering?
   - Bookmarking?
   - Offline access?

4. **Development timeline?**
   - Quick fix needed? → Enhance WebView CSS
   - Better long-term solution? → Implement API approach

## API Testing Results

### Test Date: November 18, 2025

**Endpoint Tested**: `https://radioradiox.com/wp-json/wp/v2/posts`

**Result**: ❌ **CONNECTION RESET**

All attempts to access the WordPress REST API resulted in connection resets:
- Direct HTTP requests: Failed (ERR_CONNECTION_RESET)
- Node.js fetch: Failed (fetch failed)
- PowerShell Invoke-WebRequest: Failed (connection closed)

### Likely Causes:
1. WordPress REST API is **disabled** on the site
2. Security plugin (e.g., Wordfence, iThemes Security) is blocking API access
3. Firewall rules restricting REST API endpoints
4. `.htaccess` or server configuration blocking `/wp-json/` paths

### Implications:
- Cannot use WordPress REST API approach ❌
- Must use alternative methods to display blog content
- Need to work with site owner to enable API access OR use different approach

## Alternative Implementation Paths

Since the REST API is not available, we have these options:

### Option A: Enhanced WebView with Content Extraction (Recommended)
**Status**: Feasible immediately

**Approach**:
1. Load blog page in WebView
2. Use JavaScript injection to:
   - Hide header, footer, sidebar
   - Extract only article content
   - Reformat with native-like styling
   - Remove unnecessary elements

**Advantages**:
- Works immediately without API access
- No backend changes needed
- Can still customize presentation

**Implementation**:
```javascript
// Inject JavaScript to extract and clean content
const contentExtraction = `
  (function() {
    // Hide navigation and sidebars
    document.querySelector('header')?.remove();
    document.querySelector('footer')?.remove();
    document.querySelector('.sidebar')?.remove();
    
    // Keep only main content
    const main = document.querySelector('main, .site-content, #content');
    if (main) {
      document.body.innerHTML = '';
      document.body.appendChild(main);
    }
  })();
`;
```

## RSS Feed Testing Results (Option B)

**Test Date**: November 18, 2025  
**Endpoint Tested**: `https://radioradiox.com/feed/`

### Test Commands Executed:
```bash
# PowerShell HEAD request
Invoke-WebRequest -Uri "https://radioradiox.com/feed/" -Method Head

# Node.js fetch test
fetch('https://radioradiox.com/feed/')

# Test main blog page with fetch
fetch('https://radioradiox.com/blog/')
```

### Results:
- **RSS feed endpoint**: ❌ ERR_CONNECTION_RESET (same as REST API)
- **Main blog page via fetch**: ❌ ERR_CONNECTION_RESET  
- **Main blog page via WebView**: ✅ WORKS

### Diagnosis:
The server is **blocking programmatic access** based on User-Agent headers or similar security measures:
- WebView works because it sends browser-like headers
- Direct fetch/curl/Invoke-WebRequest are all being rejected
- This affects ALL endpoints: REST API, RSS feed, and even regular pages

### Implications:
- ❌ Option B (RSS parsing) **NOT VIABLE** - Cannot fetch RSS with native code
- ❌ REST API approach **NOT VIABLE** - Cannot fetch API with native code
- ✅ Option A (Enhanced WebView) **ONLY VIABLE PATH** - WebView bypasses security

The server's security configuration (likely WAF, Cloudflare, security plugin) prevents all non-browser access patterns.

## Recommended Implementation

**Option A: Enhanced WebView Content Extraction** - This is now the **only viable approach** since the server blocks programmatic access.

### Option C: Web Scraping with Cheerio
**Status**: Backup option

**Approach**:
- Fetch HTML page
- Parse with HTML parser
- Extract blog post data
- Display in native components

**Disadvantages**:
- Fragile (breaks if HTML structure changes)
- More complex to maintain
- May violate terms of service

### Option D: Contact Site Owner
**Status**: Recommended parallel action

**Request**:
- Ask RadioRadioX to enable WordPress REST API
- Or provide alternative data feed
- Explain mobile app benefits

## Next Steps

1. ✅ **COMPLETED**: Test WordPress REST API - Result: Not Available
2. **RECOMMENDED**: Implement Enhanced WebView with content extraction (Option A)
3. **PARALLEL**: Test RSS feed availability at `https://radioradiox.com/feed/`
4. **FUTURE**: Contact site owner about enabling REST API access
5. **IMPLEMENT**: Build chosen solution based on test results

## Resources

- WordPress REST API Handbook: https://developer.wordpress.org/rest-api/
- React Native WebView: https://github.com/react-native-webview/react-native-webview
- React Native Render HTML: https://github.com/meliorence/react-native-render-html

---

**Last Updated**: November 18, 2025  
**Status**: Current implementation uses full WebView  
**Recommended**: Migrate to WordPress REST API for better UX and performance
