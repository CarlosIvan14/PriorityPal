import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './components/header';
import Page10 from './components/page10';

import Page6 from './components/Page6';
import Footer from './components/Footer';
import Page4 from './components/Page4';
import Page5 from './components/Page5';
import Page12 from './components/Page12';
import Page11 from './components/Page11';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // Ajusta la altura según tus necesidades
    height: 60,
  },
  footer: {
    // Ajusta la altura según tus necesidades
    height: 70,
  },
  content: {
    flex: 1, // Ocupa el espacio restante entre el Header y el Footer
    justifyContent: 'center',
    paddingBottom: 250,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Header style={styles.header} />
      <View style={styles.content}>
        <Page11 />
      </View>
      <Footer style={styles.footer} />
    </View>
  );
}

