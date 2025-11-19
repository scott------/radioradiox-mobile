import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

export default function ShareScreen() {
  const { user } = useAuth();

  const shareContent = {
    radio: {
      title: 'RadioRadioX',
      message: '🎵 Check out RadioRadioX - Your favorite internet radio station! Listen now at RadioRadioX.com',
      url: 'https://radioradiox.com', // TODO: Replace with actual URL
    },
    app: {
      title: 'RadioRadioX App',
      message: '📱 Download the RadioRadioX app and listen to great music anywhere!',
      url: 'https://radioradiox.com/app', // TODO: Replace with actual app store URLs
    },
  };

  const handleShare = async (type) => {
    if (!user) {
      Alert.alert(
        'Login Required',
        'Please log in to share RadioRadioX content.',
        [{ text: 'OK' }]
      );
      return;
    }

    const content = shareContent[type];
    try {
      const result = await Share.share({
        title: content.title,
        message: `${content.message}\n\n${content.url}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Content shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share content');
      console.error('Share error:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Share RadioRadioX</Text>
        <Text style={styles.subtitle}>
          Spread the word about your favorite radio station!
        </Text>

        {!user && (
          <View style={styles.loginNotice}>
            <Ionicons name="lock-closed" size={24} color={COLORS.warning} />
            <Text style={styles.loginNoticeText}>
              Login required to share content
            </Text>
          </View>
        )}

        <View style={styles.shareOptions}>
          <TouchableOpacity
            style={[styles.shareCard, !user && styles.shareCardDisabled]}
            onPress={() => handleShare('radio')}
            disabled={!user}
          >
            <View style={styles.shareCardIcon}>
              <Ionicons name="radio" size={40} color={COLORS.primaryText} />
            </View>
            <Text style={styles.shareCardTitle}>Share Radio Station</Text>
            <Text style={styles.shareCardDescription}>
              Tell your friends about RadioRadioX
            </Text>
            <View style={styles.shareButton}>
              <Ionicons name="share-social" size={20} color={COLORS.secondaryBackground} />
              <Text style={styles.shareButtonText}>Share Now</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.shareCard, !user && styles.shareCardDisabled]}
            onPress={() => handleShare('app')}
            disabled={!user}
          >
            <View style={styles.shareCardIcon}>
              <Ionicons name="phone-portrait" size={40} color={COLORS.primaryText} />
            </View>
            <Text style={styles.shareCardTitle}>Share Mobile App</Text>
            <Text style={styles.shareCardDescription}>
              Recommend the RadioRadioX app
            </Text>
            <View style={styles.shareButton}>
              <Ionicons name="share-social" size={20} color={COLORS.secondaryBackground} />
              <Text style={styles.shareButtonText}>Share Now</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.socialLinks}>
          <Text style={styles.socialTitle}>Follow Us</Text>
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-facebook" size={30} color={COLORS.info} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-twitter" size={30} color={COLORS.info} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-instagram" size={30} color={COLORS.primaryText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Ionicons name="logo-youtube" size={30} color={COLORS.error} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryText,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.secondary,
    marginBottom: 20,
  },
  loginNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.alternate,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    gap: 10,
  },
  loginNoticeText: {
    color: COLORS.warning,
    fontSize: 14,
    flex: 1,
  },
  shareOptions: {
    gap: 20,
  },
  shareCard: {
    backgroundColor: COLORS.alternate,
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
  },
  shareCardDisabled: {
    opacity: 0.5,
  },
  shareCardIcon: {
    alignItems: 'center',
    marginBottom: 15,
  },
  shareCardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary,
    textAlign: 'center',
    marginBottom: 10,
  },
  shareCardDescription: {
    fontSize: 14,
    color: COLORS.tertiary,
    textAlign: 'center',
    marginBottom: 15,
  },
  shareButton: {
    backgroundColor: COLORS.primaryText,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  shareButtonText: {
    color: COLORS.secondaryBackground,
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialLinks: {
    marginTop: 40,
    alignItems: 'center',
  },
  socialTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 20,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 20,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.alternate,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.tertiary,
  },
});
