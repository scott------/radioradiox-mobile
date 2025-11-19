import { useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';

const RADIO_STREAM_URL = 'https://www.ophanim.net:8444/s/9220';

export default function useRadio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(1.0);
  const soundRef = useRef(null);

  useEffect(() => {
    // Configure audio session for playback
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });

        // Create and load the audio
        const { sound } = await Audio.Sound.createAsync(
          { uri: RADIO_STREAM_URL },
          { shouldPlay: true, volume: volume },
          onPlaybackStatusUpdate
        );

        soundRef.current = sound;
      } catch (error) {
        console.error('Error setting up audio:', error);
        setIsLoading(false);
      }
    };

    setupAudio();

    // Cleanup function
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setIsPlaying(status.isPlaying);
      setIsLoading(false);
    } else if (status.error) {
      console.error('Playback error:', status.error);
      setIsLoading(false);
    }
  };

  const togglePlayPause = async () => {
    if (!soundRef.current) return;

    try {
      const status = await soundRef.current.getStatusAsync();
      if (status.isLoaded) {
        if (status.isPlaying) {
          await soundRef.current.pauseAsync();
        } else {
          await soundRef.current.playAsync();
        }
      }
    } catch (error) {
      console.error('Error toggling playback:', error);
    }
  };

  const updateVolume = async (newVolume) => {
    const vol = Math.max(0, Math.min(1, newVolume));
    setVolume(vol);

    if (soundRef.current) {
      try {
        await soundRef.current.setVolumeAsync(vol);
      } catch (error) {
        console.error('Error updating volume:', error);
      }
    }
  };

  return {
    isPlaying,
    isLoading,
    volume,
    togglePlayPause,
    updateVolume,
  };
}
