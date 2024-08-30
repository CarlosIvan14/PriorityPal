import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';

interface FooterProps {
  style?: ViewStyle; 
}

const Footer: React.FC<FooterProps> = ({ style }) => {
  return (
    <View style={styles.footer}>
        <Text style={styles.footerText}>Footer Content Here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#5f77ef',
    padding: 10,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Footer;
