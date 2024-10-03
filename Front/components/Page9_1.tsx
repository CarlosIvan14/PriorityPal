import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function Page9_1() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ing. Fernanda</Text>

      <View style={styles.messagesContainer}>
        <Text style={styles.messageReceived}>Holis, estas libre a las 4 swetiee?</Text>
        <Text style={styles.messageSent}>Holi, Sweetie</Text>
        <Text style={styles.messageSent}>Mmm, lo checo</Text>
        <Text style={styles.messageReceived}>Gracias 😍</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje aqui"
        />
        <TouchableOpacity>
          <Text style={styles.sendButton}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  messagesContainer: {
    flex: 1,
    marginVertical: 20,
  },
  messageReceived: {
    backgroundColor: '#EAEAEA',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
  },
  messageSent: {
    backgroundColor: '#30AFAF',
    color: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 10,
    borderColor: '#EAEAEA',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#FFF',
  },
  sendButton: {
    marginLeft: 10,
    color: '#30AFAF',
    fontWeight: 'bold',
  },
});