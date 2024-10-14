import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView, ViewComponent } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
type Page9NavigationProp = NativeStackNavigationProp<RootStackParamList>;
import { useUser } from './UserContext'; // Importa el hook
import axios from 'axios';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

interface ChatRequest {
    _id: string;
    from: {
      _id: string;
      name: string;
    };
    message: string;
    status: string;
  }
  interface Chat {
    _id: string;
    name: string;
    message: string;
  }

export default function Page9() {
  const navigation = useNavigation<Page9NavigationProp>();
  const[options,setOptions] =useState(['Chats']);
  const [chats, setChats] = useState<Chat[]>([]);
  const [requests, setRequests] = useState<ChatRequest[]>([]);
  const { user } = useUser();
  const userId = user._id;
  const chooseOption = (option: string) => {
    if (options.includes(option)) {
      setOptions(options.filter(c => c !== option));
    } else {
      setOptions([...options, option]);
    }
  };
  useEffect(() =>{
    if (userId) {
      getrequests();
    }
  },[userId]);
  const getrequests = async () => {
    try{
      const response = await axios.get(
        `http://10.0.2.2:3000/users/getrequests/${userId}`,
     );
     
     setRequests(response.data)
    }catch(error) {
      console.log("error",error);
    }
  };
  console.log(requests);
  const acceptResquest = async (requestId:string) =>{
    try{
      const response = await axios.post(`http://10.0.2.2:3000/users/acceptrequest`,{
        userId:userId,
        requestId:requestId
      });

      if(response.status == 200){
        await getrequests();
      }
    }catch(error){
      console.log("error",error)
    }

  };

  useEffect(()=>{
      if(userId){
      getUser();
      }
    },[userId]);

    const getUser = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3000/users/user/${userId}`);
        console.log("Datos recibidos del backend:", response.data);  // Verificar que los datos llegan bien
        setChats(response.data);  // Guardar los datos en el estado 'chats'
      } catch (error) {
        console.log("Error en el fetch del user", error);
        throw error;
      }
    };

console.log(chats);
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'space-between' }}>
          <Text style={styles.title}>Chats</Text>
          <View>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
              <MaterialIcons onPress={() => navigation.navigate('People')} name="person-outline" size={26} color="black" />
            </View>
          </View>
        </View>
        <View style={{padding:10}}>
        <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} onPress={() => chooseOption("Chats")}>
            <View>
              <Text>Chats</Text>
            </View>
            <Entypo name="chevron-small-down" size={26} color="black"/>
          </TouchableOpacity>
          <View>
            {options?.includes("Chats") && (chats?.length > 0 ?  (
              <View>
              <FlatList
                data={chats} // Aquí pasas el array de chats
                keyExtractor={(item) => item._id} // Asegúrate de que cada elemento tenga un _id único
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.messageContainer}
                    onPress={() => navigation.navigate('ChatRoom',
                      {name: item.name,
                      receiverId: item._id,}
                    )}
                  >
                    <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
                    <View>
                      <Text style={styles.name}>{item.name}</Text>
                      <Text style={styles.message}>Chat con {item.name}</Text>
                    </View>
                  </TouchableOpacity>
                )}
                ListEmptyComponent={
                  <Text style={{ textAlign: 'center', marginTop: 20 }}>No tienes chats aún</Text>
                }
              />
            </View>
            
            ) : (
              <View style={{ height: 300, justifyContent: 'center', alignItems:'center'}}>
                <View>
                  <Text style={{textAlign: 'center', color: 'gray'}}>No tienes chats aun</Text>
                  <Text style={{marginTop: 4, color: 'gray'}}>Crea uno mandando un mensaje a otro usuario</Text>
                </View>
              </View>
            ))}
          </View>
          <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} onPress={() => chooseOption("Requests")}>
            <View>
              <Text>Solicitudes</Text>
            </View>
            <Entypo name="chevron-small-down" size={26} color="black"/>
          </TouchableOpacity>
          <View>
            {options?.includes("Requests") && (
              <View>
                <Text> Ver todos las solicitudes de mensaje:</Text>
                <FlatList
                data={requests}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <View style={{flexDirection:'row',alignItems:"center",gap:20}}>
                  <TouchableOpacity
                  style={styles.messageContainer}
                >
                  <Image source={{ uri: 'https://via.placeholder.com/50'  }} style={styles.avatar} />
                  <View>
                    <Text style={styles.name}>{item.from.name}</Text>
                    <Text style={styles.message}>{item.message}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => acceptResquest(item.from._id)}>
                  <Text>Aceptar</Text>
                </TouchableOpacity>
                <AntDesign name="delete" size={26} color="red"/>
                </View>

                )}
                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>No hay solicitudes de mensaje</Text>}
               />
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginVertical:12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  message: {
    fontSize: 14,
    color: '#6E6E6E',
  },
});