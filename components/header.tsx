import React from 'react';
import { View, Text, StyleSheet,ViewStyle } from 'react-native';

interface HeaderProps {
  style?: ViewStyle; // Add this line to accept style prop
}
const Header: React.FC<HeaderProps> = ({ style }) => {
  return (
    <View style={styles.generalBack}>
      <View style={styles.capsula}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  generalBack: {
    maxHeight:80,
    flex: 1,
    backgroundColor: '#6f78fd',
  },
  capsula: {
    marginTop: '20%',
    height: '30%',
    borderTopRightRadius: 200,
    borderTopLeftRadius: 200,
    backgroundColor: 'white',
    transform: [{ scaleX: 2 }],
    overflow: 'hidden',
  },
  
});

export default Header;
