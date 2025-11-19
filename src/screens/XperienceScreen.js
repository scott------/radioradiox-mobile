import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const BLOG_URL = 'https://radioradiox.com/blog/';

export default function XperienceScreen() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const webViewRef = React.useRef(null);

  const handleError = () => {
    setError(true);
    setLoading(false);
  };

  const handleLoadEnd = () => {
    setLoading(false);
  };

  const handleRefresh = () => {
    setError(false);
    setLoading(true);
    if (webViewRef.current) {
      webViewRef.current.reload();
    }
  };

  // Enhanced JavaScript to extract and clean blog content
  const injectedJavaScript = `
    (function() {
      try {
        // Run cleanup immediately and also after page loads
        cleanContent();
        
        if (document.readyState !== 'complete') {
          window.addEventListener('load', cleanContent);
        }
        
        // Run again after a short delay to catch dynamically loaded elements
        setTimeout(cleanContent, 1000);
        setTimeout(cleanContent, 2000);
        
        function cleanContent() {
          // Remove header, navigation, footer, sidebar
          const elementsToRemove = [
            'header',
            '.site-header',
            '.header',
            'nav',
            '.navigation',
            '.navbar',
            '.menu',
            'footer',
            '.site-footer',
            '.footer',
            'aside',
            '.sidebar',
            '.widget-area',
            '.advertisement',
            '.ads',
            '.ad',
            '.social-links',
            '.share-buttons',
            '#comments',
            '.comments-area',
            '.related-posts',
            '.wp-block-search',
            '.search-form'
          ];
          
          elementsToRemove.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
              if (el) el.remove();
            });
          });
          
          // Find and isolate main content area
          const mainContent = 
            document.querySelector('main') ||
            document.querySelector('.site-content') ||
            document.querySelector('#content') ||
            document.querySelector('.content') ||
            document.querySelector('.posts') ||
            document.querySelector('.blog');
          
          if (mainContent) {
            // Clear body and add only main content
            const wrapper = document.createElement('div');
            wrapper.id = 'app-content';
            wrapper.appendChild(mainContent.cloneNode(true));
            document.body.innerHTML = '';
            document.body.appendChild(wrapper);
          }
          
          // Inject comprehensive styling
          var style = document.createElement('style');
          style.innerHTML = \`
            /* Reset and base styles */
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            
            html, body {
              width: 100% !important;
              overflow-x: hidden !important;
              background-color: #000000 !important;
            }
            
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
              font-size: 16px !important;
              line-height: 1.6 !important;
              color: #f5f5f5 !important;
              padding: 15px !important;
            }
            
            #app-content {
              max-width: 100% !important;
              width: 100% !important;
            }
            
            /* Typography */
            h1, h2, h3, h4, h5, h6 {
              color: #dd3333 !important;
              margin: 20px 0 10px 0 !important;
              font-weight: bold !important;
            }
            
            h1 { font-size: 28px !important; }
            h2 { font-size: 24px !important; }
            h3 { font-size: 20px !important; }
            
            p {
              margin: 10px 0 !important;
              color: #f5f5f5 !important;
            }
            
            /* Links */
            a {
              color: #dd3333 !important;
              text-decoration: none !important;
            }
            
            a:active, a:hover {
              color: #ff4444 !important;
            }
            
            /* Blog posts */
            article {
              background-color: #1a1a1a !important;
              border: 1px solid #333333 !important;
              border-radius: 12px !important;
              padding: 20px !important;
              margin-bottom: 25px !important;
              box-shadow: 0 2px 8px rgba(221, 51, 51, 0.1) !important;
            }
            
            .entry-title,
            .post-title {
              font-size: 24px !important;
              margin-bottom: 10px !important;
            }
            
            .entry-title a,
            .post-title a {
              color: #dd3333 !important;
              font-weight: bold !important;
            }
            
            .entry-meta,
            .post-meta {
              color: #606c76 !important;
              font-size: 14px !important;
              margin-bottom: 15px !important;
              padding-bottom: 10px !important;
              border-bottom: 1px solid #333333 !important;
            }
            
            .entry-content,
            .post-content {
              color: #f5f5f5 !important;
              line-height: 1.7 !important;
            }
            
            /* Images */
            img {
              max-width: 100% !important;
              height: auto !important;
              border-radius: 8px !important;
              margin: 15px 0 !important;
              display: block !important;
            }
            
            /* Featured images */
            .post-thumbnail img,
            .featured-image img {
              width: 100% !important;
              margin-bottom: 15px !important;
            }
            
            /* Buttons and links */
            .more-link,
            .read-more,
            button,
            input[type="submit"],
            .wp-block-button__link {
              background-color: #dd3333 !important;
              color: #ffffff !important;
              border: none !important;
              padding: 12px 24px !important;
              border-radius: 8px !important;
              text-decoration: none !important;
              display: inline-block !important;
              margin: 15px 0 !important;
              font-weight: bold !important;
              text-align: center !important;
            }
            
            /* Pagination */
            .navigation,
            .nav-links,
            .pagination {
              display: flex !important;
              justify-content: space-between !important;
              align-items: center !important;
              margin: 30px 0 !important;
              flex-wrap: wrap !important;
              gap: 10px !important;
            }
            
            .navigation a,
            .nav-links a,
            .page-numbers {
              background-color: #dd3333 !important;
              color: #ffffff !important;
              padding: 10px 16px !important;
              border-radius: 8px !important;
              text-decoration: none !important;
              min-width: 44px !important;
              text-align: center !important;
            }
            
            .page-numbers.current {
              background-color: #a50d12 !important;
            }
            
            /* Lists */
            ul, ol {
              margin: 10px 0 10px 20px !important;
              color: #f5f5f5 !important;
            }
            
            li {
              margin: 5px 0 !important;
            }
            
            /* Blockquotes */
            blockquote {
              border-left: 4px solid #dd3333 !important;
              padding-left: 20px !important;
              margin: 20px 0 !important;
              color: #f5f5f5 !important;
              font-style: italic !important;
            }
            
            /* Code blocks */
            code, pre {
              background-color: #0a0a0a !important;
              border: 1px solid #333333 !important;
              border-radius: 4px !important;
              padding: 2px 6px !important;
              font-family: 'Courier New', monospace !important;
              color: #04a24c !important;
            }
            
            pre {
              padding: 15px !important;
              overflow-x: auto !important;
              margin: 15px 0 !important;
            }
            
            /* Responsive embeds */
            iframe, video {
              max-width: 100% !important;
              border-radius: 8px !important;
              margin: 15px 0 !important;
            }
            
            /* WordPress blocks */
            .wp-block-image,
            .wp-block-embed,
            .wp-block-video {
              margin: 20px 0 !important;
            }
            
            /* Hide any remaining unwanted elements */
            .advertisement,
            .ads,
            .social-share,
            .author-bio,
            .breadcrumbs {
              display: none !important;
            }
          \`;
          document.head.appendChild(style);
        }
      } catch (e) {
        console.error('Content cleaning failed:', e);
      }
    })();
    true;
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
      ) : (
        <>
          <WebView
            ref={webViewRef}
            source={{ uri: BLOG_URL }}
            style={styles.webview}
            onLoadEnd={handleLoadEnd}
            onError={handleError}
            injectedJavaScript={injectedJavaScript}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={true}
            showsVerticalScrollIndicator={true}
            allowsBackForwardNavigationGestures={true}
          />
          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color={COLORS.primaryText} />
              <Text style={styles.loadingText}>Loading Xperience...</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  webview: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
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
});
