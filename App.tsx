import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './components/header';
import Footer from './components/Footer';
import Page1 from './components/Page1';
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';
import Page5 from './components/Page5';
import Page6 from './components/Page6';
import Page7 from './components/Page7';
import Page8 from './components/Page8';
import Page9 from './components/Page9';
import Page9_1 from './components/Page9_1';
import Page10 from './components/page10';
import Page11 from './components/Page11';
import Page12 from './components/Page12';
import MainStack from './navigation/MainStack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    
    height: 60,
  },
  footer: {
    
    height: 70,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 100,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      
      <Header style={styles.header} />
      <View style={styles.content}>
        <MainStack/>
      </View>
      <Footer/>
    </View>
  );
}

