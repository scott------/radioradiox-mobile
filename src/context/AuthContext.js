import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  };

  const sendMagicLink = async (email) => {
    try {
      // TODO: Implement actual magic link sending
      // This is a placeholder - you'll need to integrate with your backend
      console.log('Sending magic link to:', email);
      
      // For demo purposes, simulate success
      return { success: true };
    } catch (error) {
      console.error('Error sending magic link:', error);
      return { success: false, error: error.message };
    }
  };

  const signIn = async (email, name) => {
    try {
      const userData = { email, name };
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      console.error('Error signing in:', error);
      return { success: false, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        sendMagicLink,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
