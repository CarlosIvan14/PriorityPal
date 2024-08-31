import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

const messages = [
  { id: '1', name: 'Aaron Loeb', message: 'Hello, how are you?', img: 'https://via.placeholder.com/50' },
  { id: '2', name: 'Adeline Palmerston', message: 'Thank you 😍', img: 'https://via.placeholder.com/50' },
];

export default function Page9() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chat de equipo</Text>

      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.messageContainer}>
            <Image source={{ uri: item.img }} style={styles.avatar} />
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          </View>
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