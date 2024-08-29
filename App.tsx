import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './components/header';

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scaleX: 0.5 }], 
  },
});

export default function App() {
  return (
    <View style={styles.container}> 
      <Header />
      <Text>perro</Text> 
    </View>
  );
}

