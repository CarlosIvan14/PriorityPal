import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
type Page9NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const messages = [
  { id: '1', name: 'Jorge Blasquez conserje', message: 'Hola ya limpié su oficina señor', img: 'https://via.placeholder.com/50' },
  { id: '2', name: 'Ing Fernanda', message: 'Gracias 😍', img: 'https://via.placeholder.com/50' },
];

export default function Page9() {
  const navigation = useNavigation<Page9NavigationProp>();
  const[options,setOptions] =useState(['Chats']);
  const[chats,setChats] =useState([]);
  const[request,setRequests] =useState([]);
  const chooseOption = (option: string) => {
    if (options.includes(option)) {
      setOptions(options.filter(c => c !== option));
    } else {
      setOptions([...options, option]);
    }
  };
  
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'space-between' }}>
          <Text style={styles.title}>Chats</Text>
          <View>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
              <AntDesign name="camerao" size={26} color="black" />
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
        </View>
      </SafeAreaView>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.messageContainer}
          >
            <Image source={{ uri: item.img }} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
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