import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Button } from 'react-native';

const Page12 = () => {
  const [mode, setMode] = useState('add'); // 'add' o 'delete'

  return (
    <View style={styles.container}>
      {/* Cabecera */}
      {/* Botones de Añadir y Eliminar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, mode === 'add' && styles.activeButton]}
          onPress={() => setMode('add')}
        >
          <Text style={styles.buttonText}>Añadir persona</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, mode === 'delete' && styles.activeButton]}
          onPress={() => setMode('delete')}
        >
          <Text style={styles.buttonText}>Eliminar persona</Text>
        </TouchableOpacity>
      </View>

      {/* Contenido dinámico según el modo seleccionado */}
      {mode === 'add' ? (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Usuario:</Text>
          <TextInput style={styles.input} placeholder="Introduce el nombre de usuario" />
          <Text style={styles.label}>Contraseña:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Introduce la contraseña" 
            secureTextEntry 
          />
          <Button title="Añadir" onPress={() => {/* Lógica para añadir usuario */}} />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Buscar Usuario:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Buscar usuario..." 
            onChangeText={(text) => {/* Lógica para buscar usuarios */}} 
          />
          <Button title="Eliminar" onPress={() => {/* Lógica para eliminar usuario */}} />
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#9D9D9E',
    padding: 10,
    borderRadius: 20,
  },
  activeButton: {
    backgroundColor: '#30AFAF',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  formContainer: {
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
  },
});

export default Page12;
