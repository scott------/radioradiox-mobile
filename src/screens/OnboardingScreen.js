import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

export default function OnboardingScreen({ onComplete }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const { sendMagicLink, signIn } = useAuth();

  const handleSkip = async () => {
    // Allow user to skip onboarding and use as guest
    onComplete();
  };

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!name.trim()) {
        Alert.alert('Error', 'Please enter your name');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      handleSendMagicLink();
    }
  };

  const handleSendMagicLink = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    const result = await sendMagicLink(email);
    if (result.success) {
      setMagicLinkSent(true);
      // For demo purposes, auto-sign in after a delay
      setTimeout(async () => {
        await signIn(email, name);
        onComplete();
      }, 2000);
    } else {
      Alert.alert('Error', 'Failed to send magic link. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.logo}>RadioRadioX</Text>
            <Text style={styles.tagline}>Your Sound, Your Station</Text>
          </View>

          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            {[1, 2, 3].map((num) => (
              <View
                key={num}
                style={[
                  styles.progressDot,
                  step >= num && styles.progressDotActive,
                ]}
              />
            ))}
          </View>

          {/* Step Content */}
          {step === 1 && (
            <View style={styles.stepContent}>
              <Ionicons name="radio" size={80} color={COLORS.primaryText} />
              <Text style={styles.stepTitle}>Welcome to RadioRadioX</Text>
              <Text style={styles.stepDescription}>
                Stream live radio, share with friends, and connect with the RadioRadioX community.
              </Text>
              <View style={styles.features}>
                <View style={styles.feature}>
                  <Ionicons name="musical-notes" size={24} color={COLORS.primaryText} />
                  <Text style={styles.featureText}>Live Radio Streaming</Text>
                </View>
                <View style={styles.feature}>
                  <Ionicons name="chatbubbles" size={24} color={COLORS.primaryText} />
                  <Text style={styles.featureText}>Talk Back to DJs</Text>
                </View>
                <View style={styles.feature}>
                  <Ionicons name="share-social" size={24} color={COLORS.primaryText} />
                  <Text style={styles.featureText}>Share with Friends</Text>
                </View>
              </View>
            </View>
          )}

          {step === 2 && (
            <View style={styles.stepContent}>
              <Ionicons name="person" size={80} color={COLORS.primaryText} />
              <Text style={styles.stepTitle}>What's your name?</Text>
              <Text style={styles.stepDescription}>
                Help us personalize your experience
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                placeholderTextColor={COLORS.tertiary}
                value={name}
                onChangeText={setName}
                autoFocus
              />
            </View>
          )}

          {step === 3 && !magicLinkSent && (
            <View style={styles.stepContent}>
              <Ionicons name="mail" size={80} color={COLORS.primaryText} />
              <Text style={styles.stepTitle}>Magic Link Login</Text>
              <Text style={styles.stepDescription}>
                Enter your email to receive a secure login link
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.tertiary}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoFocus
              />
            </View>
          )}

          {magicLinkSent && (
            <View style={styles.stepContent}>
              <Ionicons name="checkmark-circle" size={80} color={COLORS.success} />
              <Text style={styles.stepTitle}>Check Your Email!</Text>
              <Text style={styles.stepDescription}>
                We've sent a magic link to {email}. Click the link to complete your login.
              </Text>
              <Text style={styles.demoNote}>
                (Demo mode: Auto-signing you in...)
              </Text>
            </View>
          )}

          {/* Buttons */}
          {!magicLinkSent && (
            <View style={styles.buttons}>
              <TouchableOpacity
                style={styles.continueButton}
                onPress={handleContinue}
              >
                <Text style={styles.continueButtonText}>
                  {step === 3 ? 'Send Magic Link' : 'Continue'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.skipButton}
                onPress={handleSkip}
              >
                <Text style={styles.skipButtonText}>Skip for now</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primaryText,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  tagline: {
    fontSize: 16,
    color: COLORS.secondary,
    marginTop: 5,
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    gap: 10,
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.tertiary,
  },
  progressDotActive: {
    backgroundColor: COLORS.primaryText,
    width: 30,
  },
  stepContent: {
    alignItems: 'center',
    marginBottom: 40,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 16,
    color: COLORS.tertiary,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  features: {
    width: '100%',
    gap: 15,
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.alternate,
    padding: 15,
    borderRadius: 8,
    gap: 15,
  },
  featureText: {
    fontSize: 16,
    color: COLORS.secondary,
  },
  input: {
    width: '100%',
    backgroundColor: COLORS.alternate,
    color: COLORS.secondary,
    padding: 15,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
  },
  demoNote: {
    fontSize: 14,
    color: COLORS.warning,
    fontStyle: 'italic',
    marginTop: 20,
  },
  buttons: {
    width: '100%',
  },
  continueButton: {
    backgroundColor: COLORS.primaryText,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  continueButtonText: {
    color: COLORS.secondaryBackground,
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 15,
    alignItems: 'center',
  },
  skipButtonText: {
    color: COLORS.tertiary,
    fontSize: 16,
  },
});
