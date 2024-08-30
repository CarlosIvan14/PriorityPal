import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from './components/header';
import Page7 from './components/page7';
import Page8 from './components/page8';
import Page9 from './components/page9';
import Page9_1 from './components/page9_1';

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
      <Page7/>
    </View>
  );
}

