import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Page8() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tareas:</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver todas</Text>
      </TouchableOpacity>
      
      <View style={styles.descriptionCard}>
        <Text style={styles.descriptionTitle}>Descripción</Text>
        {/* Aquí puedes agregar un ícono o imagen representando la lista de tareas */}
        <View style={styles.iconPlaceholder}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderRadius: 40,
    borderWidth: 20,
    borderColor: '#FFF',
    backgroundColor: '#6f78fd', // Fondo claro
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    textAlign: 'center'
  },
  button: {
    marginVertical: 20,
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  descriptionCard: {
    backgroundColor: '#8468EC',
    padding: 20,
    borderRadius: 10,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  iconPlaceholder: {
    height: 100,
    backgroundColor: '#000', // Aquí puedes reemplazar con el ícono
    borderRadius: 10,
    marginTop: 10,
  },
});