import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useUser } from './UserContext'; // Importa el hook
import axios from 'axios';
import { useSocketContext } from '../socketcontext';

type ChatRoomNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Page9_1'>;
type ChatRoomRouteProp = RouteProp<RootStackParamList, 'Page9_1'>;
interface Message {
    senderId: string;
    receiverId: string;
    message: string;
    shouldShake?: boolean;
    // Agrega otros campos si los tienes, como timestamp, etc.
  }
  
export default function ChatRoom() {
  const navigation = useNavigation<ChatRoomNavigationProp>();
  const route = useRoute<ChatRoomRouteProp>();
  const { name,receiverId } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const { user } = useUser();
  const  {socket} = useSocketContext();

  //console.log("userId",user._id);
  //console.log("Rec",route?.params.receiverId);
  const listenMessages = () => {
    const { socket } = useSocketContext();

    useEffect(() => {
        if (socket) {
          socket.on('newMessage', (newMessage: Message) => {
            newMessage.shouldShake = true;
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          });
      
          return () => socket.off('newMessage');
        }
      }, [socket]);
      

  };
  listenMessages();
  const sendMessage = async (senderId: String,receiverId: String) =>{
   try{
        await axios.post("http://10.0.2.2:3000/sendmessage",{
            senderId,
            receiverId,
            message
        });

        socket.emit('sendMessage',{senderId,receiverId,message});

        setMessage("");
        
        setTimeout(() => {
            fetchMessages()
        },100)
   } catch(error){
    console.log("Error",error);
   }
  }
  const fetchMessages = async () => {
    try {
      const senderId = user._id;
      const receiverId = route.params.receiverId;
  
      const response = await axios.get<Message[]>("http://10.0.2.2:3000/messages", {
        params: { senderId, receiverId }
      });
      setMessages(response.data);
    } catch(error) {
      console.log("Error", error);
      Alert.alert('Error', 'No se pudieron cargar los mensajes.');
    }
  }
  
  useEffect(() =>{
    fetchMessages();
  },[])
  
  console.log("messages",messages);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{name}</Text>
      <View style={styles.messagesContainer}>
        {messages.map((msg, index) => (
            <Text
            key={index}
            style={msg.senderId._id === user._id ? styles.messageSent : styles.messageReceived}
            >
            {msg.message}
            </Text>
        ))}
        </View>



      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.input}
          placeholder="Escribe tu mensaje aqui"
        />
        <TouchableOpacity
        onPress={() => {
            if (message.trim()) {
              sendMessage(user._id, receiverId);
            }
          }}          
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
