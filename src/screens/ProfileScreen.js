import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => signOut(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {user ? (
          <>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person-circle" size={80} color={COLORS.primaryText} />
              </View>
              <Text style={styles.userName}>{user.name || 'RadioRadioX Listener'}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="person-outline" size={24} color={COLORS.secondary} />
                <Text style={styles.menuItemText}>Edit Profile</Text>
                <Ionicons name="chevron-forward" size={24} color={COLORS.tertiary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="notifications-outline" size={24} color={COLORS.secondary} />
                <Text style={styles.menuItemText}>Notifications</Text>
                <Ionicons name="chevron-forward" size={24} color={COLORS.tertiary} />
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferences</Text>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="musical-notes-outline" size={24} color={COLORS.secondary} />
                <Text style={styles.menuItemText}>My Favorites</Text>
                <Ionicons name="chevron-forward" size={24} color={COLORS.tertiary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="time-outline" size={24} color={COLORS.secondary} />
                <Text style={styles.menuItemText}>Listening History</Text>
                <Ionicons name="chevron-forward" size={24} color={COLORS.tertiary} />
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Support</Text>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="help-circle-outline" size={24} color={COLORS.secondary} />
                <Text style={styles.menuItemText}>Help & FAQ</Text>
                <Ionicons name="chevron-forward" size={24} color={COLORS.tertiary} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.menuItem}>
                <Ionicons name="information-circle-outline" size={24} color={COLORS.secondary} />
                <Text style={styles.menuItemText}>About RadioRadioX</Text>
                <Ionicons name="chevron-forward" size={24} color={COLORS.tertiary} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
              <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
              <Text style={styles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.notLoggedIn}>
            <Ionicons name="person-circle-outline" size={100} color={COLORS.tertiary} />
            <Text style={styles.notLoggedInTitle}>Not Logged In</Text>
            <Text style={styles.notLoggedInText}>
              You're currently using RadioRadioX as a guest. Log in to access social features and personalize your experience.
            </Text>
          </View>
        )}

        <Text style={styles.version}>Version 1.0.0</Text>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarContainer: {
    marginBottom: 15,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: COLORS.tertiary,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryText,
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.alternate,
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.tertiary,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: COLORS.secondary,
    marginLeft: 15,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.alternate,
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    borderWidth: 1,
    borderColor: COLORS.error,
    gap: 10,
  },
  signOutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.error,
  },
  notLoggedIn: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  notLoggedInTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.secondary,
    marginTop: 20,
    marginBottom: 10,
  },
  notLoggedInText: {
    fontSize: 16,
    color: COLORS.tertiary,
    textAlign: 'center',
    lineHeight: 24,
  },
  version: {
    textAlign: 'center',
    color: COLORS.tertiary,
    fontSize: 12,
    marginTop: 40,
  },
});
