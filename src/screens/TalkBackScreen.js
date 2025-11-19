import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { COLORS } from '../constants/colors';

export default function TalkBackScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('feedback');

  const handleSubmit = async () => {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    // TODO: Implement actual form submission to backend
    console.log('Submitting:', { name, email, message, messageType });
    
    Alert.alert(
      'Success',
      'Your message has been sent to RadioRadioX!',
      [
        {
          text: 'OK',
          onPress: () => {
            setName('');
            setEmail('');
            setMessage('');
            setMessageType('feedback');
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Talk Back to RadioRadioX</Text>
          <Text style={styles.subtitle}>
            Send us your requests, tips, or suggestions. No login required!
          </Text>

          <View style={styles.typeSelector}>
            <TouchableOpacity
              style={[
                styles.typeButton,
                messageType === 'feedback' && styles.typeButtonActive,
              ]}
              onPress={() => setMessageType('feedback')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  messageType === 'feedback' && styles.typeButtonTextActive,
                ]}
              >
                Feedback
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                messageType === 'request' && styles.typeButtonActive,
              ]}
              onPress={() => setMessageType('request')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  messageType === 'request' && styles.typeButtonTextActive,
                ]}
              >
                Song Request
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.typeButton,
                messageType === 'tip' && styles.typeButtonActive,
              ]}
              onPress={() => setMessageType('tip')}
            >
              <Text
                style={[
                  styles.typeButtonText,
                  messageType === 'tip' && styles.typeButtonTextActive,
                ]}
              >
                Tip
              </Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Your Name (optional)"
            placeholderTextColor={COLORS.tertiary}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Your Email (optional)"
            placeholderTextColor={COLORS.tertiary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Your message..."
            placeholderTextColor={COLORS.tertiary}
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Send Message</Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
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
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
    alignItems: 'center',
  },
  typeButtonActive: {
    backgroundColor: COLORS.primaryText,
    borderColor: COLORS.primaryText,
  },
  typeButtonText: {
    color: COLORS.secondary,
    fontSize: 14,
    fontWeight: '600',
  },
  typeButtonTextActive: {
    color: COLORS.secondaryBackground,
  },
  input: {
    backgroundColor: COLORS.alternate,
    color: COLORS.secondary,
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
  },
  messageInput: {
    height: 150,
    paddingTop: 15,
  },
  submitButton: {
    backgroundColor: COLORS.primaryText,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: COLORS.secondaryBackground,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
