import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useUser } from './UserContext'; // Importa el hook

interface HeaderProps {
  style?: ViewStyle;
}

type HeaderNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Header: React.FC<HeaderProps> = ({ style }) => {
  const navigation = useNavigation<HeaderNavigationProp>();
  const { user, setUser } = useUser(); // Obtén los datos del usuario y la función setUser del contexto

  const handleLogoutAndNavigate = () => {
    setUser(null); // Cierra la sesión del usuario
    navigation.navigate('Page1'); // Redirige a Page1
  };

  return (
    <View style={[styles.generalBack, style]}>
      <View style={styles.rowContainer}>
        <Image source={require('../public/logo.jpg')} style={styles.imagen} />
        <Text style={styles.title}>PriorityPal</Text>

        {/* Muestra el botón solo si el usuario está autenticado */}
        {user && (
          <TouchableOpacity style={styles.button} onPress={handleLogoutAndNavigate}>
            <View style={styles.line} />
            <View style={styles.line} />
            <View style={styles.line} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.capsula}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  generalBack: {
    maxHeight: 80,
    flex: 1,
    backgroundColor: '#30AFAF',
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
  imagen: {
    width: 35,
    height: 35,
    marginBottom: 10,
  },
  title: {
    fontFamily: 'Montserrat',
    color: 'white',
    paddingRight: 60,
    fontSize: 20,
    paddingBottom: 15,
    paddingLeft: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 30,
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    padding: 10,
    paddingLeft: 100,
    marginBottom: 20,
  },
  line: {
    width: 30,
    height: 4,
    backgroundColor: 'white',
    marginVertical: 2,
    borderRadius: 2,
  },
});

export default Header;
