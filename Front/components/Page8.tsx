import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type Page8NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Page8 = () => {
  const navigation = useNavigation<Page8NavigationProp>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas:</Text>

      <TouchableOpacity testID="go-to-page7" style={styles.button} onPress={() => navigation.navigate('Page7')}>
        <Text style={styles.buttonText}>Ver todas las tareas del equipo</Text>
      </TouchableOpacity>

      <View style={styles.descriptionCard}>
        <Text style={styles.descriptionTitle}>Descripción</Text>
        {/* Aquí puedes agregar un ícono o imagen representando la lista de tareas */}
        <View style={styles.iconPlaceholder}></View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 40,
    borderWidth: 20,
    borderColor: '#FFF',
    backgroundColor: '#30AFAF', 

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center'
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#9D9D9E',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  descriptionCard: {
    backgroundColor: '#8be0d1',
    padding: 20,
    borderRadius: 10,
  },
  descriptionTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  iconPlaceholder: {
    height: 100,
    backgroundColor: '#9D9D9E', 
    borderRadius: 10,
    marginTop: 10,
  },
});

export default Page8;