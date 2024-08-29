import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.generalBack}>
      <View style={styles.capsula}>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  generalBack: {
    flex: 1,
    backgroundColor: '#6f78fd',
  },
  capsula: {
    marginTop: '20%',
    height: '100%',
    borderTopRightRadius: 200,
    borderTopLeftRadius: 200,
    backgroundColor: 'white',
    transform: [{ scaleX: 2 }],
    overflow: 'hidden',
  },
  
});

export default Header;
