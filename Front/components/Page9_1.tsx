import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useUser } from './UserContext'; // Importa el hook
import axios from 'axios';

type Page9_1NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Page9_1'>;
type Page9_1RouteProp = RouteProp<RootStackParamList, 'Page9_1'>;

export default function Page9_1() {
  const navigation = useNavigation<Page9_1NavigationProp>();
  const route = useRoute<Page9_1RouteProp>();
  const { name,receiverId } = route.params;
  const [message, setMessage] = useState('');
  const { user } = useUser();


  console.log("userId",user._id);
  console.log("Rec",route?.params.receiverId);
  const sendMessage = async () =>{
    try{
      const userData ={
        senderId: user._id,
        receiverId: receiverId,
        message:message
      };

      const response = await axios.post("http://10.0.2.2:3000/users/sendrequest",userData);
      if(response.status == 200 ){
        setMessage("");
        Alert.alert("Tú solicitud ha sido enviada", "espera a que el usuario acepte tu solicitud")

      }
    }catch(error){
      console.log("Error",error)
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
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
        <TouchableOpacity
        onPress={sendMessage}
        >
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