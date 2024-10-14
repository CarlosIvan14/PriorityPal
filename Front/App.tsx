import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './components/header';
import Footer from './components/Footer';
import MainStack from './navigation/MainStack';
import { UserProvider, useUser } from './components/UserContext'; // Asegúrate de que la ruta sea correcta
import { NavigationContainer } from '@react-navigation/native';
import { SocketContextProvider } from './socketcontext';
import {AuthProvider} from './AuthContext';
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

const AppContent = () => {
  const { user } = useUser(); // Obtén los datos del usuario del contexto

  return (
    <View style={styles.container}>
      <Header style={styles.header} />
      <View style={styles.content}>
        <MainStack />
      </View>
      {/* Renderiza el Footer solo si el usuario está autenticado */}
      {user && <Footer />}
    </View>
  );
};

export default function App() {
  return (
    <UserProvider>
      <SocketContextProvider>
        <NavigationContainer>
          <AppContent />
        </NavigationContainer>
      </SocketContextProvider>
    </UserProvider>
  );
}

