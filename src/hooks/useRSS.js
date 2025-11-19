import { useState, useEffect } from 'react';
import { XMLParser } from 'fast-xml-parser';

const RSS_URL = 'https://radioradiox.com/feed/';

export default function useRSS() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAndParseFeed = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(RSS_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const xmlText = await response.text();

      // Parse XML with fast-xml-parser
      const parser = new XMLParser({
        ignoreAttributes: false,
        attributeNamePrefix: '@_',
        textNodeName: '#text',
      });

      const result = parser.parse(xmlText);
      const items = result.rss?.channel?.item || [];

      // Normalize post data
      const normalizedPosts = items.map((item, index) => {
        // Extract title
        const title = item.title || 'Untitled';

        // Extract link
        const link = item.link || '';

        // Extract and clean description (excerpt)
        let excerpt = item.description || '';
        // Remove HTML tags and clean up
        excerpt = excerpt
          .replace(/<[^>]*>/g, '')
          .replace(/\[…\]/g, '...')
          .replace(/&#8211;/g, '–')
          .replace(/&#8217;/g, "'")
          .replace(/&nbsp;/g, ' ')
          .trim();
        // Limit excerpt length
        excerpt = excerpt.substring(0, 200);

        // Extract author
        const author = item['dc:creator'] || item.creator || 'Staff';

        // Extract and format date
        const pubDate = item.pubDate || '';
        let formattedDate = '';
        if (pubDate) {
          const dateObj = new Date(pubDate);
          formattedDate = dateObj.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          });
        }

        // Extract category
        let category = 'Uncategorized';
        if (item.category) {
          category = Array.isArray(item.category)
            ? item.category[0]
            : item.category;
          if (typeof category === 'object' && category['#text']) {
            category = category['#text'];
          }
        }

        return {
          id: index.toString(),
          title: title
            .replace(/&#8211;/g, '–')
            .replace(/&#8217;/g, "'")
            .replace(/&nbsp;/g, ' '),
          link,
          excerpt,
          author,
          date: formattedDate,
          category: String(category).toUpperCase(),
        };
      });

      setPosts(normalizedPosts);
      setIsLoading(false);
    } catch (err) {
      console.error('RSS fetch error:', err);
      setError(err.message || 'Failed to load RSS feed');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAndParseFeed();
  }, []);

  const refetch = () => {
    fetchAndParseFeed();
  };

  return {
    posts,
    isLoading,
    error,
    refetch,
  };
}
