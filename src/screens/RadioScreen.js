import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import useRadio from '../hooks/useRadio';

export default function RadioScreen() {
  const { isPlaying, isLoading, volume, togglePlayPause, updateVolume } = useRadio();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isPlaying) {
      // Pulsing animation for live indicator
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.3,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isPlaying]);

  return (
    <View style={styles.container}>
      {/* Custom Player UI */}
      <View style={styles.playerContainer}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.logoMain}>RADIORADIOX</Text>
          <View style={styles.logoUnderline} />
          <Text style={styles.logoSubtitle}>INTERNET RADIO</Text>
        </View>

        {/* Live Indicator */}
        <View style={styles.liveContainer}>
          <Animated.View
            style={[
              styles.liveDot,
              {
                transform: [{ scale: isPlaying ? pulseAnim : 1 }],
                opacity: isPlaying ? 1 : 0.3,
              },
            ]}
          />
          <Text style={[styles.liveText, !isPlaying && styles.pausedText]}>
            {isPlaying ? 'LIVE ON AIR' : 'PAUSED'}
          </Text>
        </View>

        {/* Main Control Button */}
        <TouchableOpacity
          style={styles.mainButton}
          onPress={togglePlayPause}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.secondaryBackground} />
          ) : (
            <>
              <View style={styles.mainButtonInner}>
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={60}
                  color={COLORS.secondaryBackground}
                />
              </View>
              <Text style={styles.buttonLabel}>
                {isPlaying ? 'PAUSE' : 'PLAY'}
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Volume Control */}
        <View style={styles.volumeSection}>
          <Ionicons name="volume-low" size={24} color={COLORS.secondary} />
          <View style={styles.volumeTrack}>
            <View style={[styles.volumeFill, { width: `${volume * 100}%` }]} />
            <View style={styles.volumeControls}>
              <TouchableOpacity
                style={styles.volumeButton}
                onPress={() => updateVolume(0)}
              >
                <Ionicons name="volume-mute" size={20} color={COLORS.tertiary} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.volumeButton}
                onPress={() => updateVolume(0.5)}
              >
                <Text style={styles.volumeButtonText}>50%</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.volumeButton}
                onPress={() => updateVolume(1.0)}
              >
                <Text style={styles.volumeButtonText}>100%</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Ionicons name="volume-high" size={24} color={COLORS.secondary} />
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <Ionicons name="musical-notes" size={20} color={COLORS.primaryText} />
            <Text style={styles.infoText}>Now Playing</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="people" size={20} color={COLORS.primaryText} />
            <Text style={styles.infoText}>Listeners</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="heart" size={20} color={COLORS.primaryText} />
            <Text style={styles.infoText}>Favorite</Text>
          </View>
        </View>
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={COLORS.primaryText} />
          <Text style={styles.loadingText}>Connecting to RadioRadioX...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  playerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoMain: {
    fontSize: 42,
    fontWeight: 'bold',
    color: COLORS.primaryText,
    letterSpacing: 4,
    textShadowColor: COLORS.secondaryText,
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  logoUnderline: {
    width: 200,
    height: 3,
    backgroundColor: COLORS.primaryText,
    marginVertical: 8,
  },
  logoSubtitle: {
    fontSize: 14,
    color: COLORS.secondary,
    letterSpacing: 3,
    fontWeight: '600',
  },
  liveContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.alternate,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
  },
  liveDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.error,
    marginRight: 10,
  },
  liveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.secondary,
    letterSpacing: 2,
  },
  pausedText: {
    color: COLORS.tertiary,
  },
  mainButton: {
    alignItems: 'center',
    marginBottom: 50,
  },
  mainButtonInner: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: COLORS.primaryText,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: COLORS.secondaryText,
    shadowColor: COLORS.primaryText,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 10,
  },
  buttonLabel: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondary,
    letterSpacing: 2,
  },
  volumeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  volumeTrack: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.alternate,
    borderRadius: 3,
    marginHorizontal: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.tertiary,
  },
  volumeFill: {
    height: '100%',
    backgroundColor: COLORS.primaryText,
  },
  volumeControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  volumeButton: {
    padding: 5,
  },
  volumeButtonText: {
    color: COLORS.tertiary,
    fontSize: 12,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 400,
  },
  infoCard: {
    alignItems: 'center',
    backgroundColor: COLORS.alternate,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    minWidth: 100,
  },
  infoText: {
    color: COLORS.secondary,
    fontSize: 12,
    marginTop: 5,
    fontWeight: '600',
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
});
