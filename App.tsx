/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
//Paginas 10, 11, 12
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

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <View style={styles.sectionContainer}>
      <Text>Hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
