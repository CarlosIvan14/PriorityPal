import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';

type PageScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Page1'>;

const Page1 = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation<PageScreenNavigationProp>();

  const handleLogin = async () => {
    // Hacer la solicitud POST al backend
    try {
      const response = await fetch('http://10.0.2.2:3000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Éxito', data.message);
        // Aquí puedes redirigir a otra página si es necesario
        navigation.navigate('Page3');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Error en el servidor, por favor intenta más tarde.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
      <Text style={styles.title1}>Nombre de Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder='Nombre de usuario'
        value={username}
        onChangeText={setUsername} // Actualiza el estado al cambiar el texto
      />
      <Text style={styles.title2}>Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder='Contraseña'
        secureTextEntry // Para ocultar la contraseña
        value={password}
        onChangeText={setPassword} // Actualiza el estado al cambiar el texto
      />
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setChecked(!checked)}>
          <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
            {checked && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.label}>Recordar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.label}>Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity testID="go-to-page3" style={styles.button} onPress={handleLogin}>
        <Text style={styles.textButton}>Iniciar sesión</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  title1: {
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold',
    paddingRight: 160,
    paddingBottom: '2%',
    paddingTop: '2%',
    marginBottom: 5,
    marginTop: 10,
  },
  title2: {
    fontSize: 20,
    color: '#333333',
    fontWeight: 'bold',
    paddingRight: '55%',
    paddingBottom: '2%',
    paddingTop: '2%',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#f6f3f3',
    width: 320,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#30AFAF',
    borderRadius: 50,
    height: 60,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#30AFAF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#30AFAF',
  },
  checkmark: {
    color: 'white',
    fontSize: 18,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  forgotPassword: {
    marginLeft: 20,
  },
});

export default Page1;
