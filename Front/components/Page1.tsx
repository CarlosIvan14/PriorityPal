import { useNavigation } from '@react-navigation/native';//Importante de importar para lo de stack navigation
import { NativeStackNavigationProp } from '@react-navigation/native-stack';//Importante de importar para lo de stack navigation
import { RootStackParamList } from '../navigation/types';//Importante de importar para lo de stack navigation
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';

type PageScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Page1'>; //Importante que lo tenga para las rutas o nombre de la pagina a la que se dirige

const Page1 = () => {
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation<PageScreenNavigationProp>();//Con esta variable se accese a las caracteristicas de navigation

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
      <Text style={styles.title}>Username</Text>
      <TextInput style={styles.input} placeholder='Nombre de usuario'/>
      <Text style={styles.title}>Contraseña</Text>
      <TextInput style={styles.input} placeholder='Contraseña'/>
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
      <TouchableOpacity testID="go-to-page3" style={styles.button} onPress={() => navigation.navigate('Page3')}>{/*Asi es como se pone la pagina a que se direge*/ }
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
  title: {
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
  }
});

export default Page1;
