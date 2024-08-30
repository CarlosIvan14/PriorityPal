import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';

const Page1 = () => {
  const [checked, setChecked] = useState(false);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'android' ? 'padding' : 'height'}>
      
      <Text style={styles.title}>Username</Text>
      <TextInput style={styles.input} placeholder='Insert your Username here'/>
      <Text style={styles.title}>Password</Text>
      <TextInput style={styles.input} placeholder='Insert your Password here'/>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setChecked(!checked)}>
          <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
            {checked && <Text style={styles.checkmark}>✓</Text>}
          </View>
          <Text style={styles.label}>Remember Me</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.label}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botton}>
        <Text style={styles.textbotton}>Log In</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:50,
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
  botton: {
    backgroundColor: '#004aad',
    borderRadius: 50,
    height: 60,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:60,
    
  },
  textbotton: {
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
    borderColor: '#004aad',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#004aad',
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
