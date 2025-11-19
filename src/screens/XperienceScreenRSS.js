import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Linking,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const RSS_URL = 'https://radioradiox.com/feed/';

export default function XperienceScreenRSS() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webViewRef = React.useRef(null);

  useEffect(() => {
    // WebView will fetch and parse the RSS feed
  }, []);

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'RSS_PARSED') {
        setPosts(data.posts);
        setLoading(false);
      } else if (data.type === 'ERROR') {
        setError(true);
        setLoading(false);
      }
    } catch (e) {
      console.error('Failed to parse WebView message:', e);
      setError(true);
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setError(false);
    setLoading(true);
    setPosts([]);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  const openPost = (url) => {
    Linking.openURL(url).catch((err) =>
      console.error('Failed to open URL:', err)
    );
  };

  const renderPost = ({ item }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => openPost(item.link)}
      activeOpacity={0.7}
    >
      <View style={styles.postHeader}>
        <Text style={styles.category}>{item.category}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postExcerpt} numberOfLines={3}>
        {item.excerpt}
      </Text>
      <View style={styles.postFooter}>
        <Text style={styles.author}>{item.author}</Text>
        <Ionicons name="chevron-forward" size={20} color={COLORS.primaryText} />
      </View>
    </TouchableOpacity>
  );

  // HTML to fetch and parse RSS feed in WebView
  const rssParserHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <script>
        async function fetchAndParseRSS() {
          try {
            const response = await fetch('${RSS_URL}');
            const text = await response.text();
            
            // Parse XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(text, 'text/xml');
            
            // Extract posts
            const items = xmlDoc.querySelectorAll('item');
            const posts = [];
            
            items.forEach((item, index) => {
              // Extract title
              const title = item.querySelector('title')?.textContent || '';
              
              // Extract link
              const link = item.querySelector('link')?.textContent || '';
              
              // Extract description (excerpt)
              const description = item.querySelector('description')?.textContent || '';
              // Clean HTML from description
              const tempDiv = document.createElement('div');
              tempDiv.innerHTML = description;
              const excerpt = tempDiv.textContent.replace(/\\[…\\]/g, '...').trim();
              
              // Extract author
              const author = item.querySelector('creator')?.textContent || 
                           item.querySelector('dc\\\\:creator')?.textContent || 
                           'Staff';
              
              // Extract date
              const pubDate = item.querySelector('pubDate')?.textContent || '';
              const date = new Date(pubDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              });
              
              // Extract category
              const category = item.querySelector('category')?.textContent || 'Uncategorized';
              
              posts.push({
                id: index.toString(),
                title: title.replace(/&#8211;/g, '–').replace(/&#8217;/g, "'"),
                link,
                excerpt: excerpt.substring(0, 200),
                author,
                date,
                category: category.toUpperCase()
              });
            });
            
            // Send posts to React Native
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'RSS_PARSED',
              posts
            }));
            
          } catch (error) {
            console.error('RSS parsing error:', error);
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'ERROR',
              message: error.message
            }));
          }
        }
        
        // Fetch RSS when page loads
        fetchAndParseRSS();
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={80} color={COLORS.error} />
          <Text style={styles.errorTitle}>Unable to Load Xperience</Text>
          <Text style={styles.errorText}>
            Please check your internet connection and try again.
          </Text>
          <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
            <Ionicons name="refresh" size={20} color={COLORS.secondaryBackground} />
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.primaryText} />
          <Text style={styles.loadingText}>Loading Xperience...</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Xperience</Text>
            <TouchableOpacity onPress={handleRefresh}>
              <Ionicons name="refresh" size={24} color={COLORS.primaryText} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={posts}
            renderItem={renderPost}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
      
      {/* Hidden WebView for RSS fetching */}
      <WebView
        ref={webViewRef}
        source={{ html: rssParserHTML }}
        style={styles.hiddenWebView}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.primary,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primaryText,
  },
  listContent: {
    padding: 15,
  },
  postCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333333',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.primaryText,
    backgroundColor: 'rgba(221, 51, 51, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  date: {
    fontSize: 12,
    color: COLORS.tertiary,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryText,
    marginBottom: 10,
    lineHeight: 28,
  },
  postExcerpt: {
    fontSize: 14,
    color: COLORS.secondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    fontSize: 12,
    color: COLORS.tertiary,
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: COLORS.secondary,
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.error,
    marginTop: 20,
    marginBottom: 10,
  },
  errorText: {
    fontSize: 16,
    color: COLORS.secondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryText,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    gap: 8,
  },
  retryButtonText: {
    color: COLORS.secondaryBackground,
    fontSize: 16,
    fontWeight: 'bold',
  },
  hiddenWebView: {
    height: 0,
    width: 0,
    opacity: 0,
  },
});
